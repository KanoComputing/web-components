import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-image/iron-image.js';
import '../kano-icons/kano-icons.js';
import '../kano-style/typography.js';
import '../kano-style/button.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                @apply --layout-vertical;
                width: 300px;
                height: 266px;
                border-radius: 3px;
                background-color: white;
                overflow: hidden;
                transform: translateZ(0);
            }
            :host a {
                @apply --layout-vertical;
                height: 100%;
                text-decoration: none;
            }
            :host(.centered) {
                @apply --layout-center-justified;
            }
            .title, .card-content {
                color: #5a5a5a;
                margin: 0;
                padding: 0px 25px;
                text-decoration: none;
            }
            .title {
                font-size: 18px;
                font-weight: bold;
                @apply --kw-project-card-heading;
            }
            .cover, .cover > iron-image {
                display: flex;
                @apply --layout-center-justified;
                @apply --layout-center;
                z-index: 0;
                width: 100%;
                height: 190px;
                background-color: inherit;
            }
            .cover {
                position: relative;
            }
            dom-if, iron-image {
                width: 100%;
                height: 100%;
            }
            .info {
                @apply --layout-vertical;
                @apply --layout-start;
                @apply --layout-center-justified;
                flex: 1;
                min-height: 40px;
                position: relative;
            }
            .button-wrapper {
                @apply --layout-vertical;
                @apply --layout-fit;
                @apply --layout-center-justified;
                @apply --layout-center;
            }
            .action-btn {
                background-color: rgba(255,255,255,0.7);
                padding: 11px 23px 10px;
                font-family: var(--font-body);
                font-size: 18px;
                font-weight: 600;
                border-radius: 50px;
                border: 0;
                color: #5a5a5a;
                transition: all linear 200ms;
                cursor: pointer;
            }
            :host a:hover .action-btn {
                background-color: #62b22a;
                border-color: #62b22a;
                color: white;
            }
            .star {
                width: 44px;
                height: 44px;
                position: absolute;
                top: 50%;
                right: 18px;
                margin-top: -22px;
                display: none;
                transform: translateZ(0) scale(0);
                @apply --kw-project-card-star;
            }
            [hidden] {
                display: none !important;
            }
            @media screen and (max-width: 680px) {
                :host {
                    width: 285px;
                    height: 253px;
                }
            }
        </style>
        <a href\$="[[project.link]]">
        <div class="cover">
            <!-- Here a hidden attribute would be more fitting, but a bug on Safari 9 crashes the app if the image doesn't have a src -->
            <dom-if>
                <template is="dom-if" if="[[assetPath]][[project.image]]">
                    <iron-image src="[[assetPath]][[project.image]]" sizing="cover" preload="" fade="">
                    </iron-image>
                </template>
            </dom-if>
            <div class="button-wrapper">
                <div type="button" class="action-btn">[[label]]</div>
            </div>
        </div>
        <div class="info">
            <h4 class="title" id="title"></h4>
            <p class="card-content" hidden\$="[[!project.creator]]">by [[project.creator]]</p>
            <iron-icon class="star" id="star" icon="kano-icons:star" hidden\$="[[!project.completed]]"></iron-icon>
        </div>
        </a>
`,

  is: 'kano-project-card',

  properties: {
      project: {
          type: Object,
          value: null
      },
      label: {
          type: String,
          value: null
      },
      color: {
          type: String
      },
      assetPath: {
          type: String,
          value: 'static/'
      }
  },

  observers: [
      '_headingChanged(project.title)'
  ],

  findTheStar () {
      return this.$.star;
  },

  _headingChanged (value) {
      var safeDiv = document.createElement('div');
      safeDiv.textContent = value;
      this.$.title.innerHTML = safeDiv.innerHTML.replace(/\n/g, '<br>');
  }
});
