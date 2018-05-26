/**
`kano-modal`

The following mixins are available for styling:

`--kano-modal-main`

@group Kano Elements
@demo ./kano-modal/demo/kano-modal.html
 */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '../kano-style/typography.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                --color-light-grey: #f4f5f6;
                --color-medium-grey: #a7aeb2;
                --color-dark-grey: #999999;
                --color-text: #253541;
                --color-progress-bar: #9FD465;
                --color-progress-bar-bg: #e5e5e5;
                --border-radius-large: 6px;
                --border-radius-medium: 3px;
                display: block;
            }
            :host [hidden] {
                display: none !important;
            }
            :host paper-dialog {
                background-color: transparent;
                margin: 0;
            }
            :host .fadeInUp {
                animation-duration: 0.1s;
                animation-name: fadeInUp;
                animation-fill-mode: both;
            }
            :host #wrapper {
                display: block;
                color: var(--color-text);
                border-radius: var(--border-radius-large);
                font-family: 'Bariol', sans-serif;
                margin: 0;
                overflow: hidden;
                padding: 0;
                position: relative;
                display: flex;
                @apply --kano-modal-main;
            }
            :host .content {
                flex: 1;
                background-color: var(--color-light-grey);
                box-sizing: border-box;
                padding-left: 0;
                padding-right: 0;
                position: relative;
                text-align: center;
            }
            :host .motif {
                display: block;
                height: 110px;
                left: 0;
                margin: 0 auto;
                position: absolute;
                right: 0;
                top: 15px;
                width: 110px;
            }
            :host .close-icon {
                width: 20px;
                position: absolute;
                top: 15px;
                right: 15px;
                cursor: pointer;
                z-index: 10;
                transition: transform 0.2s ease-in;
            }
            :host .close-icon:hover {
                transform: scale(1.15);
            }
            .float-in {
                animation: floatIn 180ms ease-out;
            }
            .pulse-up {
                animation: pulseUp 140ms linear;
            }
            .pulse-down {
                animation: pulseDown 100ms linear;
            }
            @keyframes floatIn {
                0% {transform: scale(0.5);}
                100% {transform: scale(1);}
            }
            @keyframes pulseUp {
                0% {transform: scale(1);}
                100% {transform: scale(1.15);}
            }
            @keyframes pulseDown {
                0% {transform: scale(1.1);}
                100% {transform: scale(1);}
            }
        </style>
        <paper-dialog id="modal" on-iron-overlay-opened="_openAnimation" opened="{{opened}}" modal="">
            <div class="wrapper" id="wrapper">
                <img hidden\$="[[!closable]]" class="close-icon" src="[[assetsPath]]/icons/modal-close-icon.svg" on-tap="_xTapped">
                <div class="content">
                    <img hidden\$="[[!motif]]" id="image" class="motif" src="[[motif]]">
                    <slot></slot>
                </div>
            </div>
        </paper-dialog>
`,

  is: 'kano-modal',

  properties: {
      motif: {
          type: String,
          value: null
      },
      assetsPath: {
          type: String,
          value: null
      },
      wasAnimated: {
          type: Boolean,
          value: false
      },
      closable: {
          type: Boolean,
          value: true,
          reflectToAttribute: true
      },
      opened: {
          type: Boolean,
          notify: true
      }
  },

  observers: [
      'soundChanged(sound)'
  ],

  attached () {
      this._changeImage = this._changeImage.bind(this);
  },

  _openAnimation () {
      if ('animate' in HTMLElement.prototype) {
          this.$.modal.animate([
              {transform: 'scale(0.5)'},
              {transform: 'scale(1)'}
          ], {
              duration: 200,
              easing: 'ease-out'
          });
      }
  },

  open () {
      this.$.modal.open();
  },

  close () {
      if ('animate' in HTMLElement.prototype) {
          this.$.modal.animate([
              {transform: 'scale(1)'},
              {transform: 'scale(0.5)'}
          ], {
              duration: 200,
              easing: 'ease-in'
          }).onfinish = () => {
              this.$.modal.close();
          };
      }
  },

  _xTapped () {
      this.close();
      this.fire('dismiss');
  },

  transitionImage (url) {
      if (!url) {
          return;
      }
      if (this.wasAnimated) {
          this._resetClasses();
      }
      this.newImage = url;
      this.wasAnimated = true;
      // There is a motif image already, transition to new, otherwise float in
      if (this.motif) {
          this.$.image.classList.add('pulse-up');
          this.$.image.addEventListener('animationend', this._changeImage);
      } else {
          this.$.image.classList.add('float-in');
          this.motif = url;
      }
  },

  _changeImage () {
      this.$.image.classList.add('pulse-down');
      this.motif = this.newImage;
      this.$.image.removeEventListener('animationend', this._changeImage);
  },

  _resetClasses () {
      this.$.image.classList.remove('pulse-down');
      this.$.image.classList.remove('pulse-up');
      this.$.image.classList.remove('float-in');
  }
});
