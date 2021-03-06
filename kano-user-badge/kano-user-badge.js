/**
`kano-user-badge` is a simple tooltip like user-badge box

Example:

    <kano-user-badge user="[[user]]" xp="700"></kano-user-badge>
    <kano-user-badge user="[[user]]" xp="2100" default-avatar="/my-default-avatar.png"></kano-user-badge>

Custom property | Description | Default
----------------|-------------|----------
`--kano-user-badge` | Mixin applied to the badge | `{}`
`--kano-user-badge-progress-color` | Color of the progress circle | `var(--color-orange)`

@group Kano Elements
@demo ./kano-user-badge/demo/kano-user-badge.html

*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '../kano-style/color.js';
import '../kano-circle-progress/kano-circle-progress.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                display: block;
                box-sizing: border-box;
            }
            kano-circle-progress {
                --kano-circle-progress: {
                    stroke: var(--kano-user-badge-progress-color, var(--color-orange));
                };
            }
            .content {
                position: relative;
                border-radius: 100%;
                @apply --kano-user-badge;
            }
            .user-avatar {
                position: absolute;
                top: 0px;
                left: 0px;
                border: 1px solid white;
                border-radius: 50%;
                @apply --kano-user-badge-avatar;
            }
        </style>
        <div class="content" style\$="[[_computeContentStyle(radius)]]">
            <kano-circle-progress value="[[progress]]" stroke-width="[[strokeWidth]]" radius="[[radius]]" style\$="[[_computeContentStyle(radius)]]">
                                  </kano-circle-progress>
            <img src\$="[[avatar]]" class="user-avatar" style\$="[[_computeAvatarStyle(radius, strokeWidth)]]">
        </div>
`,

  is: 'kano-user-badge',

  properties: {
      /**
       * Source of the user's avatar or the default avatar
       */
      avatar: {
          type: String,
          computed: '_computeAvatar(user)',
          readOnly: true,
          notify: true
      },
      /**
       * Fallback image to display
       */
      defaultAvatar: {
          type: String,
          value: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      },
      level: {
          type: Number,
          computed: '_computeLevel(xp)',
          readOnly: true,
          notify: true
      },
      /**
       * Current progress of the user fomr 0 to 1 until the next level
       */
      progress: {
          type: Number,
          computed: '_computeProgress(xp)',
          readOnly: true,
          notify: true
      },
      strokeWidth: {
          type: Number,
          value: 8
      },
      radius: {
          type: Number,
          value: 60
      },
      /**
       * The kano world user object
       */
      user: {
          type: Object,
          value: () => {
              return {};
          }
      },
      /**
       * Experience gained by the user
       */
      xp: {
          type: Number,
          value: 0
      }
  },

  created () {
      this.levelsMap = {
          '1': 0,
          '2': 150,
          '3': 300,
          '4': 500,
          '5': 800,
          '6': 1300,
          '7': 1600,
          '8': 2200,
          '9': 3000
      };
  },

  _computeAvatarStyle (radius, stroke) {
      return `margin: ${stroke}px; width: ${radius - 2 - stroke * 2}px; height: ${radius - 2 - stroke * 2}px;`
  },

  _computeContentStyle(radius) {
      return `width: ${radius}px; height: ${radius}px`;
  },

  _computeAvatar(user) {
      if (user && user.avatar && user.avatar.urls) {
          return user.avatar.urls.character || this.defaultAvatar;
      }
      return this.defaultAvatar;
  },

  _computeLevel (xp) {
      var current = 1,
          lvl;

      if (typeof xp !== 'number') {
          return null;
      }
      for (lvl in this.levelsMap) {
          if (xp < this.levelsMap[lvl]) {
              return parseInt(current);
          }
          current = lvl;
      }
      return parseInt(current);
  },

  _progressFromXp (xp) {
      var last = 0,
          lvl;

      for (lvl in this.levelsMap) {
          if (xp < this.levelsMap[lvl]) {
              return [xp - last, this.levelsMap[lvl] - xp, this.levelsMap[lvl] - last];
          }
          last = this.levelsMap[lvl];
      }

      return 0;
  },

  _percentFromXp (xp) {
      var progress = this._progressFromXp(xp),
          covered = progress[0],
          leap = progress[2];

      return (covered * 100) / leap;
  },

  _computeProgress(xp) {
      return this._percentFromXp(xp) / 100;
  }
});
