/**
Example:
    <kano-user-menu assets-path="../assets/icons/"
                    default-avatar="../assets/avatar.png"
                    user="[[user]]"
                    xp="100"></kano-user-menu>
@group Kano Elements
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/iron-flex-layout/iron-flex-layout.js';

import '../kano-user-summary/kano-user-summary.js';
import '../kano-notifications/kano-notifications.js';
import '../kano-user-badge/kano-user-badge.js';
import '../kano-drop-down/kano-drop-down.js';
import '../kano-icons/kano-icons.js';
import '../kano-style/kano-style.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
Polymer({
  _template: html`
        <style>
            *[hidden] {
                display: none !important;
            }
            :host {
                position: relative;
                z-index: 100;
                display: block;
            }
            :host * {
                box-sizing: border-box;
            }
            button {
                appearance: none;
                border: 0;
                background: transparent;
                cursor: pointer;
            }
            button:focus {
                outline: 0;
            }
            nav {
                @apply --layout-flex;
                @apply --layout-vertical;
                background: transparent;
                font-family: var(--font-body);
                display: block;
            }
            ul {
                list-style: none;
                margin: 0px;
                padding: 0px;
            }
            kano-drop-down {
                position: absolute;
                top: 50px;
            }
            #notifications-menu kano-drop-down {
                left: 45px;
                --kano-drop-down: {
                    width: 360px;
                }
            }
            #avatar-menu kano-drop-down {
                left: 65px;
                --kano-drop-down: {
                    width: 130px;
                }
            }
            :host .kano-user-nav,
            :host .auth-menu,
            :host .user-menu {
                height: 100%;
                min-height: 60px;
                width: 100%;
            }
            :host .kano-user-nav,
            :host .username {
                @apply --layout-flex;
                @apply --layout-horizontal;
                @apply --layout-justified;
            }
            :host .user-menu,
            :host .auth-menu {
                @apply --layout-flex;
                @apply --layout-horizontal;
                @apply --layout-end-justified;
            }
            :host .menu-item {
                cursor: pointer;
                position: relative;
                @apply --layout-horizontal;
                -webkit-tap-highlight-color: transparent;
            }
            :host .menu-button {
                background-color: transparent;
                background: transparent;
                border: 0px;
                box-shadow: none;
                color: var(--color-grey);
                cursor: pointer;
                display: block;
                font-family: var(--font-body);
                font-size: 14px;
                font-weight: bold;
                margin: 0px;
                padding: 0px;
                text-transform: none;
            }
            :host .auth-menu .menu-button {
                @apply --layout-flex;
                @apply --layout-vertical;
                @apply --layout-center-justified;
            }
            :host #notifications-button {
                border-radius: 25px;
                height: 24px;
                padding: 0;
                width: 24px;
            }
            :host #notifications-button .icon {
                color: #ffffff;
                height: 12px;
                margin: auto;
                opacity: 0.5;
                width: 12px;
            }
            :host #notifications-button[active] {
                background-color: var(--color-carnation);
            }
            :host #notifications-button[active] .icon {
                opacity: 1;
            }
            :host #user-button {
                padding: 8px 0px 8px 8px;
            }
            :host #notifications-button,
            :host #user-button {
                @apply --layout-center;
                @apply --layout-flex;
                @apply --layout-horizontal;
                @apply --layout-justified;
            }
            :host #user-button .username {
                margin-left: 12px;
                font-weight: 400;
                color: var(--color-chateau);
            }
            :host .menu-item.avatar>.link:focus {
                background-color: #eeeeee;
            }
            :host .menu-item.notifications>.link:focus,
            :host .menu-item.settings>.link:focus {
                transform: scale(1.3);
                background-color: transparent;
            }
            :host .menu-item a {
                @apply --layout-flex;
                color: var(--color-grey);
                text-align: center;
                font-family: var(--font-body);
                font-size: 14px;
                font-weight: normal;
            }
            :host #notifications-menu,
            :host #settings-menu {
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-center-justified;
            }
            kano-user-badge {
                --kano-user-badge-progress-color: #ff842a;
            }
            :host .xp-prefix {
                font-size: 0;
                line-height: 0;
            }
            :host .xp-icon {
                width: 20px;
            }
            :host .icon-light {
                fill: #ffb300;
            }
            :host .icon-dark {
                fill: #b37e00;
            }
            :host .xp {
                border-bottom: 1px solid var(--color-porcelain);
            }
            :host .xp-text {
                color: var(--color-black);
                display: inline-flex;
                font-weight: bold;
                line-height: 1em;
                padding-left: 10px;
                text-align: left;
            }
            :host .drop-down-item {
                @apply --layout-horizontal;
                @apply --layout-center;
                color: var(--color-grey);
                padding: 4px 13px;
            }
            :host .drop-down-item.xp {
                padding: 12px 13px 11px 13px;
            }
            :host a.drop-down-item {
                text-decoration: none;
            }
            :host button.drop-down-item {
                width: 100%;
            }
            :host a.drop-down-item:hover,
            :host button.drop-down-item:hover {
                background-color: var(--color-porcelain);
                color: var(--color-black);
            }
            :host .drop-down-item iron-icon {
                margin-right: 12px;
                width: 16px;
            }
            @media screen and (max-width: 960px) {
                :host #user-button .username {
                    display: none;
                }
            }
            @media screen and (max-width: 768px) {
                :host .separator {
                    @apply --layout-self-stretch;
                    height: 3px;
                    width: auto;
                    margin: 20px 39px;
                }
                :host li.menu-item {
                    @apply --layout-wrap;
                    width: auto;
                    box-sizing: border-box;
                }
                :host .link {
                    color: var(--color-chateau);
                    margin: 0px;
                    padding: 20px;
                    text-align: left;
                }
                :host .auth-menu .menu-button {
                    padding: 0px 5px;
                }
                :host #user-button {
                    padding: 10px 10px;
                }
                :host #user-button:hover {
                    border-left-color: transparent;
                }
                :host #notifications-drop-down {
                    top: 56px;
                    right: -10px;
                    width: 250px;
                }
                :host #user-drop-down {
                    position: absolute;
                    top: 56px;
                    right: 0px;
                }
            }
            @media all and (min-width: 768px) {
                :host .auth-menu .menu-button {
                    padding: 0px 20px;
                }
            }
        </style>
        <nav id="kano-user-nav" class="kano-user-nav">
            <ul class="user-menu" hidden\$="[[!_isAuthenticated(user)]]">
                <li id="notifications-menu" class="menu-item notifications">
                    <div class="link menu-button" id="notifications-button" on-tap="_toggleOpen" active\$="[[unreadNotifications]]">
                        <iron-icon icon="kano-icons:notification" class="icon notifications"></iron-icon>
                    </div>
                    <kano-drop-down id="notifications-drop-down" caret-align="right" on-tap="_hideDropdown">
                        <kano-notifications mode="[[mode]]" notifications="{{notifications}}" on-notifications-read="_onRead" on-notifications-read-all="_onReadAll" unread-count="{{unread}}" world-root="[[worldRoot]]" username="[[user.username]]"></kano-notifications>
                    </kano-drop-down>
                </li>
                <li id="avatar-menu" class="menu-item avatar">
                    <div class="link menu-button" id="user-button" on-tap="_toggleOpen">
                        <dom-if>
                            <template is="dom-if" if="[[userSummary]]">
                                <kano-user-summary avatar="[[_computeAvatar(user)]]" level="[[level]]" default-avatar="{{defaultAvatar}}" progress="[[progress]]" username="[[user.username]]" xp="[[xp]]"></kano-user-summary>
                            </template>
                        </dom-if>
                        <dom-if>
                            <template is="dom-if" if="[[!userSummary]]">
                                <kano-user-badge user="[[user]]" xp="[[xp]]" level="{{level}}" default-avatar="{{defaultAvatar}}" radius="40" stroke-width="4"></kano-user-badge>
                                <span class="username">[[user.username]]</span>
                            </template>
                        </dom-if>
                    </div>
                    <kano-drop-down id="user-drop-down" caret-align="right" on-tap="_hideDropdown">
                        <div class="drop-down-item xp">
                            <div class="xp-prefix">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 31.3 24.6" style="enable-background:new 0 0 31.3 24.6;" xml:space="preserve" class="xp-icon">
                                    <g>
                                        <g>
                                            <path class="icon-light" d="M27.6,0H3.7C1.7,0,0,1.7,0,3.7v17.1c0,2.1,1.7,3.7,3.7,3.7h23.9c2.1,0,3.7-1.7,3.7-3.7V3.7
                                                C31.3,1.7,29.7,0,27.6,0z"></path>
                                            <g>
                                                <path class="icon-dark" d="M11.6,14l-2.7,4.1c-0.2,0.3-0.5,0.5-0.9,0.5c-0.6,0-1-0.5-1-1c0-0.2,0.1-0.4,0.2-0.6l3.3-4.7L7.4,7.9
                                                    C7.2,7.7,7.2,7.5,7.2,7.3c0-0.6,0.5-1,1-1c0.4,0,0.6,0.1,0.8,0.4l2.5,3.8L14,6.7c0.2-0.3,0.5-0.4,0.8-0.4c0.6,0,1,0.5,1,1
                                                    c0,0.2-0.1,0.4-0.2,0.6l-3.1,4.4l3.3,4.7c0.1,0.1,0.2,0.3,0.2,0.6c0,0.6-0.5,1-1,1c-0.4,0-0.6-0.2-0.9-0.5L11.6,14z"></path>
                                                <path class="icon-dark" d="M19.5,13.7v3.8c0,0.6-0.5,1-1,1s-1-0.5-1-1V7.4c0-0.6,0.5-1,1-1h3.4c2.1,0,3.7,1.2,3.7,3.6
                                                    c0,2.5-1.6,3.7-3.7,3.7H19.5z M19.5,8.2v3.6h2.2c1.1,0,1.8-0.7,1.8-1.8c0-1.2-0.7-1.8-1.8-1.8C21.7,8.2,19.5,8.2,19.5,8.2z"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div class="xp-text">
                                [[xp]]
                            </div>
                        </div>
                        <a href\$="[[worldRoot]]/users/[[user.username]]" class="drop-down-item" on-tap="_onProfile">
                            <iron-icon icon="kano-icons:profile" class="icon"></iron-icon> Profile
                        </a>
                        <a href\$="[[worldRoot]]/accounts/settings" class="drop-down-item" on-tap="_onSettings">
                            <iron-icon icon="kano-icons:settings" class="icon"></iron-icon> Settings
                        </a>
                        <a href\$="[[worldRoot]]/admin" class="drop-down-item" hidden\$="[[!_isUserAdmin(user)]]">
                            Admin
                        </a>
                        <button class="drop-down-item" on-tap="_onLogout">
                            <iron-icon icon="kano-icons:logout" class="icon"></iron-icon> Log out
                        </button>
                    </kano-drop-down>
                </li>
            </ul>
            <ul class="auth-menu" hidden\$="[[_isAuthenticated(user)]]">
                <li class="menu-item">
                    <div class="menu-button" on-tap="_login">Log in</div>
                </li>
                <li class="menu-item">
                    <div class="menu-button" on-tap="_signup">Sign up</div>
                </li>
            </ul>
        </nav>
`,

  is: 'kano-user-menu',

  properties: {
      /**
       * Whether the menu should use online or in-app behavior
       */
      mode: {
          type: String,
          value: 'online'
      },
      unreadNotifications: {
          type: Boolean,
          computed: '_unreadNotifications(notifications.*)'
      },
      /**
       * Basepath of the site to allow for testing across multiple environments
       */
      siteRoot: {
          type: String,
          value: 'https://kano.me'
      },
      /**
       * User object containing the information about the authenticated user
       */
      user: {
          type: Object,
          value: null
      },
      /**
       * Amount of experience earned by the authenticated user
       */
      xp: {
          type: Number,
          readOnly: true,
          notify: true,
          computed: '_computeXP(user.profile.progress.levels)',
          value: 0
      },
      /**
       * A list of notifications received by the authenticated user
       */
      notifications: {
          type: Array,
          notify: true
      },
      /**
       * Path to the assets required by this components
       */
      assetsPath: {
          type: String,
          value: '/'
      },
      /**
       * Base path of Kano World. You can use this to test redirections to staging/dev environments
       */
      worldRoot: {
          type: String,
          value: 'https://world.kano.me'
      },
      /**
       * Default avatar for the user badge
       */
      defaultAvatar: {
          type: String,
          value: 'https://s3.amazonaws.com/kano-avatars/judoka-standard.png'
      },
      /**
       * Temporary property to allow component switching for development
       */
      userSummary: {
          type: Boolean,
          value: false
      },
      progress: {
          type: Number,
          computed: '_computeProgress(user.profile.progress.levels)',
          readOnly: true,
          notify: true
      },
      level: {
          type: Number,
          computed: '_computeLevel(user.profile.progress.levels)',
          readOnly: true,
          notify: true
      }
  },

  _computeAvatar(user) {
      if (user && user.avatar && user.avatar.urls) {
          return user.avatar.urls.character || this.defaultAvatar;
      }
      return this.defaultAvatar;
  },

  attached () {
      this.listen(document, 'tap', '_closeDropdowns');
  },

  detached () {
      this.unlisten(document, 'tap', '_closeDropdowns');
  },

  _computeLevel (levels) {
      if (!levels) {
          return 0;
      }
      return levels.level;
  },

  _computeProgress (levels) {
      if (!levels) {
          return 0;
      }
      let percent = levels.complete * 100;
      return percent.toFixed(2);
  },

  _computeXP (levels) {
      if (!levels) {
          return 0;
      }
      return levels.xp || 0;
  },

  _isAuthenticated (user) {
      return !!user;
  },

  _closeDropdowns (e) {
      var dropDowns = dom(this.root).querySelectorAll('kano-drop-down');
      for (var i = 0; i < dropDowns.length; i++) {
          dropDowns[i].close();
      }
  },

  _onRead (e) {
      this.fire('read', {notification: e.detail});
  },

  _onReadAll (e) {
      this.fire('read-all', {notification: e.detail});
  },

  _login () {
      this.fire('login');
  },

  _onLogout () {
      this.fire('logout');
  },

  _signup () {
      this.fire('signup');
  },

  _onProfile (e) {
      if (this.mode === 'app') {
          e.preventDefault();
          this.fire('view-profile');
      }
  },

  _onSettings (e) {
      if (this.mode === 'app') {
          e.preventDefault();
          this.fire('view-settings');
      }
  },

  _toggleOpen (e) {
      var target = e.currentTarget,
          triggerId = target.getAttribute('id'),
          dropDowns = dom(this.root).querySelectorAll('kano-drop-down'),
          targetDDId,
          dropDown;
      e.stopPropagation();
      if (!triggerId) {
          target = target.parentNode;
          triggerId = target.getAttribute('id')
      }
      targetDDId = triggerId.replace('-button', '-drop-down');
      dropDown = this.$[targetDDId];
      for (var i = 0; i < dropDowns.length; i++) {
          if (dropDowns[i] !== dropDown) {
              dropDowns[i].close();
          }
      }
      if (dropDown) {
          dropDown.toggle();
      }
  },

  _unreadNotifications  (notifications) {
      return this.notifications.filter(function (notification) {
          return !notification.read;
      }).length > 0;
  },

  _isUserAdmin (user) {
      return user && user.admin_level > 0;
  },

  _hideDropdown (e) {
      e.stopPropagation();
      this.menuOpened = false;
      this._closeDropdowns();
  }
});
