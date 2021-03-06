/**
`kano-secondary-links` is designed to show primary links on the Kano sites

Example:

    <kano-secondary-links></kano-secondary-links>

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
                display: block;
                @apply --layout-flex-none;
            }
            :host .nav-menu-items {
                list-style-type: none;
                padding: 0;
            }
            :host .link {
                color: var(--color-concrete);
                text-decoration: none;
            }
            :host .link--selected {
                color: var(--color-charcoal);
            }
            :host .link--deselected {
                color: var(--color-concrete);
            }
            :host .menu-item:hover .link {
                color: var(--color-charcoal);
            }
            @media screen and (min-width: 769px) {
                :host .nav-menu-items {
                    @apply --layout-horizontal;
                    @apply --layout-end-justified;
                    @apply --layout-flex-3;
                    @apply --layout-center;
                    height: 100%;
                }
                :host .nav-menu-items .link {
                    padding-left: 10px;
                    padding-right: 10px;
                    margin: 0 10px;
                }
                :host .menu-item > .link,
                :host .item {
                    font-size: 16px;
                }
            }
            @media screen and (max-width: 768px) {
                :host {
                    width: 100%;
                }
                :host .nav-menu-items {
                    margin: 0;
                    padding: 0;
                    @apply --layout-vertical;
                    @apply --layout-end-justified;
                    @apply --layout-flex-3;
                }
                :host .menu-item {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                    width: 100%;
                }
                :host .link {
                    display: block;
                    margin: 0;
                    padding: 20px 30px;
                }
                :host .menu-item > .link,
                :host .item {
                    font-size: 24px;
                }
            }
        </style>
        <ul id="secondary-nav-items" class="nav-menu-items">
            <li class="menu-item">
                <a href\$="[[_computeLink(storeRoot, '/educators', 'false', currentSite,  selectedRegion)]]" class\$="link [[_computeLinkClass(storeRoot, '/educators', currentSite, selectedLink)]]">
                    <span class="menu-item-label">Educators</span>
                </a>
            </li>
            <li class="menu-item">
                <a href\$="[[_computeLink('https://help.kano.me', '/', 'false',  currentSite, selectedRegion)]]" class\$="link [[_computeLinkClass('https://help.kano.me', '/blog', currentSite, selectedLink)]]">
                    <span class="menu-item-label">Help</span>
                </a>
            </li>
            <li class="menu-item">
                <a href\$="[[_computeLink(storeRoot, '/blog', 'false',  currentSite, selectedRegion)]]" class\$="link [[_computeLinkClass(storeRoot, '/blog', currentSite, selectedLink)]]">
                    <span class="menu-item-label">Blog</span>
                </a>
            </li>
        </ul>
`,

  is: 'kano-secondary-links',

  properties: {
      /**
       * The current selected link as determined by the parent app
       */
      selectedLink: {
          type: String,
          value: ''
      },
      /**
       * he current selected region as determined by the parent app
       */
      selectedRegion: {
          type: String,
          value: ''
      },
      /**
       * Basepath of the site to allow for testing across multiple environments
       */
      currentSite: {
          type: String,
          value: null
      },
      /**
       * Basepath of the store to allow for testing across multiple environments
       */
      storeRoot: {
          type: String,
          value: 'https://kano.me'
      },
      /**
       * Basepath of Kano World to allow for testing across multiple environments
       */
      worldRoot: {
          type: String,
          value: 'https://world.kano.me'
      }
  },

  _computeLink: function (site, path, regionalize, currentSite, selectedRegion) {
      if (site !== currentSite) {
          return site + path;
      }
      if (regionalize === 'true') {
          return path + '/' + selectedRegion;
      }
      return path;
  },

  _computeLinkClass: function (site, path, currentSite, selectedLink) {
      var selectedPath = '/' + selectedLink,
          pathPattern = new RegExp(path);
      return site === currentSite && pathPattern.test(selectedPath) ? 'link--selected' : 'link--deselected';
  }
});
