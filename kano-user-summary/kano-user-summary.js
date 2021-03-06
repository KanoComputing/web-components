/**
`kano-user-summary` is a simple thumbnail user display for the kano-nav

Example:

    <kano-user-summary user="[[user]]"></kano-user-summary>
    <kano-user-summary user="[[user]]" default-avatar="/my-default-avatar.png"></kano-user-summary>

@group Kano Elements
@hero hero.svg
@demo ./kano-user-summary/demo/kano-user-summary.html

*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '../kano-progress-bar/kano-progress-bar.js';
import '../kano-icons/kano-icons.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                --dark-grey: var(--color-stone);
                --kano-progress-bar-bg-color: var(--color-grey);
                --kano-progress-bar-color:  var(--color-amber);
                --kano-progress-bar-main: {
                    height: 4px;
                };
                display: block;
                box-sizing: border-box;
                font-size: 12px;
                height: 100%;
            }
            :host * {
                box-sizing: border-box;
            }
            :host .content {
                @apply --layout-flex;
                @apply --layout-horizontal;
                @apply --layout-justified;
                height: 100%;
            }
            :host .thumbnail {
                border-radius: 50%;
                background: var(--color-sky);
                position: relative;
                overflow: hidden;
                max-width: 32px;
                max-height: 32px;
                margin-top: 5px;
            }
            :host .avatar {
                @apply --layout-flex;
                width: 100%;
                position: relative;
                top: 5px;
            }
            :host .user {
                @apply --layout-flex;
                @apply --layout-vertical;
                @apply --layout-around-justified;
                padding-left: 8px;
            }
            :host .content .user {
                color: #ffffff;
            }
            :host .user-main {
                @apply --layout-flex-2;
                @apply --layout-horizontal;
                @apply --layout-justified;
                @apply --layout-end;
            }
            :host .level {
                background-color: var(--color-grey);
                border-radius: 3px;
                font-size: 10px;
                margin-right: 4px;
                padding: 1px 5px;
            }
            :host .username {
                color: #ffffff;
                font-weight: bold;
                white-space: nowrap;
                width: 100%;
            }
            :host .user-main {
                width: 100%;
            }
            :host .user-progress {
                @apply --layout-flex;
                @apply --layout-vertical;
                @apply --layout-start-justified;
                padding-top: 4px;
            }
            @media all and (max-width: 768px) {
                :host .user {
                    display: none;
                }
            }
        </style>
        <div class="content">
            <div class="thumbnail">
                <img src\$="[[avatar]]" class="avatar">
            </div>
            <div class="user">
                <div class="user-main">
                    <div class="level">
                        [[level]]
                    </div>
                    <div class="username">
                        [[username]]
                    </div>
                </div>
                <div class="user-progress">
                    <kano-progress-bar id="bar" min="0" max="100" display-label="">
                    </kano-progress-bar>
                </div>
            </div>
        </div>
`,

  is: 'kano-user-summary',

  properties: {
      /**
       * Source of the user's avatar
       */
      avatar: {
          type: String
      },
      /**
       * User level
       */
      level: {
          type: Number
      },
      username: {
          type: String
      },
      /**
       * Current progress of the user fomr 0 to 100 until the next level
       */
      progress: {
          type: Number,
          notify: true,
          observer: '_updateBar'
      },
  },

  _updateBar (currentProgress) {
      this.$.bar.startValue = 0;
      this.$.bar.addValue(currentProgress);
  }
});
