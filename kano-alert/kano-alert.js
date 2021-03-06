/**
`kano-alert`

Example:
    <kano-alert heading=""
                       text=""
                       icon-color="">
        <div slot="icon"></div>
        <div slot="actions"></div>
    </kano-alert>

### Slotted content
The default icon, as well as the action controls can be replaced with slotted content.
You can use 'kano-alert-primary' and 'kano-alert-secondary' classes for buttons in the actions slot.

2.0 changes: As of the custom elements v1, an element cannot style slotted elements that are not first childs
To be able to use `kano-alert-primary` and `kano-alert-secondary`, place the elements with this class at the root of the slot

1.0 style
```html

<kano-alert>
    <div slot="actions">
        <button class="kano-alert-primary">Confirm</button>
        <button class="kano-alert-secondary">Cancel</button>
    </div>
</kano-alert>

```

2.0 style
```html

<kano-alert>
    <button class="kano-alert-primary" slot="actions">Confirm</button>
    <button class="kano-alert-secondary" slot="actions">Cancel</button>
</kano-alert>

```

The following custom properties and mixins are also available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--kano-alert`                  | Mixin applied to kano-alert    | `{}`
`--kano-alert-icon-background`  | Background of the icon                | `#8d8d8d`
`--kano-alert-header`           | Mixin applied to the header           | `{}`
`--kano-alert-text`             | Mixin applied to the text             | `{}`
`--kano-alert-action-container` | Mixin applied to the action container | `{}`

@group Kano Elements
@hero hero.svg
@demo ./kano-alert/demo/kano-alert.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { PaperDialogBehavior } from '@polymer/paper-dialog-behavior/paper-dialog-behavior.js';
import { NeonAnimationRunnerBehavior } from '@polymer/neon-animation/neon-animation-runner-behavior.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/marked-element/marked-element.js';
import '../kano-icons/kano-icons.js';
import '../kano-style/button.js';
import '../kano-style/typography.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                @apply --layout-horizontal;
                @apply --layout-start;
                @apply --shadow-elevation-16dp;
                font-family: var(--font-body);
                background-color: #fff;
                color: #414a51;
                border-radius: 6px;
                padding: 28px 52px 28px 28px;
                @apply --kano-alert;
            }
            .badge {
                box-sizing: border-box;
                background: var(--kano-alert-icon-background, #8d8d8d);
                border-radius: 50%;
                padding: 12px;
                margin: 6px 28px 6px 4px;
            }
            .badge iron-icon {
                transform: rotate(-9deg);
                --iron-icon-width: 26px;
                --iron-icon-height: 26px;
                --iron-icon-fill-color: #fff;
            }
            h2 {
                font-family: var(--font-body);
                font-size: 20px;
                font-weight: bold;
                line-height: 24px;
                margin: 0 0 4px 3px;
                @apply --kano-alert-header;
            }
            [slot="markdown-html"] p {
                font-size: 14px;
                line-height: 20px;
                margin: 4px 0 18px 3px;
                @apply --kano-alert-text;
            }
            .actions {
                @apply --layout-horizontal;
                @apply --layout-start-justified;
                @apply --kano-alert-action-container;
            }
            .actions button,
            .actions ::slotted(button.kano-alert-primary),
            .actions ::slotted(button.kano-alert-secondary) {
                @apply --kano-button;
                border-radius: 3px;
                font-family: var(--font-body);
                font-size: 14px;
                line-height: 14px;
                font-weight: bold;
                text-shadow: none;
                color: #8d8d8d;
                padding: 12px 24px;
                transition: background-color 150ms;
                margin-right: 12px;
            }
            .actions button.primary,
            .actions ::slotted(button.kano-alert-primary) {
                background: #ff6900;
                color: #fff;
            }
            .actions button.primary:hover,
            .actions ::slotted(button.kano-alert-primary:hover) {
                background-color: #ff7d14;
            }
            .actions button.secondary,
            .actions ::slotted(button.kano-alert-secondary) {
                background: #e1e1e1;
            }
            .actions button.secondary:hover,
            .actions ::slotted(button.kano-alert-secondary:hover) {
                background: #e9e9e9;
            }
        </style>
        <slot name="icon">
            <div class="badge">
                <iron-icon icon="kano-icons:warning"></iron-icon>
            </div>
        </slot>
        <div class="dialog-text">
            <h2>[[heading]]</h2>
            <marked-element markdown="[[text]]">
                <div class="markdown-html" slot="markdown-html"></div>
            </marked-element>
            <div class="actions">
                <slot name="actions">
                    <button id="primary-btn" type="button" class="primary" dialog-confirm="">Confirm</button>
                    <button type="button" class="secondary" dialog-dismiss="">Cancel</button>
                </slot>
            </div>
        </div>
`,

  is: 'kano-alert',

  behaviors: [
      PaperDialogBehavior,
      NeonAnimationRunnerBehavior
  ],

  listeners: {
      'neon-animation-finish': '_onNeonAnimationFinish'
  },

  properties: {
      heading: String,
      text: String
  },

  _renderOpened: function () {
      this.cancelAnimation();
      this.playAnimation('entry');

      // Workaround: as the autofocus attribute will only work on the first render,
      // focus on the primary button imperatively

      // Check if there are slotted elements
      let slottedElements = this.getEffectiveChildren(),
          firstButton;

      if (slottedElements.length > 0) {
          firstButton = slottedElements[0];
      } else {
          firstButton = this.$['primary-btn'];
      }

      //Apply the focus
      firstButton.focus();
  },

  _renderClosed: function () {
      this.cancelAnimation();
      this.playAnimation('exit');
  },

  _onNeonAnimationFinish: function () {
      if (this.opened) {
          this._finishRenderOpened();
      } else {
          this._finishRenderClosed();
      }
  }
});
