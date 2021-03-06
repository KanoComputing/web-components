/**
`kano-user-stats`

The following custom properties and mixins are also available for styling:
Custom property | Description | Default
----------------|-------------|----------
`--kano-user-stats-wrapper` | Custom property applied to the stats wrapper | `{}`

@group Kano Elements
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '../kano-style/kano-style.js';

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '../kano-icons/kano-icons.js';
import '../kano-style/typography.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/* globals Polymer */
Polymer({
  _template: html`
        <style>
            :host {
                display: block;
                font-family: var(--font-body);
            }
            :host .wrapper {
                background-color: var(--color-chateau);
                color: #ffffff;
                @apply --kano-user-stats-wrapper;
            }
            :host .content {
                margin: 0 auto;
                max-width: var(--content-width);
                @apply --layout-flex;
            }
            :host .badge {
                line-height: 0;
                position: relative;
            }
            :host .level {
                opacity: 0.5;
                font-size: 14px;
                font-weight: bold;
                line-height: 14px;
                padding-bottom: 16px;
                text-transform: uppercase;
            }
            :host .progress {
                display: block;
                margin: auto;
            }
            :host .avatar {
                margin: auto;
                @apply --layout-fit;
                margin: auto;
                position: absolute;
                top: 115px;
                right: 0;
                bottom: 0;
                height: auto;
                left: 0;
            }
            :host .avatar-wrapper {
                margin: auto;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                height: 100px;
                width: 100px;
                left: 0px;
                border-radius: 50%;
                background-color: var(--color-sky);
                overflow: hidden;
            }
            :host .circle-full {
                fill: transparent;
                opacity: 0.5;
                stroke-linecap: round;
                stroke: var(--color-black);
            }
            :host .progress-arc {
                fill: transparent;
                stroke: var(--color-daffodil);
            }
            :host .end-cap {
                fill: var(--color-daffodil);
                stroke: 0;
            }
            :host .detail {
                @apply --layout-start-justified;
                @apply --layout-vertical;
            }
            :host .username {
                font-size: 32px;
                font-weight: bold;
                line-height: 32px;
                margin: 0;
                padding-bottom: 16px;
            }
            :host .stats {
                font-size: 18px;
                line-height: 18px;
            }
            :host .stat .value {
                display: block;
            }
            :host .stat .value {
                font-size: 18px;
                font-weight: bold;
                text-shadow: 0 3px 0 rgba(0, 0, 0, 0.2);
            }
            :host .stat iron-icon {
                -webkit-filter: drop-shadow(0 2px 0 rgba(0, 0, 0, 0.15));
                filter: drop-shadow(0 2px 0 rgba(0, 0, 0, 0.15));
                width: 15px;
            }
            @media all and (max-width: 480px) {
                :host .header {
                    text-align: center;
                    @apply --layout-vertical;
                    @apply --layout-center;
                }
                :host .stats {
                    text-align: center;
                    @apply --layout-vertical;
                }
            }
            @media all and (min-width: 481px) {
                :host .header {
                    @apply --layout-vertical;
                }
                :host .stats {
                    @apply --layout-horizontal;
                }
                :host .stat:nth-child(n+2) {
                    padding-left: 30px;
                }
            }
            @media all and (max-width: 680px) {
                :host .content {
                    @apply --layout-vertical;
                }
                :host .header {
                    @apply --layout-center-justified;
                }
                :host .stats {
                    @apply --layout-center-justified;
                }
            }
            @media all and (min-width: 681px) {
                :host .content {
                    @apply --layout-horizontal;
                }
                :host .detail {
                    padding-left: 32px;
                }
            }
        </style>
        <div class="wrapper">
            <div class="content">
                <div class="summary">
                    <div class="badge">
                        <svg xmlns="http://www.w3.org/2000/svg" id="svg" class="progress">
                            <defs>
                                <marker id="end-marker">
                                    <circle id="end-cap" class="end-cap" r="0.5"></circle>
                                </marker>
                            </defs>
                            <circle id="circle-full" class="circle-full"></circle>
                            <path id="progress-arc" class="progress-arc" marker-start="url(#end-marker)"></path>
                        </svg>
                        <div class="avatar-wrapper">
                          <img id="avatar" src="[[avatar]]" class="avatar">
                        </div>
                    </div>
                </div>
                <div class="detail">
                    <div class="header">
                        <div class="level">
                            Level [[level]]
                        </div>
                        <h2 class="username">
                            [[user.username]]
                        </h2>
                    </div>
                    <div class="stats">
                        <div class="stat shares">
                            <span class="value"><iron-icon icon="kano-icons:shares"></iron-icon> [[stats.shares]]</span>
                        </div>
                        <div class="stat followers">
                            <span class="value"><iron-icon icon="kano-icons:followers"></iron-icon> [[stats.followers]]</span>
                        </div>
                        <div class="stat staff-picks">
                            <span class="value"><iron-icon icon="kano-icons:staff"></iron-icon> [[stats.staffPicks]]</span>
                        </div>
                        <div class="stat badges">
                            <span class="value"><iron-icon icon="kano-icons:medals"></iron-icon> [[stats.badges]]</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`,

  is: 'kano-user-stats',

  properties: {
      /**
       * Return the user avatar image or the default avatar
       */
      avatar: {
          type: String,
          computed: '_computeAvatar(user)'
      },
      /**
       * Default avatar image
       */
      defaultAvatar: {
          type: String,
          value: 'https://s3.amazonaws.com/kano-avatars/judoka-standard.png'
      },
      /**
       * User level computed from the XP
       */
      level: {
          type: Number,
          computed: '_computeLevel(user.profile.progress.levels)',
          readOnly: true
      },
      /**
       * Current progress of the user fomr 0 to 1 until the next level
       */
      progress: {
          type: Number,
          computed: '_computeProgress(user.profile.progress.levels)',
          observer: '_updateProgress',
          readOnly: true,
          notify: true
      },
      radius: {
          type: Number,
          value: 200
      },
      strokeWidth: {
          type: Number,
          value: 15
      },
      /**
       * Comvenience property for user stats
       */
      stats: {
          type: Object,
          computed: '_computeStats(user.profile.*)'
      },
      /**
       * The Kano user object
       */
      user: {
          type: Object,
          value: () => {},
          required: true
      }
  },

  ready () {
      this.radius = this.radius || this.offsetWidth;
      this._updateBadge();
      this._updateBackground();
  },

  _computeAvatar (user) {
      if (user && user.avatar && user.avatar.urls) {
          return user.avatar.urls.character || this.defaultAvatar;
      }
      return this.defaultAvatar;
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
      return levels.complete;
  },

  _computeStats (profile) {
      var profile = profile && profile.base,
          stats = {
              badges: 0,
              followers: 0,
              shares: 0,
              staffPicks: 0
          },
          unlockedBadges = [],
          badgeTest = new RegExp('badges-.*');
      if (!profile) {
          return stats;
      }
      if (profile.progress) {
          for (var category in profile.progress) {
              /**
              * Check whether the category is a badge category
              */
              var isBadge = badgeTest.test(category);
              if (isBadge) {
                  /**
                  * Iterate over all badges in a badge category and push
                  * a badge into the unlockedBadges array if it has
                  * been unlocked
                  */
                  var categoryBadges = profile.progress[category].badges;
                  categoryBadges.forEach(function (badge) {
                      if (badge.unlocked) {
                          unlockedBadges.push(badge);
                      }
                  });
              }
          }
          stats.badges = unlockedBadges.length;
      }
      if (profile.following) {
          stats.followers = profile.following.length;
      }
      if (profile.stats && profile.stats.computed) {
          stats.shares = profile.stats.computed.online_shares;
      }
      return stats;
  },

  _describeArc (x, y, radius, startAngle, endAngle) {
      var start = this._polarToCartesian(x, y, radius, endAngle),
          end = this._polarToCartesian(x, y, radius, startAngle),
          largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1",
          d = [
              'M', start.x, start.y,
              'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
          ].join(' ');
      return d;
  },

  _polarToCartesian (centerX, centerY, radius, angleInDegrees) {
      var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
          x: centerX + (radius * Math.cos(angleInRadians)),
          y: centerY + (radius * Math.sin(angleInRadians))
      };
  },

  _updateBackground () {
      var width = this.radius,
          circleFull = this.$$('#circle-full'),
          r = (this.radius - this.strokeWidth * 2) / 2,
          c = Math.PI * (r * 2);
      circleFull.setAttributeNS(null, 'cx', width / 2);
      circleFull.setAttributeNS(null, 'cy', width / 2);
      circleFull.setAttributeNS(null, 'r', r);
      circleFull.setAttributeNS(null, 'stroke-width', `${this.strokeWidth}px`);
      circleFull.setAttributeNS(null, 'stroke-dasharray', c);
  },

  _updateBadge () {
      var svg = this.$.svg,
          avatarImage = this.$.avatar,
          width = this.radius;
      svg.setAttribute('width', width);
      svg.setAttribute('height', width);
      svg.setAttribute('viewBox', `0 0 ${width} ${width}`);
      avatarImage.setAttribute('width', width * 0.65);
      avatarImage.setAttribute('height', width * 0.65);
  },

  _updateProgress (progress) {
      var progressArc = this.$$('#progress-arc'),
          endMarker = this.$$('#end-marker'),
          endCap = this.$$('#end-cap'),
          r = (this.radius - this.strokeWidth * 2) / 2,
          c = Math.PI * (r * 2),
          width = this.radius,
          arcAngle = 360 * progress,
          arc = this._describeArc(width / 2, width / 2, r, 0, arcAngle);
      if (!this.radius) {
          return;
      }
      progressArc.setAttributeNS(null, 'd', arc);
      progressArc.setAttributeNS(null, 'stroke-width', `${this.strokeWidth}px`);
      endMarker.setAttributeNS(null, 'markerHeight', width);
      endMarker.setAttributeNS(null, 'markerWidth', width);
      endMarker.setAttributeNS(null, 'refX', width / 2);
      endMarker.setAttributeNS(null, 'refY', width / 2);
      endCap.setAttributeNS(null, 'cx', width / 2);
      endCap.setAttributeNS(null, 'cy', width / 2);
  }
});
