import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/iron-scroll-threshold/iron-scroll-threshold.js';
import { APIClient } from '../kano-api-client-behavior/kano-api-client-behavior.js';
import '../kano-share-card/kano-share-card.js';
import '../kano-style/kano-style.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host * {
                box-sizing: border-box;
            }
            :host {
                position: relative;
                overflow: visible;
                @apply --layout-vertical;
            }
            :host .message {
                color: var(--color-grey);
                text-align: center;
            }
            :host .feed {
                @apply --layout-vertical;
                min-height: 470px;
                overflow: visible;
                position: relative;
            }
            :host .feed[hidden] {
                display: none;
            }
            .placeholder, .placeholder dom-repeat {
                @apply --layout-horizontal;
                @apply --layout-justified;
                @apply --layout-wrap;
                height: 100%;
                transition: opacity linear 200ms;
                width: 100%;
            }
            :host .placeholder.initial {
                height: auto;
                left: 0;
                position: absolute;
                top: 0;
                transition: opacity linear 200ms;
                width: 100%;
            }
            @keyframes fade-in {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            kano-share-card {
                animation: fade-in linear 200ms;
            }
            :host *[hidden] {
                display: none !important;
            }
        </style>
        <dom-if>
            <template is="dom-if" if="[[empty]]">
                <div class="message">
                    <slot id="placeholder" name="placeholder"> </slot>
                </div>
            </template>
        </dom-if>
        <div class\$="feed [[mode]]">
            <div id="initial" class="placeholder initial">
                <template is="dom-repeat" items="[[placeholders]]">
                    <kano-share-card selected-share="" tombstone="" mode="[[mode]]">
                                     </kano-share-card>
                </template>
            </div>
            <iron-scroll-threshold id="threshold" lower-threshold="2000" on-lower-threshold="_loadMoreData" scroll-target="document">
                <iron-list id="list" items="[[shares]]" as="share" grid="" scroll-target="document">
                    <template>
                        <kano-share-card id\$="[[share.slug]]" available-apps="[[availableApps]]" available-hardware="[[availableHardware]]" mode="[[mode]]" saved-shares="[[savedShares]]" selected-share="[[share]]" token="[[token]]" user="[[user]]">
                                         </kano-share-card>
                    </template>
                </iron-list>
            </iron-scroll-threshold>
            <dom-if>
                <template is="dom-if" if="[[displayLoadingPlaceholder]]">
                    <div class="placeholder">
                        <dom-repeat>
                            <template is="dom-repeat" items="[[placeholders]]">
                                <kano-share-card selected-share="" tombstone="" mode="[[mode]]">
                                                 </kano-share-card>
                            </template>
                        </dom-repeat>
                    </div>
                </template>
            </dom-if>
        </div>
`,

  is: 'kano-share-feed',
  behaviors: [APIClient],

  properties: {
      /**
      * The external apps available for remixing shares
      */
      availableApps: {
          type: Array,
          value: () => []
      },
      /**
      * The hardware available, if any, for sending shares to hardware
      */
      availableHardware: {
          type: Array,
          value: () => []
      },
      complete: {
          type: Boolean,
          value: false
      },
      displayLoadingPlaceholder: {
          type: Boolean,
          computed: '_displayLoadingPlaceholder(populated, complete)'
      },
      empty: {
          type: Boolean,
          value: true,
          notify: true
      },
      /**
      * String to determine whether to fetch shares or activity feed
      */
      feed: {
          type: String,
          value: 'feed'
      },
      /**
      * Object to supply filters for the feed
      */
      filters: {
          type: Object,
          observer: '_handleChanges'
      },
      isDetailed: {
          type: Boolean,
          computed: '_isDetailed(mode)'
      },
      /**
      * String to determine the layout of the cards
      */
      mode: {
          type: String,
          value: 'detailed'
      },
      placeholders: {
          type: Array,
          computed: '_computePlaceholders(isDetailed)'
      },
      /** Array of IDs for shares saved on the current device */
      savedShares: {
          type: Array
      },
      shares: {
          type: Array,
          value: () => {
              return [];
          }
      },
      /**
       * Authentication token used to fetch a few cases where you get
       * content based on your user
       */
      token: {
          type: String
      },
      user: {
          type: Object
      }
  },

  attached () {
      if (!this.initialized) {
          this.set('page', 0);
      }
      this.set('initialized', true);
      /**
      * iron-scroll-target-behavior bug:
      * We need to fire resize event to refresh scroller value
      */
      window.dispatchEvent(new Event('resize'));
  },

  _computePlaceholders (isDetailed) {
      let placeholderCount = isDetailed ? 6 : 4;
      return new Array(placeholderCount);
  },

  _displayLoadingPlaceholder (populated, complete) {
      return populated && !complete;
  },

  _handleChanges (change) {
      if (this.fetching) {
          this.request.cancel();
      } else {
          this.reset();
      }
  },

  _isDetailed (mode) {
      return mode === 'detailed';
  },

  _loadMoreData () {
      /** When we hit the last page, or we're already fetching */
      if (this.page === null || this.fetching) {
          return;
      }

      this.set('fetching', true);
      var self = this,
          feedType = this.feed,
          filters = this.filters || {},
          limit = 36,
          query = [
              'page=' + this.page,
              'limit=' + limit
          ],
          queryString,
          headers = new Headers({
              'Content-Type': 'application/json'
          });
      if (filters.userId) {
          query.push('user_id=' + filters.userId);
      }
      if (filters.app) {
          query.push('app_name=' + filters.app);
      }
      if (filters.hardware) {
          filters.hardware.forEach(item => {
              query.push('hardware[]=' + item);
          });
      }
      if (filters.featured) {
          query.push('featured=true');
      }
      queryString = query.join('&');
      if (this.token) {
          headers.append('Authorization', this.token)
      }
      this._request(this._getUrl(feedType) + '?' + queryString, {headers})
          .promise
          .then(r => r.json())
          .then(r => {
              if (r.entries.length) {
                  r.entries.forEach(share => {
                      if (share) {
                          let item;
                          if (feedType === 'activity-feed') {
                              item = share.item;
                          } else {
                              item = share;
                          }
                          this.push('shares', item);
                      }
                  });
                  this.set('page', r.next);
                  this.set('populated', true);
                  this.set('empty', false);
                  this.$.initial.style.opacity = 0;
              } else {
                  this.set('empty', true);
              }
              this.set('fetching', false);
              this.$.threshold.clearTriggers();
              /**
               * If there is no next page, then we are complete and
               * won't be able to fetch any more pages
               */
              if (r.next === null) {
                  this.complete = true;
              }
          })
          .catch(e => {
              this.set('fetching', false);
              this.$.threshold.clearTriggers();
              if (e.cancelled) {
                  this.reset();
              }
          });
  },

  _makeRequestCancelable (promise) {
      let cancelled = false,
          wrappedRequest = new Promise((resolve, reject) => {
              promise.then((val) => {
                  cancelled ? reject({cancelled: true}) : resolve(val);
              });
              promise.catch((error) => {
                  cancelled ? reject({cancelled: true}) : reject(error);
              });
          });
      return {
          promise: wrappedRequest,
          cancel () {
              cancelled = true;
          }
      };
  },

  _request (url, options) {
      this.request = this._makeRequestCancelable(
          fetch(url, options)
      );
      return this.request;
  },

  reset () {
      this.set('populated', false);
      this.set('empty', true);
      this.set('shares', []);
      this.set('page', 0);
      this.set('selectedShare', {});
      this.$.initial.style.opacity = 1;
      this._loadMoreData();
  }
});
