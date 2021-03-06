import { APIClient } from '../kano-api-client-behavior/kano-api-client-behavior.js';
(function(Kano) {
  // @polymerBehavior
  var ShareWrapperBehavior = {
      properties: {
          selectedShare: {
              type: Object,
              notify: true,
              observer: '_selectedShareChanged'
          },
          user: {
              type: Object,
              notify: true
          }
      },
      _getMoreComments (id, page) {
          if (!id) {
              return;
          }
          var limit = 3,
              url = this._getUrl('share-comments', {id}),
              query = `?page=${page}&limit=${limit}`,
              path = `${url}${query}`;
          fetch(path)
              .then(r => r.json())
              .then(r => {
                  this.set('selectedShare.pageNumber', r.next);
                  if (page === 0 ){
                      this.set('selectedShare.comments', r.entries);
                  } else {
                      r.entries.forEach(item => {
                          this.push('selectedShare.comments', item);
                      });
                  }
              });
      },
      _getShareComments (id) {
          return this.cacheOrAPI(this._getUrl('share-comments', {id}) + '?feature=true&page=0&limit=3')
              .then(r => {
                  this.set('selectedShare.pageNumber', r.next);
                  this.set('selectedShare.comments', r.entries);
              });
      },
      _loadMoreData (e) {
          var card = e.detail;
          if (!card.id || !card.page) {
              return;
          }
          this._getMoreComments(card.id, card.page);
      },
      _onCommentFlagged (e) {
          var commentId = e.detail.id,
              commentIndex = e.detail.index,
              path = this._getUrl('flag-comment', { commentId }),
              headers = new Headers({
                  'Authorization': this.token,
                  'Content-Type': 'application/json'
              }),
              flagLength = this.push('selectedShare.comments.' + commentIndex + '.flags', {
                  author: this.user.id
              });
          fetch(path, {
              headers,
              method: 'POST'
          }).then(response  => response.json())
            .then(response => {
                if (response.success && response.flag) {
                    this.set(`selectedShare.comments.${commentIndex}.flags.${flagLength - 1}`, response.flag);
                } else {
                    this.splice(`selectedShare.comments.${commentIndex}.flags`, flagLength - 1, 1);
                }
            });
      },
      _onFeatureAction (e) {
          if (!this.user || !this.user.admin_level) {
              return;
          }
          var headers = new Headers({
                  'Authorization': this.token,
                  'Content-Type': 'application/json'
              }),
              itemId = e.detail.id,
              feature = e.detail.feature,
              method = feature ? 'PUT' : 'DELETE';
          // Set the featured value immediately for instant user feedback
          this.set('selectedShare.featured', !this.selectedShare.featured);
          fetch(this._getUrl('feature-share', { itemId }), {
              method,
              headers
          })
          .catch((err) => {
              // Reset the featured value if the request fails
              this.set('selectedShare.featured', !this.selectedShare.featured);
          });
      },
      _onFollowAction (e) {
          if (!this.user) {
              this.fire('login');
              return;
          }
          var follow = e.detail.action === 'follow',
              userId = e.detail.id,
              method = follow ? 'POST' : 'DELETE';
          if (this.user.id !== userId) {
              if (follow) {
                  this.push('user.profile.following', userId);
              } else {
                  this._removeFollowee(userId);
              }
              var headers = new Headers({
                  'Authorization': this.token,
                  'Content-Type': 'application/json'
              });
              fetch(this._getUrl('follow', { userId }), {
                  method,
                  headers
              })
              .then((response) => response.json())
              .then((response) => {
                  if (response.success && follow) {
                      this.fire('gamification-event', {
                          name: 'follow',
                          detail: {
                              id: userId
                          }
                      });
                  }
              })
              .catch((err) => {
                  if (follow) {
                      this._removeFollowee(userId);
                  } else {
                      this.push('user.profile.following', userId);
                  }
              });
          }
      },
      _onLikeAction (e) {
          if (!this.user) {
              this.fire('login');
              return;
          }
          var id = this.selectedShare.id,
              liked = e.detail,
              type = this.selectedShare.app,
              userId = this.selectedShare.userId,
              method = liked ? 'POST' : 'DELETE';
          if (this.user.id !== userId) {
              var headers = new Headers({
                  'Authorization': this.token,
                  'Content-Type': 'application/json'
              });
              // Update the properties immediately to trigger UI effects
              if (liked) {
                  this.push('selectedShare.likes', {user: this.user.id});
              } else {
                  this._removeSelectedLike();
              }
              fetch(this._getUrl('like-share', { id }), {
                  method,
                  headers
              })
              .then((response) => response.json())
              .then((response) => {
                  if (response.success) {
                      if (response.item) {
                          this.set('selectedShare.likes.' + (this.selectedShare.likes.length - 1), response.item);
                      }
                      this.fire('tracking-event', {
                          name: 'liked_project',
                          data: {
                              like_type: liked ? 'like' : 'unlike',
                              project_id: id,
                              project_type: type,
                              project_user_id: userId
                          }
                      });
                      this.fire('gamification-event', {
                          name: 'like',
                          detail: {
                              category: 'shares',
                              id: id
                          }
                      });
                  } else {
                      // Undo the action if the API call is unsuccessful
                      if (liked) {
                          this._removeSelectedLike();
                      } else {
                          this.push('selectedShare.likes', {user: this.user.id});
                      }
                  }
              });
          }
      },
      _onPostComment (e) {
          if (!this.user) {
              this.fire('login');
              return;
          }
          var commentBody = e.detail.value,
              retry = e.detail.retry,
              requestBody = {
                  item_id: this.selectedShare.id,
                  type: 'share',
                  text: commentBody
              },
              requestHeaders = new Headers({
                  'Content-Type': 'application/json',
                  'Authorization': this.token
              }),
              postingComment = {
                  author: this.user,
                  text: commentBody,
                  date_created: new Date(),
                  posting: true,
                  error: ''
              };

          if (!this.selectedShare.comments) {
              this.set('selectedShare.comments', []);
          }

          if (!retry) {
              this.unshift('selectedShare.comments', postingComment);
          }

          fetch(this._getUrl('post-comment'), {
              method: 'POST',
              headers: requestHeaders,
              body: JSON.stringify(requestBody)
          }).then(r => r.json())
              .then(res => {
                  if (res.success) {
                      this.set('selectedShare.comments_count', this.selectedShare.comments_count + 1);
                      this.set('selectedShare.comments.0', res.comment);
                      this.set('selectedShare.comments.0.posting', false);
                      this.fire('tracking-event', {
                          name: 'commented_project',
                          data: {
                              project_id: this.selectedShare.id,
                              project_type: this.selectedShare.app,
                              project_user_id: this.selectedShare.user.id
                          }
                      });
                  }
              }).catch(error => {
                  this.set('selectedShare.comments.0.error', true);
              });
      },
      _removeFollowee (id) {
          this.user.profile.following.forEach((userId, index) => {
              if (userId === id) {
                  this.splice('user.profile.following', index, 1);
              }
          });
      },
      _removeSelectedLike () {
          this.selectedShare.likes.forEach((like, index) => {
              if (like.user === this.user.id) {
                  this.splice('selectedShare.likes', index, 1);
              }
          });
      },
      _selectedShareChanged (share) {
          if (share) {
              this._getShareComments(share.id);
          }
      }
  };

  Kano.Behaviors.ShareWrapper = [
      APIClient,
      ShareWrapperBehavior
  ];
})();
