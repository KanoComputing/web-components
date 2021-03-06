/**
`kano-step`

The following custom properties and mixins are also available for styling:
Custom property | Description | Default
----------------|-------------|----------
`--kano-step-line` | Mixin applied to the line connecting the steps| `{}`,
`--kano-step-line-first` | Mixin applied to the line before the step | `{}`
`--kano-step-line-last` | Mixin applied to the line after the step | `{}`
`--kano-step-label` | Mixin applied to the step label | `{}`
`--kano-step-horizontal` | Mixin applied to :host([horizontal]) | `{}`
`--kano-step-vertical` | Mixin applied to :host([vertical]) | `{}`

@group Kano Elements
@demo ./kano-step/demo/kano-step.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                position: relative;
            }
            :host([horizontal]) {
                @apply --layout-vertical;
                @apply --kano-step-horizontal;
            }
            :host([vertical]) {
                @apply --layout-horizontal;
                @apply --kano-step-vertical;
            }
            .step {
                @apply --layout-center;
            }
            :host([horizontal]) .step {
                @apply --layout-horizontal;
                @apply --layout-center-justified;
            }
            :host([vertical]) .step {
                @apply --layout-vertical;
                height: 100%;
            }
            .label-container {
                position: absolute;
                min-height: 60px;
                @apply --layout-center-justified;
            }
            :host([horizontal]) .label-container {
                @apply --layout-horizontal;
                @apply --layout-center;
                bottom: -70px;
                left: 0;
                width: 100%;
                @apply --kano-step-label;
            }
            :host([vertical]) .label-container {
                @apply --layout-vertical;
                top: 0;
                left: 20px;
                height: 100%;
                @apply --kano-step-label;
            }
            .line.first {
                @apply --kano-step-line-first;
            }
            .line.last {
                @apply --kano-step-line-last;
            }
            :host(:last-of-type) .line.last,
            :host(:first-of-type) .line.first {
                visibility: hidden;
            }
            .line {
                @apply --layout-flex;
                min-height: 2px;
                min-width: 2px;
                background-color: var(--kano-step-line-color, #000);
                @apply --kano-step-line;
            }
            :host(:first-of-type) .line {
                left: 10px;
            }
            :host(:last-of-type) .line {
                left: -10px;
            }
        </style>
            <div class="step">
                <div class="line first"></div>
                <slot name="icon"></slot>
                <div class="line last"></div>
            </div>
            <div class="label-container">
                <slot name="label"></slot>
            </div>
`,

  is: 'kano-step',

  getIcon () {
      return this.$.icon;
  }
});
