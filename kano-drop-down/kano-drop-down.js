/*

# Deprecation Warning

This legacy component is no longer maintained and will be removed in the future.

Please use [kwc-drop-down](https://github.com/KanoComponents/kwc-drop-down) instead.

*/
/**
`kano-drop-down` is a simple tooltip like drop-down box

Example:

    <kano-drop-down>
        <ul>
            <li>One</li>
            <li>Two</li>
        </ul>
    </kano-drop-down>

    <kano-drop-down caret-align="right">
        <img src="/my-img.png"/>
    </kano-drop-down>

Custom property | Description | Default
----------------|-------------|----------
`--kano-drop-down` | Mixin applied to the drop-down | `{}`
`--kano-drop-down-background-color` | Background color of the dropdown | `white`
`--kano-drop-down-caret-padding` | Distance of the caret from the border | `25px`

@group Kano Elements
@demo ./kano-drop-down/demo/kano-drop-down.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                cursor: auto;
                display: inline-block;
                position: relative;
                display: none;
            }
            :host .drop-down {
                position: absolute;
                top: 10px;
                left: 0px;
                display: inline-block;
                border-radius: 3px;
                box-shadow: 4px 4px 4px rgba(0,0,0,0.15);
                background-color: var(--kano-drop-down-background-color, white);
                overflow: hidden;
                @apply --kano-drop-down;
            }
            :host .drop-down.right {
                left: auto;
                right: 0px;
            }
            :host b.caret {
                position: absolute;
                display: block;
                top: 2px;
                left: var(--kano-drop-down-caret-padding, 80px);
                margin: 0;
                padding: 0;
                width: 0;
                height: 0;
                border-top: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-bottom: 8px solid var(--kano-drop-down-background-color, white);
            }
            :host b.caret.right {
                left: auto;
                right: var(--kano-drop-down-caret-padding, 25px);
            }
        </style>
        <div class="drop-down" id="drop">
            <slot></slot>
        </div>
        <b class="caret" id="caret"></b>
`,

  is: 'kano-drop-down',

  properties: {
      /**
       * Position of the drop-down and the caret. Can be `left` or `right`
       */
      caretAlign: {
          type: String,
          value: 'left',
          observer: '_alignChanged'
      }
  },

  ready () {
      this.opened = false;

      console.warn('kano-drop-down is deprecated. Please use KanoComponents/kwc-drop-down instead');
  },

  /**
   * Hides the dropdown
   */
  close() {
      this.opened = false;
      this.style.display = 'none';
  },

  /**
   * Displays the dropdown
   */
  open() {
      this.opened = true;
      this.style.display = 'inline-block';
  },

  /**
   * Toggles between opened and closed
   */
  toggle() {
      if (!this.opened) {
          this.open();
      } else {
          this.close();
      }
  },

  _alignChanged(alignment) {
      if (alignment === 'right') {
          this.toggleClass('right', true, this.$.caret);
          this.toggleClass('right', true, this.$.drop);
      }
  }
});
