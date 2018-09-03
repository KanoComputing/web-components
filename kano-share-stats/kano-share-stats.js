import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '../kano-style/color.js';
import '../kano-icons/kano-icons.js';
import '../kano-particle-burst/kano-particle-burst.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                display: block;
            }
            button {
                @apply --layout-horizontal;
                @apply --layout-center;
                background-color: white;
                border: none;
                border-radius: 3px;
                color: var(--color-grey);
                cursor: pointer;
                font-family: 'Bariol', sans-serif;
                font-weight: bold;
                margin-right: 20px;
                padding: 0;
                position: relative;
                transition: 0.3s ease color;
            }
            button:hover {
                color: var(--color-black);
            }
            button:focus {
                outline: none;
            }
            :host .stats {
                @apply --layout-horizontal;
                color: var(--color-chateau);
                font-size: 14 px;
            }
            :host .icon {
                margin-right: 6px;
                transition: 0.3s ease opacity;
                width: 16px;
            }
            :host .kit.saved,
            :host .likes.liked {
                color: var(--color-black);
            }
            :host .likes.disabled {
                cursor: default;
            }
            :host .likes.disabled:hover {
                color: var(--color-grey);
            }
            :host .likes.liked .icon {
                color: var(--color-cinnabar);
            }
            :host .kit.saved .icon {
                color: var(--color-grassland);
            }
            :host .kit.saved .icon.remove-from-device {
                bottom: 0;
                color: var(--color-carnation);
                left: 0;
                margin: auto;
                opacity: 0;
                position: absolute;
                top: 0;
            }
            :host .kit:hover .icon.saved-to-device {
                opacity: 0;
            }
            :host .kit:hover .icon.remove-from-device {
                opacity: 1;
            }
            :host([tombstone]) button {
                pointer-events: none;
            }
            :host([tombstone]) button span {
                color: transparent;
                background: var(--color-stone);
            }
            :host([tombstone]) button img {
                opacity: 0.05;
            }
        </style>
        <div class="stats">
            <dom-if>
                <template is="dom-if" if="[[hardwareIntegration]]">
                    <button class\$="[[_computeKitClass(savedToDevice)]]" type="button" on-tap="_updateKit">
                        <template is="dom-if" if="[[savedToDevice]]">
                            <iron-icon class="icon saved-to-device" icon="kano-icons:saved-to-device"></iron-icon>
                            <iron-icon class="icon remove-from-device" icon="kano-icons:remove-from-device"></iron-icon>
                            <span>On your kit</span>
                        </template>
                        <template is="dom-if" if="[[!savedToDevice]]">
                            <iron-icon class="icon" icon="kano-icons:add-to-device"></iron-icon>
                            <span>Send to kit</span>
                        </template>
                    </button>
                </template>
            </dom-if>
            <button class\$="[[_computeLikeClass(liked, sharedByUser)]]" type="button" on-tap="_onLikeTapped">
                <kano-particle-burst id="particle-burst" number-particles="40" gravity="0.5" particle-decay="0.04" max-particle-size="13">
                    <iron-icon class="icon" icon="kano-icons:like"></iron-icon>
                </kano-particle-burst>
                <span class="number">[[likes]]</span>
                <span>&nbsp;likes</span>
            </button>
            <dom-if>
                <template is="dom-if" if="[[appIntegration]]">
                    <button class="remix" type="button" on-tap="_onRemixTapped">
                        <iron-icon class="icon" icon="kano-icons:remix"></iron-icon>
                        <span>Remix</span>
                    </button>
                </template>
            </dom-if>
        </div>
`,

  is: 'kano-share-stats',

  properties: {
      appIntegration: {
          type: Boolean
      },
      hardwareIntegration: {
          type: Boolean
      },
      liked: {
          type: Boolean
      },
      likes: {
          type: Number
      },
      savedToDevice: {
          type: Boolean,
          value: false
      },
      sharedByUser: {
          type: Boolean
      }
  },

  _computeLikeClass (liked, sharedByUser) {
      var baseClass = 'likes',
          likeClass = liked ? 'liked' : 'default',
          activeClass = sharedByUser ? 'disabled' : 'enabled';
      return `${baseClass} ${likeClass} ${activeClass}`;
  },

  _computeKitClass (saved) {
      return `kit ${saved ? 'saved' : 'default'}`;
  },

  _onLikeTapped () {
      if (this.sharedByUser) {
          return;
      }
      var particleBurst = this.$['particle-burst'];
      if (!this.liked) {
          particleBurst.triggerParticles();
          window.setTimeout(() => particleBurst.triggerParticles(), 250);
      }
      this.fire('like-tapped', !this.liked);
  },

  _onRemixTapped () {
      this.fire('remix');
  },

  _updateKit () {
      this.fire('update-device-action', !this.savedToDevice);
  }
});
