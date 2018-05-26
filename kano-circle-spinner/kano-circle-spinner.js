/**
`kano-circle-spinner`

Example:
    <kano-circle-spinner circle-count="10"
                         clockwise
                         duration="2"
                         radius="30">
    </kano-circle-spinner>

The following custom properties and mixins are also available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--kano-circle-spinner-color`    | Mixin applied to kano-alert    | `--color-dodger-blue`

@group Kano Elements
@hero hero.svg
@demo ./kano-circle-spinner/demo/kano-circle-spinner.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '../kano-style/color.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                @apply --layout-flex;
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-center-justified;
            }
            :host svg .circle {
                fill: var(--kano-circle-spinner-color, var(--color-dodger-blue));
                stroke-width: 2px;
                stroke-color: blue;
            }
        </style>
        <svg height\$="[[_height]]" id="spinner" width\$="[[_width]]"></svg>
`,

  is: 'kano-circle-spinner',

  properties: {
      /** Number of circles in the animation */
      circleCount: {
          type: Number,
          value: 10
      },
      /** Radius of each component circle */
      circleRadius: {
          type: Number,
          value: 5
      },
      /** Direction of the element:
        * true for clockwise
        * false for anti-clockwise
        */
      clockwise: {
          type: Boolean,
          value: false
      },
      /** Total animation duration in seconds */
      duration: {
          type: Number,
          value: 2
      },
      _height: {
          type: Number,
          computed: '_computeWidth(radius)'
      },
      /** Radius of the element */
      radius: {
          type: Number,
          value: 30
      },
      _width: {
          type: Number,
          computed: '_computeWidth(radius)'
      }
  },

  attached () {
      this._drawStepCircles();
  },

  _computeWidth (radius) {
      return radius * 2;
  },

  _createNodes () {
      let nodes = [],
          width = (this.radius * 2) + this.circleRadius,
          height = (this.radius * 2) + this.circleRadius,
          angle,
          x,
          y,
          i;

      for (i = 0; i < this.circleCount; i++) {
          angle = ((i / (this.circleCount / 2)) * Math.PI) - (90 * (Math.PI / 180)) + (2 * (Math.PI / this.circleCount));
          x = ((this.radius - this.circleRadius) * Math.cos(angle)) + this.radius;
          y = ((this.radius - this.circleRadius) * Math.sin(angle)) + this.radius;
          nodes.push({'id': i, 'x': x, 'y': y});
      }
      return nodes;
  },

  _drawStepCircles (elementRadius) {
      let xmlns = 'http://www.w3.org/2000/svg',
          element = this.$.spinner,
          circles = this._createNodes();
      for (let i = 0; i < this.circleCount; i++) {
          let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
              animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate'),
              offset = this.clockwise ? i : this.circleCount - i;
          circle.setAttribute('cx', (circles[i].x));
          circle.setAttribute('cy', (circles[i].y));
          circle.setAttribute('r', this.circleRadius);
          circle.setAttribute('opacity', 0);
          circle.setAttribute('class', 'circle');
          animate.setAttribute('attributeName', 'opacity');
          animate.setAttribute('values', '1;0');
          animate.setAttribute('times', `0;1`);
          animate.setAttribute('dur', `${this.duration}s`);
          animate.setAttribute('repeatCount', 'indefinite');
          animate.setAttribute('begin', `${this.duration * (offset / this.circleCount)}s`);
          circle.appendChild(animate);
          element.appendChild(circle);
      }
  }
});
