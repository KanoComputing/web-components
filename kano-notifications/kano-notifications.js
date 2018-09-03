import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-icon/iron-icon.js';
import '../kano-nav-bar-icons/kano-nav-bar-icons.js';
import '../kano-drop-down-item/kano-drop-down-item.js';
import '../kano-icons/kano-icons.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                color: var(--color-black);
                display: block;
            }
            iron-icon {
                --iron-icon-width: 16px;
                --iron-icon-height: 16px;
            }
            *[hidden] {
                display: none !important;
            }
            :host .header {
                border-bottom: 1px solid var(--color-porcelain);
                color: var(--color-black);
                font-size: 14px;
                font-weight: bold;
                padding: 10px 13px 11px 10px;
            }
            :host .notification-line {
                @apply --layout-horizontal;
            }
            :host .notification-line.unread {
                color: var(--color-grey);
            }
            :host a:focus,
            :host button:focus {
                outline: none;
                background-color: #cecece;
            }
            :host a {
                text-decoration: none;
            }
            :host button {
                background-color: transparent;
                border: 0px;
                cursor: pointer;
            }
            :host .notification {
                color: var(--color-grey);
                font-size: 14px;
                display: block;
            }
            :host .title {
                @apply --layout-flex;
            }
            :host .notification-icon {
                margin-right: 15px;
            }
            :host .notification:hover {
                color: var(--color-black);
            }
            :host .notification-icon .likes {
                color: var(--color-carnation);
            }
            :host .notification-icon .comments {
                color: var(--color-dodger-blue);
            }
            :host .notification-icon .follows {
                color: var(--color-kano-orange);
            }
            :host .notification-icon .shares {
                color: var(--color-kano-orange);
            }
            :host .notification-icon .gamification {
                color: var(--color-grassland);
            }
            :host .options {
                @apply --layout-horizontal;
                border-top: 1px solid var(--color-porcelain);
            }
            :host .option {
                @apply --layout-flex;
                @apply --layout-horizontal;
                @apply --layout-justified;
                @apply --layout-center;
                color: var(--color-grey);
                font-family: var(--font-body);
                font-size: 12px;
                font-weight: bold;
                padding: 12px 13px;
            }
            :host .option:hover {
                background-color: var(--color-porcelain);
                color: var(--color-black);
            }
            :host .empty {
                font-size: 14px;
                padding: 16px 13px;
                text-align: left;
            }
        </style>
        <div class="header">
            Notifications
        </div>
        <template is="dom-repeat" items="[[notifications]]" as="notification">
            <a href\$="[[_computeNotificationUrl(notification)]]" class="notification" on-tap="_onNotificationTap">
                <kano-drop-down-item>
                    <div class\$="notification-line [[_computeReadClass(notification.read)]]">
                        <iron-pages selected="[[notification.category]]" attr-for-selected="name" class="notification-icon">
                            <iron-icon icon="navbar-icons:share" name="shares" class="icon shares"></iron-icon>
                            <iron-icon icon="navbar-icons:heart" name="likes" class="icon likes"></iron-icon>
                            <iron-icon icon="navbar-icons:megaphone" name="updates" class="icon updates"></iron-icon>
                            <iron-icon icon="navbar-icons:users" name="follows" class="icon follows"></iron-icon>
                            <iron-icon icon="navbar-icons:chat" name="comments" class="icon comments"></iron-icon>
                            <iron-icon icon="kano-icons:medals" name="gamification" class="icon gamification"></iron-icon>
                        </iron-pages>
                        <span class="title">[[notification.title]]</span>
                    </div>
                </kano-drop-down-item>
            </a>
        </template>
        <div class="empty" hidden\$="[[_hasNotifications(notifications.*)]]">You have no notifications yet.</div>
        <div class="options" hidden\$="[[!_hasNotifications(notifications.*)]]">
            <a href\$="[[worldRoot]]/notifications" class="option" hidden\$="[[_buttonHidden(mode)]]">
                <span>See all</span>
            </a>
            <button on-tap="_readAll" hidden\$="[[!unreadCount]]" class="option">
                <span>Mark all as read</span>
            </button>
        </div>
`,

  is: 'kano-notifications',

  properties: {
      notifications: {
          type: Array,
          value: function () {
              return [];
          },
          notify: true
      },
      unreadCount: {
          type: Number,
          computed: '_computeUnreadCount(notifications.*)',
          readOnly: true,
          notify: true
      },
      username: {
          type: String
      }
  },

  _readAll: function () {
      this.fire('notifications-read-all');
      this.notifications.forEach(function (notification, index) {
          this.set('notifications.' + index + '.read', true);
      }.bind(this));
  },

  _buttonHidden (mode) {
      return mode === 'app' ? true : false;
  },

  _hasNotifications: function () {
      return !!this.notifications.length;
  },

  _computeUnreadCount: function () {
      return this._computeUnread().length;
  },

  _computeUnread: function () {
      return this.notifications.filter(function (notification) { return !notification.read; })
  },

  _computeReadClass: function (read) {
      return read ? 'read' : 'unread';
  },

  _onNotificationTap: function (e) {
      e.preventDefault();
      var notification = e.model.get('notification'),
          index = e.model.get('index'),
          link = this._computeNotificationUrl(notification);

      this.fire('notifications-read', notification);
      this.set('notifications.' + index + '.read', true);
      setTimeout(function(){
          window.location.href = link;
      },0);
  },

  _computeNotificationUrl: function (notification) {
      var path = '/notifications',
          url = '#';
      notification.meta = notification.meta || {};
      notification.meta.item = notification.meta.item || {};

      var type = notification.meta.item.type || '';
      if (this.mode !== 'app') {
          if (notification.category === 'follows') {
              notification.meta.author = notification.meta.author || {};
              path = '/users/' + notification.meta.author.username;
          } else if (notification.category === 'shares' || notification.category === 'share-items') {
              path = '/shared/' + notification.meta.item.id;
          } else if (notification.category === 'comments') {
              path = this._getItemLink(notification.meta.item);
          } else if (notification.category === 'updates') {
              path = this._getUpdateLink(notification);
          } else if (notification.category === 'badges') {
              path = '/users/' + this.username + '/badges';
          } else if (notification.category === 'likes') {
              if (notification.type === 'shareItem') {
                  path = '/shared/' + notification.meta.item.id;
              } else if (notification.type === 'project') {
                  path = '/projects/' + notification.meta.item.id;
              } else {
                  path = this._getItemLink(notification.meta.item);
              }
          }
          url = this.worldRoot + path;
      }
      return url;
  },

  _getItemLink: function (item) {
      var link = '/notifications';

      if (item.type === 'share') {
          link = '/shared/' + item.id;
      } else if (item.type === 'project') {
          link = '/projects/' + item.id;
      } else if (item.type === 'app') {
          link = '/apps/' + item.slug;
      } else if (item.type === 'forum-post') {
          link = '/forum/topic/' + item.slug;
      }

      return link;
  },

  _getUpdateLink: function (notification) {
      var link = '/notifications';

      if (notification.category === 'updates') {
          if (notification.meta.url) {
              link = notification.meta.url;
          } else if (notification.meta.project) {
              link = '/projects/' + notification.meta.project.id;
          }
      }

      return link;
  }
});
