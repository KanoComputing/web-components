/*

# Deprecation Warning

This legacy component is no longer maintained and will be removed in the future.

Please use [kwc-drop-down](https://github.com/KanoComponents/kwc-drop-down) instead.

*/
/**
`kano-drop-down-item` is designed to be used as an item in a list inside `kano-drop-down` you can add any content to it and an icon

Example:
    <kano-drop-down-item icon="/assets/my-icon.png">
        <span>My message</span>
    </kano-drop-down-item>

@group Kano Elements

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
                display: block;
                padding: 7px 13px 6px 13px;
                text-align: left;
            }
            :host(:hover) {
                background-color: var(--color-stone);
            }
            :host .content {
                @apply --layout-flex;
            }
            :host .content:first-child {
                margin-left: 15px;
            }
            :host img {
                width: 40px;
                height: 40px;
                margin-left: 15px;
            }
        </style>
        <dom-if>
            <template is="dom-if" if="[[icon]]">
                <img src\$="[[icon]]" alt="">
            </template>
        </dom-if>
        <div class="content">
            <slot></slot>
        </div>
`,

  is: 'kano-drop-down-item',

  properties: {
      icon: {
          type: String
      }
  },

  ready () {
      console.warn('kano-drop-down-item is deprecated. Please use KanoComponents/kwc-drop-down instead');
  }
});
