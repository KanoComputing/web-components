import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-image/iron-image.js';
import { APIClient } from '../kano-api-client-behavior/kano-api-client-behavior.js';
import '../kano-lightboard-preview/kano-lightboard-preview.js';
import '../kano-share-stats/kano-share-stats.js';
import '../kano-style/kano-style.js';
import '../kano-icons/parts.js';
import '../kano-share-wrapper/kano-share-wrapper-behavior.js';
import { ShareBehavior } from '../kano-share/kano-share-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                box-sizing: border-box;
                display: block;
            }
            :host([mode="detailed"]) .wrapper {
                padding: 0 20px 32px 20px;
            }
            :host([mode="summary"]) .wrapper {
                padding: 16px 20px;
            }
            :host([mode="summary"]) .inner {
                @apply --layout-horizontal;
            }
            :host #cover {
                background-color: var(--color-stone);
            }
            :host #cover,
            :host kano-lightboard-preview {
                cursor: pointer;
            }
            :host([mode="detailed"]) .cover-wrapper {
                height: 0;
                overflow: hidden;
                padding-bottom: 54%;
                position: relative;
                max-width: 300px;
                width: 100%;
            }
            :host([mode="detailed"]) #cover,
            :host([mode="detailed"]) kano-lightboard-preview {
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
            }
            :host([mode="summary"]) .cover-wrapper {
                border-radius: 3px;
                flex: none;
                height: 64px;
                overflow: hidden;
                position: relative;
                width: 64px;
            }
            :host([mode="summary"]) #cover,
            :host([mode="summary"]) kano-lightboard-preview {
                display: block;
                height: 64px;
                position: relative;
                transform: translateX(-25%);
                width: 128px;
            }
            :host .content {
                @apply --layout-flex;
                position: relative;
                /**
                 * Prevents overflowing text breaking the layout. See:
                 * https://css-tricks.com/flexbox-truncated-text/
                 */
                min-width: 0;
            }
            :host([mode="detailed"]) #user {
                left: 0;
                padding-left: 16px;
                position: absolute;
                top: -32px;
            }
            :host([mode="detailed"]) .avatar-wrapper {
                overflow: hidden;
                height: 40px;
                width: 40px;
                border-radius: 100%;
                background-color: var(--color-sky);
                border: 4px solid white;
                position: relative;
                cursor: pointer;
            }
            :host([mode="detailed"]) #avatar {
                margin-top: 5px;
                height: auto;
                width: 100%;
                border-radius: 100%;
                overflow: hidden;
            }
            :host([mode="detailed"]) .username {
                background-color: white;
                border-radius: 3px;
                box-shadow: 0 2px 2px rgba(0,0,0,0.2);
                color: var(--color-black);
                display: none;
                font-size: 14px;
                font-weight: bold;
                left: 36px;
                margin: auto;
                padding: 13px 30px;
                position: absolute;
                top: -100%;
                transform: translate(-50%, -20%);
            }
            :host([mode="detailed"]) .username::after {
                bottom: -8px;
                color: white;
                content: '◢';
                font-size: 16px;
                height: 16px;
                left: 0;
                line-height: 16px;
                margin: auto;
                position: absolute;
                right: 0;
                text-shadow: 0 2px 2px rgba(0,0,0,0.2);
                transform: rotate(45deg);
                width: 16px;
            }
            :host([mode="detailed"]) #user:hover .username {
                display: block;
            }
            :host([mode="detailed"]) .details {
                padding: 16px 0 0 0;
            }
            :host([mode="summary"]) .details {
                @apply --layout-vertical;
                @apply --layout-start;
                @apply --layout-center-justified;
                padding: 0 0 0 15px;
            }
            :host .title {
                @apply --layout-horizontal;
                @apply --layout-start-justified;
                @apply --layout-center;
                cursor: pointer;
                font-size: 20px;
                line-height: 20px;
                margin: 0 0 6px 0;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;
            }
            :host([mode="detailed"]) .title {
                height: 28px;
            }
            :host([mode="summary"]) .title {
                height: 24px;
            }
            :host .icon {
                flex: none;
            }
            :host([mode="detailed"]) .icon {
                height: 28px;
                margin-top: -10px;
                width: 28px;
            }
            :host([mode="summary"]) .icon {
                height: 24px;
                margin-top: -8px;
                width: 24px;
            }
            :host .title-text {
                height: 20px;
                overflow: hidden;
                padding-bottom: 2px;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            @media all and (max-width: 680px) {
                :host {
                    width: 50%;
                }
            }
            @media all and (min-width: 681px) {
                :host([mode="detailed"]) {
                    width: 300px;
                }
                :host([mode="detailed"]) .inner {
                    max-width: 300px;
                }
                :host([mode="summary"]) {
                    width: 50%;
                }
            }
            :host([tombstone]) #cover {
                background: var(--color-stone);
                color: transparent;
            }
            :host([tombstone]) #avatar {
                background: var(--color-stone);
                border-radius: 100%;
                color: transparent;
            }
            :host([tombstone]) .title {
                width: 50%;
                height: 20px;
                margin-top: 8px;
                background-color: var(--color-stone);
                color: transparent;
            }
            :host([tombstone]) .title-text {
                display: none;
            }
            :host([tombstone]) * {
                cursor: default !important;
            }
            :host([tombstone]) .username {
                display: none !important;
            }
            :host *[hidden] {
                display: none !important;
            }
        </style>
        <div class="wrapper">
            <div class="inner">
                <div class="cover-wrapper">
                    <dom-if>
                        <template is="dom-if" if="[[defaultShare]]">
                            <iron-image id="cover" src="[[selectedShare.cover_url]]" sizing="cover" preload="" fade="" on-tap="_selectShare"></iron-image>
                        </template>
                    </dom-if>
                    <dom-if>
                        <template is="dom-if" if="[[lightboardShare]]">
                            <kano-lightboard-preview src="[[selectedShare.attachments.lightboard_spritesheet_url]]" width="[[coverWidth]]" on-tap="_selectShare"></kano-lightboard-preview>
                        </template>
                    </dom-if>
                </div>
                <div class="content">
                    <div class="details">
                        <dom-if>
                            <template is="dom-if" if="[[displayUser]]">
                                <div id="user" on-tap="_userTapped">
                                    <div class="avatar-wrapper">
                                        <img id="avatar" src\$="[[_computeAvatar(selectedShare)]]">
                                    </div>
                                    <span class="username">[[selectedShare.user.username]]</span>
                                </div>
                            </template>
                        </dom-if>
                        <h3 class="title" on-tap="_selectShare">
                            <iron-icon icon="parts:light-animation" class="icon animation" hidden\$="[[!_shareContainsAnimation(selectedShare)]]"></iron-icon>
                            <span class="title-text">[[selectedShare.title]]</span>
                        </h3>
                        <kano-share-stats id="stats" app-integration="[[appIntegration]]" hardware-integration="[[hardwareIntegration]]" liked="[[liked]]" likes="[[numberOfLikes]]" saved-to-device="[[savedToDevice]]" shared-by-user="[[sharedByUser]]" tombstone\$="[[!selectedShare]]" on-like-tapped="_onLikeAction" on-remix="_remix" on-update-device-action="_updateDevice">
                                          </kano-share-stats>
                    </div>
                </div>
            </div>
        </div>
`,

  is: 'kano-share-card',

  behaviors: [
      APIClient,
      ShareBehavior,
      Kano.Behaviors.ShareWrapper
  ],

  properties: {
      coverWidth: {
          type: Number,
          computed: '_coverWidth(mode)'
      },
      defaultAvatar: {
          type: String,
          value: 'https://s3.amazonaws.com/kano-avatars/judoka-standard.png'
      },
      defaultShare: {
          type: Boolean,
          computed: '_defaultShare(selectedShare)'
      },
      displayUser: {
          type: Boolean,
          computed: '_displayUser(mode)'
      },
      lightboardShare: {
          type: Boolean,
          computed: '_lightboardShare(selectedShare)'
      },
      mode: {
          type: String,
          reflectToAttribute: true,
          value: 'detailed'
      },
      token: {
          type: String
      },
      user: {
          type: Object
      }
  },

  _coverWidth (mode) {
      return mode === 'summary' ? 128 : 288;
  },

  _defaultShare (share) {
      if (!share) {
          return true;
      }
      return !share.attachments || !share.attachments.lightboard_spritesheet_url;
  },

  _displayUser (mode) {
      return mode === 'detailed';
  },

  _lightboardShare (share) {
      if (!share) {
          return false;
      }
      return share.attachments && share.attachments.lightboard_spritesheet_url;
  },

  _remix (e) {
      var item = this.selectedShare;
      this.fire('remix-action', {
          id: item.id,
          slug: item.slug,
          type: item.app
      });
  },

  _selectShare () {
      if (!this.selectedShare) {
          return;
      }
      this.fire('select-share', this.selectedShare);
  },

  _userTapped () {
      this.fire('view-user', { id: this.selectedShare.user.id });
  }
});
