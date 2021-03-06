/**
`kano-progress-bar`

The following custom properties and mixins are also available for styling:
Custom property | Description | Default
----------------|-------------|----------
`--kano-progress-bar-main` | Custom property applied to host| `{}`,
`--kano-progress-bar-bg-color` | Custom property applied to the progress bar background color | `{}`,
`--kano-progress-bar-color` | Custom property to the progress bar fill color | `{}`
`--kano-progress-bar-label` | Mixin applied to the progress label | `{}`

@group Kano Elements
@demo ./kano-progress-bar/demo/kano-progress-bar.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '../kano-style/typography.js';
import '../kano-style/color.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                display: block;
                width: 100%;
                height: 12px;
                @apply --kano-progress-bar-main;
            }
            :host .slider-container {
                height: 100%;
                position: relative;
            }
            :host .label-container {
                position: absolute;
                top: -40px;
                left: 0px;
                width: 100%;
                transform: translateX(-100%);
                font-family: var(--font-body, sans-serif);
                @apply --kano-progress-bar-label;
            }
            :host .label {
                float: right;
            }
            :host #progress-fill {
                width: 100%;
                height: 100%;
                background: var(--kano-progress-bar-color, var(--color-light-green));
                border-radius: 12px;
                transform: translateX(-100%);
            }
            :host .progress-shadow {
                position: relative;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
                z-index: 2;
                overflow: hidden;
                border-radius: 12px;
                background: var(--kano-progress-bar-bg-color, var(--color-grey-lightest));
            }
        </style>
        <div id="progress" class="slider-container">
            <div class="progress-shadow">
                <div id="progress-fill"></div>
            </div>
            <div hidden\$="[[!displayLabel]]" id="progress-label" class="label-container">
                <div class="label">
                    <slot name="label"></slot>
                </div>
            </div>
        </div>
`,

  is: 'kano-progress-bar',

  properties: {
      /**
       * The minimum value in the progress bar's range
       */
      min: {
          type: Number,
          value: 0,
      },
      /**
       * The maximum value in the progress bar's range
       */
      max: {
          type: Number,
          value: 100
      },
      /**
       * The static value of the bar before any incrementing
       */
      startValue: {
          type: Number,
          value: 0,
          observer: 'setupBar'
      },
      /**
       * The up-to-date value of the progress bar
       */
      immediateValue: {
          type: Number,
          value: null,
          notify: true
      },
      animating: {
          type: Boolean,
          value: false
      },
      displayLabel: {
          type: Boolean,
          value: false
      }
  },

  observers: [
      'setupBar(startValue, min, max)'
  ],

  setupBar (value, min, max) {
      var startRatio = (value - this.min) / (this.max - this.min);
      this.immediateValue = this.startValue;

      this.$['progress-fill'].style.transform = `translateX(-${100 - startRatio * 100}%)`;
      if (this.displayLabel) {
          this.$['progress-label'].style.transform = `translateX(-${100 - startRatio * 100}%)`;
      }
      this._checkLimits(value);
  },

  addValue (addedValue, speed) {
      if (this.inProgress || !addedValue) {
          return;
      }
      speed = speed || 700;
      this.$['progress-fill'].style.transition = `transform ${speed}ms linear`;
      this.$['progress-label'].style.transition = `transform ${speed}ms linear`;
      this._animateProgress(addedValue + this.startValue, this.startValue, speed);
  },

  _animateProgress (targetValue, oldValue, speed) {
      var newRatio = (targetValue - this.min) / (this.max - this.min);
      newRatio = this._limitingValue(newRatio, 0, 1);
      this.inProgress = true;
      this.$['progress-fill'].style.transform = `translateX(-${100 - newRatio * 100}%)`;
      if (this.displayLabel) {
          this.$['progress-label'].style.transform = `translateX(-${100 - newRatio * 100}%)`;
      }
      this._incrementValue(targetValue, oldValue, speed / Math.abs(targetValue - oldValue));
  },

  _incrementValue (targetValue, oldValue, frequency) {
      if (this.min <= targetValue && this.max >= targetValue) {
          // incrementing or decrementing
          var incrementUnit = targetValue > oldValue ? +1 : -1,
              incrementing = setInterval(() => {
                  this.immediateValue = this.immediateValue + incrementUnit;
                  if (this.immediateValue >= targetValue) {
                      this.startValue = this.immediateValue;
                      this.inProgress = false;
                      clearInterval(incrementing);
                  }
          }, frequency);
      } else {
          this.inProgress = false;
      }
  },

  _checkLimits (value) {
      if (value <= this.min) {
          this.fire('min-reached');
      } else if (value >= this.max) {
          this.fire('max-reached');
      }
  },

  _limitingValue (value, min, max) {
      value = Math.min(value, max);
      value = Math.max(value, min);
      return value;
  },

  _resetTransition () {
      this.$['progress-fill'].style.transition = 'none';
      this.$['progress-label'].style.transition = 'none';
  }
});
