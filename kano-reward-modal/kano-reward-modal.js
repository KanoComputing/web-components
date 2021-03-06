/**
`kano-reward-modal` is a reward dialog to be displayed at the end of a Kano Code challenge.
Events fired: confirm, request-signup, close

 The following custom properties and mixins are also available for styling:
 Custom property | Description | Default
 ----------------|-------------|----------
 `--kano-reward-modal-h1` | main heading mixin | `{}`



@group Kano Elements
@demo demo/kano-reward-modal.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import { SoundPlayerBehavior } from '../kano-sound-player-behavior/kano-sound-player-behavior.js';
import '../kano-progress-bar/kano-progress-bar.js';
import '../kano-modal/kano-modal.js';
import '../kano-style/kano-style.js';
import '../kano-glint-animation/kano-glint-animation.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            /* Modal */
            :host {
                display: block;
                --kano-progress-bar-color: linear-gradient(to bottom, var(--color-candlelight) 50%, var(--color-topaz) 50%);
                --kano-progress-bar-label: {
                    top: 10px;
                    left: 2px;
                }
            }
            :host [hidden] {
                display: none !important;
            }
            :host .content {
                width: 430px;
                height: 430px;
                font-family: var(--font-body);
                @apply --layout-vertical;
            }
            :host([signup-label]) .content {
                width: 445px;
                height: 445px;
            }
            :host #pager {
                flex: 1;
                background-color: #fff;
                padding: 45px 60px 0;
                margin-top: 85px;
            }
            :host #pager[selected="levelup"],
            :host #pager[selected="badge"] {
                margin-top: 0;
            }
            @media screen and (max-width: 430px) {
                :host .content,
                :host([signup-label]) .content {
                    max-width: none !important;
                    width: 100%;
                }
            }

            /* XP display and animate */
            :host .level {
                color: var(--color-grey, #a7aeb2);
                opacity: 0;
                font-size: 16px;
                font-weight: bold;
                text-transform: uppercase;
                margin: 10px 0 5px;
                animation: 400ms ease-in forwards bounceIn;
            }
            :host #xp-animate .level, :host #xp-animate h1 {
                opacity: 1;
            }
            :host h1.username {
                font-size: 24px;
                opacity: 0;
                margin: 10px 0 0;
            }
            :host .xp {
                opacity: 0;
                text-align: center;
                padding: 0 5px;
                margin-top: 30px;
            }
            :host .xp-prefix {
                display: inline-block;
                color: var(--color-candlelight);
                font-size: 35px;
                font-weight: bold;
                line-height: 1em;
                vertical-align: 15%;
                margin-right: 6px;
            }
            :host .xp-value {
                display: inline-block;
                font-size: 36px;
                font-weight: bold;
            }
            :host .xp-suffix-medium {
                width: 35px;
                height: 20px;
                margin-bottom: 2px;
            }
            :host .icon-light {
                fill: var(--color-candlelight);
            }
            :host .icon-dark {
                fill: var(--color-topaz);
            }

            /* Xp progress bar */
            kano-progress-bar {
                height: 12px;
            }
            :host .progress-overlay {
                position: relative;
                float: right;
                min-width: 45px;
                top: 12px;
                right: -29px;
                border-radius: 3px;
                background-color: #333333;
                opacity: 0;
                box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
                padding: 6px 10px;
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-justified;
            }
            :host .progress-overlay::before {
                position: absolute;
                top: -4px;
                left: 0;
                right: 0;
                width: 10px;
                height: 10px;
                content: '';
                background-color: #333333;
                margin: auto;
                transform: rotate(45deg);
            }
            :host .overlay-xp {
                width: 20px;
            }
            :host .progress-value {
                display: inline-block;
                color: white;
                font-size: 16px;
                font-weight: bold;
                margin-left: 6px;
            }
            :host .slider-container {
                position: relative;
                width: 100%;
                height: 100%;
                margin: 55px 0 45px;
            }
            :host .start-level,
            :host .end-level {
                position: absolute;
                top: -25px;
                color: var(--color-grey);
                font-weight: bold;
                margin: 0;
            }
            :host .start-level {
                left: 0;
            }
            :host .end-level {
                right: 0;
            }

            /* Level up and badge section */
            :host #levelup,
            :host #badge {
                position: relative;
                @apply --layout-vertical;
                @apply --layout-center;
            }
            :host .levelup-header,
            :host .badge-header {
                color: var(--color-grey);
                text-transform: uppercase;
                margin: 0 0 10px;
                z-index: 2;
            }
            :host h1.levelup-heading,
            :host h1.badge-heading {
                font-size: 32px;
                line-height: 32px;
                margin: 5px 0 0;
                z-index: 2;
                @apply --kano-reward-modal-h1;
            }
            :host h1.levelup-heading ~ p,
            :host h1.badge-heading ~ p {
                font-size: 16px;
                margin: 15px 0 0;
                z-index: 2;
            }
            :host .newlevel-container {
                position: relative;
                width: 100%;
                height: 100%;
            }
            :host #newlevel-display,
            :host #oldlevel-display,
            :host .level-radial-background,
            :host .badge-radial-background,
            :host .badge-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                @apply --layout-vertical;
                @apply --layout-center;
                @apply --layout-center-justified;
            }
            :host #newlevel-display,
            :host #oldlevel-display {
                background-repeat: no-repeat;
                background-position: center;
                background-size: 150px;
                color: white;
                font-size: 50px;
                font-weight: bold;
                text-shadow: 2px 3px 2px rgba(0,0,0,0.3);
                z-index: 1;

            }
            :host .level-radial-background,
            :host .badge-container {
                z-index: 0;
            }
            :host .badge-radial-background {
                opacity: 0;
            }
            :host #level-radial-svg,
            :host #badge-radial-svg {
                width: 380px;
                height: 380px;
                flex: 1 0 auto;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 200%;
                border-radius: 50%;
                opacity: 0.5;
                animation: 25s linear infinite spin;
            }
            :host #badge-medal {
                width: 130px;
                height: 136px;
            }
            :host #level-radial-svg:before,
            :host #badge-radial-svg:before {
                position: absolute;
                top: 0;
                left: 0;
                content: "";
                width: 100%;
                height: 100%;
                background: radial-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,0) 40%, #fff 80%);
                z-index: -1;
            }
            :host .button {
                display: inline-block;
                opacity: 0;
                border: 0;
                border-radius: 40px;
                cursor: pointer;
                font-family: var(--font-body);
                font-size: 16px;
                font-weight: bold;
                margin: 0;
                outline: 0;
                text-transform: uppercase;
                background-color: var(--color-grey);
                color: white;
                padding: 9px 25px;
                min-width: 140px;
            }
            :host .button:hover {
                background-color: #414A51;
            }
            :host kano-glint-animation:nth-child(2) .button {
                margin-left: 20px;
            }
            :host kano-glint-animation:nth-child(2) .button,
            kano-glint-animation[active] .button {
                background-color: var(--color-kano-orange);
            }
            :host kano-glint-animation:nth-child(2) .button:hover,
            kano-glint-animation[active] .button:hover {
                background-color: #d95000;
            }
            .level-wrapper,
            .badge-wrapper {
                position: relative;
                width: 100%;
                height: 175px;
            }

            /*
            * Flip animation, credit to David Walsh
            * https://davidwalsh.name/css-flip
            */
            #flip-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10;
                perspective: 1000px;
            }

            /* Flip action */
            #flip-container.flip .flipper {
                transform: rotateY(-180deg);
            }
            #flip-container,
            .front,
            .back {
                width: 100%;
                height: 100%;
            }
            .flipper {
                position: relative;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                transition: 0.6s;
                transform-style: preserve-3d;
                position: relative;
            }
            .front, .back {
                position: absolute;
                top: 0;
                left: 0;
                backface-visibility: hidden;
            }
            .front {
                z-index: 2;
                transform: rotateY(0deg);
            }
            .back {
                transform: rotateY(-180deg);
            }

            /* Call to action section */
            :host .action {
                flex: 1 0 auto;
                background-color: #fff;
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-center-justified;
            }
            :host .button .icon ~ .action-text,
            :host .button .action-text ~ .icon {
                margin-left: 3px;
            }

            /* Animations */
            :host .float-in-250 {
                opacity: 0;
                animation: floatIn 300ms 250ms ease-out forwards;
            }
            :host .float-in-300 {
                opacity: 0;
                animation: floatIn 200ms 300ms ease-out forwards;
            }
            :host .float-in-400 {
                opacity: 0;
                animation: floatIn 200ms 400ms ease-out forwards;
            }
            :host .float-in-600 {
                opacity: 0;
                animation: floatIn 200ms 600ms ease-out forwards;
            }
            :host .float-in-out {
                opacity: 0;
                animation: floatIn 180ms 500ms forwards,
                        floatOut 200ms 1800ms ease-in-out forwards;
            }
            :host .big-in {
                opacity: 0;
                animation: bigIn 200ms 250ms ease-out forwards;
            }
            :host .float-in-button-first {
                animation: floatIn 150ms 200ms forwards;
            }
            :host .float-in-button-second {
                animation: floatIn 150ms 400ms forwards;
            }
            @keyframes bigIn {
                0% {transform: scale(3); opacity: 0;}
                100% {transform: scale(1); opacity: 1;}
            }
            @keyframes floatIn {
                0% {transform: scale(0.4); opacity: 0;}
                70% {opacity: 1;}
                100% {transform: scale(1); opacity: 1;}
            }
            @keyframes floatOut {
                0% {transform: scale(1); opacity: 1;}
                70% {opacity: 0;}
                100% { transform: scale(0.4); opacity: 0;}
            }
            @keyframes spin {
                0% {transform: rotate(0deg);}
                100% {transform: rotate(360deg);}
            }
        </style>
        <kano-modal id="modal" opened="{{opened}}" assets-path="[[assetsPath]]" on-dismiss="_onDialogClosed">
            <div class="content">
                <iron-pages id="pager" attr-for-selected="id" selected\$="[[panel]]">
                    <div id="xp-display">
                        <p class="level float-in-300">Level [[progress.currentLevel]]</p>
                        <h1 class="username float-in-400">[[header]]</h1>
                        <div class="xp float-in-out">
                            <span class="xp-prefix">+</span>
                            <span class="xp-value">[[progress.gainedXp]]</span>
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 31.3 24.6" xml:space="preserve" class="xp-suffix-medium">
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
                    </div>
                    <div id="xp-animate">
                        <p class="level">Level [[progress.currentLevel]]</p>
                        <h1 class="username">[[header]]</h1>
                        <div class="slider-container">
                            <p class="start-level">LV.{{progress.currentLevel}}</p>
                            <p class="end-level">LV.{{progress.nextLevel}}</p>
                            <kano-progress-bar id="progress-bar" immediate-value="{{immediateValue}}" display-label="">
                            <div id="progress-label" slot="label">
                                <div class="progress-overlay float-in-300">
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 31.3 24.6" xml:space="preserve" class="overlay-xp">
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
                                    <div class="progress-value">[[immediateValue]]</div>
                                </div>
                            </div>
                            </kano-progress-bar>
                        </div>
                    </div>
                    <div id="levelup">
                        <h4 class="levelup-header">New Level</h4>
                        <div class="level-wrapper">
                            <div id="flip-container">
                                <div class="flipper">
                                    <div class="front newlevel-container">
                                        <div id="oldlevel-display">[[progress.currentLevel]]</div>
                                    </div>
                                    <div class="back newlevel-container">
                                        <div id="newlevel-display">[[progress.nextLevel]]</div>
                                    </div>
                                </div>
                            </div>
                            <div class="level-radial-background">
                                <div id="level-radial-svg"></div>
                            </div>
                        </div>

                        <h1 class="levelup-heading">Congratulations!</h1>
                        <p>You have earned a new level</p>
                    </div>
                    <div id="badge">
                        <h4 class="badge-header">New Badge</h4>
                        <div class="badge-wrapper">
                            <div class="badge-container">
                                <iron-image id="badge-medal" src="[[displayedBadge.imageUrl]]" class="big-in" sizing="cover" preload=""></iron-image>
                            </div>
                            <div class="badge-radial-background float-in-400">
                                <div id="badge-radial-svg"></div>
                            </div>
                        </div>
                        <h1 class="badge-heading float-in-250">[[displayedBadge.title]]</h1>
                        <p class="float-in-600">[[displayedBadge.description]]</p>
                    </div>
                </iron-pages>
                <template is="dom-if" if="[[buttonsVisible]]">
                    <div class="action">
                        <kano-glint-animation running="" active\$="[[!_signupLabel]]">
                            <button class="button float-in-button-first" on-tap="_confirmTapped">
                                <span class="action-text">[[dismissLabel]]</span>
                            </button>
                        </kano-glint-animation>
                        <kano-glint-animation hidden\$="[[!_signupLabel]]" running="" class="signup-action">
                            <button class="button float-in-button-second" on-tap="_signupActionTapped">
                                <span class="action-text">[[_signupLabel]]</span>
                            </button>
                        </kano-glint-animation>
                    </div>
                </template>
            </div>
        </kano-modal>
`,

  is: 'kano-reward-modal',
  behaviors: [SoundPlayerBehavior],

  properties: {
      progress: {
          type: Object,
          readOnly: true
      },
      panel: {
          type: String,
          value: "badge"
      },
      panelsToShow: {
          type: Array,
          computed: '_computePanelsToShow(progress.*)'
      },
      header: {
          type: String,
          value: null
      },
      /** Button label for signup */
      signupLabel: {
          type: String,
          value: 'Save your Xp',
          reflectToAttribute: true
      },
      dismissLabel: {
          type: String,
          value: 'OK I\'ve got it'
      },
      opened: {
          type: Boolean,
          notify: true
      },
      assetsPath: {
          type: String,
          value: '/assets'
      },
      displayedBadge: {
          type: Object
      },
      sound: {
          type: String,
          observer: '_onSoundSet'
      }
  },

  attached () {
      /* setting background css paths with assetsPath variable */
      let newLevelPath = `url("${this.assetsPath}/icons/new-level.svg")`;
      this.$['oldlevel-display'].style['background-image'] = newLevelPath;
      this.$['newlevel-display'].style['background-image'] = newLevelPath;
      let levelUpRadialPath = `url("${this.assetsPath}/icons/levelup-radial.svg")`;
      this.$['level-radial-svg'].style['background-image'] = levelUpRadialPath;
      this.$['badge-radial-svg'].style['background-image'] = levelUpRadialPath;
  },

  /** TODO: Remove `open` method and switch all its calls to `compute` */
  open (data, user) {
      this.process(data, user);
  },

  process (data, user) {
      this._reset();
      if (!data || !data.update) {
          return;
      }
      this._computeProgress(data);
      this.header = user ? user.username : 'Nice work!';
      this._signupLabel = user ? null : this.signupLabel;
      if (this.panelsToShow.length) {
          this._openModal();
      }
  },

  close () {
      this.$.modal.close();
  },

  _computeProgress (data) {
      /** `levels` includes xp changes and level ups */
      let levels = data.update.levels,
           /**
            * `badges` is an array of all the sets of badges (for example
            * `badges-basic`, `badges-pixel-kit` or `badges-motion-sensor`).
            * Note that this array won't have the badge set as key, it's a
            * numerically indexed array.
            */
          badges = [],
          /**
           * Regular expression to filter the progress keys searching for
           * badge related entries.
           */
          badgesTest = new RegExp('badges-.*'),
          /* Reduced array of new badges earned */
          badgesEarned = [],
          /* All the values to be set to `this.prgress` */
          progress = {};

      badges = Object.keys(data.update)
          .filter((key) => {
              return badgesTest.test(key);
          })
          .map((key) => {
              if (data.update[key].changes) {
                  return data.update[key].changes.new;
              }
          });
      if (badges.length) {
          badgesEarned = badges.reduce((acc, badge) => {
              return acc.concat(badge);
          }, []);
          progress.badges = badgesEarned;
      }

      if (levels) {
          let levelsChanges = levels.changes,
              levelsProgress = levels.progress;
          /**
           * If leveled up, keep the current level as the old one for
           * animation purposes, otherwise use the current progress level
           */
          progress.currentLevel =
              levelsChanges.level ? levelsChanges.level.oldValue : levelsProgress.level;
          progress.nextLevel = progress.currentLevel + 1;
          progress.showLevelup = !!levelsChanges.level;
          if (levelsChanges['total-xp']) {
              progress.gainedXp =
                  levelsChanges['total-xp'].newValue -
                  levelsChanges['total-xp'].oldValue;
          }
          /** Sanity check before setting up progress bar */
          if (levelsChanges && levelsProgress) {
              /** Setup progress bar info */
              this._setupProgressBar(levelsProgress, levelsChanges);
          }
      }
      /** Private Polymer method */
      this._setProgress(progress);
  },

  _computePanelsToShow (progress) {
      if (!progress.base) {
          return;
      }
      let panelsToShow = [];
      if (progress.base.gainedXp) {
          panelsToShow.push('xp-display');
          panelsToShow.push('xp-animate');
      }
      if (progress.base.showLevelup) {
          panelsToShow.push('levelup');
      }
      if (progress.base.badges) {
          panelsToShow.push('badges');
      }
      return panelsToShow;
  },

  _openModal () {
      let chain = Promise.resolve();
      this.panelsToShow.forEach((panels) => {
          switch (panels) {
              case 'xp-display':
                  chain = chain.then(() => this._launchXpDisplay());
                  break;
              case 'xp-animate':
                  chain = chain.then(() => this._launchXpAnimate());
                  break;
              case 'levelup':
                  chain = chain.then(() => this._launchLevelUp());
                  break;
              case 'badges':
                  this.progress.badges.forEach((badge, index) => {
                      chain = chain.then(() => this._launchBadge(index));
                  });
                  break;
          }
      });
      this.$.modal.open();
  },

  _launchXpDisplay () {
      return new Promise((resolve, reject) => {
          this.panel = 'xp-display';
          if (this.sound) {
              this.playSound(this.sound);
          }
          this.async(() => {
              this.$.modal.transitionImage(`${this.assetsPath}/icons/xp-star.svg`)
          }, 280);
          this.async(() => {
              this.$.modal.transitionImage(`${this.assetsPath}/avatar/judoka-smile.svg`)
          }, 2100);
          this.async(() => resolve(), 2800);
      });
  },

  _launchXpAnimate () {
      return new Promise((resolve, reject) => {
          let speed = 700,
              progress = this.progress;
          this.panel = 'xp-animate';
          /** Different animation speed for different scenarios */
          if (progress.currentLevel === 1 && progress.gainedXp === 100) {
              speed = 1300;
          } else if (progress.gainedXp === 100) {
              speed = 1000;
          }
          this.async(() => {
              this.$['progress-bar'].addValue(progress.gainedXp, speed);
          }, 1000);
          this.async(() => {
              this.$.modal.motif = `${this.assetsPath}/avatar/judoka-face.svg`;
          }, speed + 1200);

          /**
           * If this is the last panel, show "ok I got it" button,
           * otherwise move on with the promises
           */
          if (
              this.panelsToShow.indexOf('xp-animate') ===
              this.panelsToShow.length - 1
          ) {
              this.async(() => {
                  this.buttonsVisible = true;
                  resolve();
              }, 2400);
          } else {
              this.async(() =>  resolve(), 3400);
          }
      });
  },

  _launchLevelUp () {
      return new Promise((resolve, reject) => {
          this.panel = 'levelup';
          if (this.sound) {
              this.playSound(this.sound);
          }
          this.$.modal.motif = null;
          this.async(() => {
              this.$['flip-container'].classList.toggle("flip");
          }, 1400);
          /**
           * If this is the last panel, show "ok I got it" button,
           * otherwise move on with the promises
           */
          if (
              this.panelsToShow.indexOf('levelup') ===
              this.panelsToShow.length - 1
          ) {
              this.async(() => {
                  this.buttonsVisible = true;
                  resolve();
              }, 2000);
          } else {
              this.async(() => resolve(), 3400);
          }
      });
  },

  _launchBadge (index) {
      return new Promise((resolve, reject) => {
          let badges = this.progress.badges;
          this.panel = 'badge';
          this.$.modal.motif = null;
          this.displayedBadge = badges[index];
          /**
           * If the displayed badge is the last in the array,
           * show buttons, otherwise keep displaying further badges.
           * This is assuming that `_launchBadge` is the last thing
           * to display.
           */
          if (index === badges.length - 1) {
              this.async(() => {
                  this.buttonsVisible = true;
                  resolve();
              }, 2000);
          } else {
              this.async(() => {
                  this._launchBadge(index + 1);
              }, 3400);
          }
      });
  },

  _signupActionTapped () {
      this.fire('request-signup');
      this.close();
  },

  _confirmTapped () {
      this.fire('confirm');
      this.close();
  },

  _reset () {
      this.panel = null;
      this.$.modal.motif = null;
      this.buttonsVisible = false;
  },

  _setupProgressBar (levelsProgress, levelsChanges) {
      let xp = levelsChanges['total-xp'].oldValue,
          nextThreshold = levelsProgress['next-threshold'],
          offset = levelsProgress['xp-offset'],
          progressBar = this.$['progress-bar'];

      if (levelsChanges['next-threshold']) {
          nextThreshold = levelsChanges['next-threshold'].oldValue;
      }
      if (levelsChanges['xp-offset']) {
          offset = levelsChanges['xp-offset'].oldValue;
      }
      progressBar.startValue = xp;
      progressBar.min = xp - offset;
      progressBar.max = nextThreshold;
  },

  _onDialogClosed () {
      this.fire('close');
  },

  _onSoundSet (sound) {
      if (sound) {
          this.loadSound(sound);
      }
  }
});
