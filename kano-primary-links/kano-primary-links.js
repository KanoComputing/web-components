/**
`kano-primary-links` is designed to show primart links on the Kano sites

Example:

    <kano-primary-links></kano-primary-links>

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
            }
            :host .nav-menu-items {
                list-style-type: none;
                padding: 0;
            }
            :host .link {
                color: var(--color-concrete);
                margin: 0;
                text-decoration: none;
                @apply --layout-center;
                @apply --layout-flex;
                @apply --layout-horizontal;
                @apply --layout-start-justified;
            }
            :host .link--selected {
                color: var(--color-charcoal);
            }
            :host .link--selected .icon-component {
                fill: var(--color-mango);
            }
            :host .link--deselected {
                color: var(--color-concrete);
            }
            :host .link--deselected .icon-component {
                fill: var(--color-concrete);
            }
            :host .menu-item:hover .link {
                color: var(--color-charcoal);
            }
            :host .menu-item:hover .icon-component {
                fill: var(--color-mango);
            }
            :host .menu-item-label {
                margin-left: 10px;
            }
            @media screen and (min-width: 769px) {
                :host .nav-menu-items {
                    @apply --layout-horizontal;
                    @apply --layout-start-justified;
                    @apply --layout-flex-9;
                }
                :host .nav-menu-items .link {
                    padding-left: 10px;
                    padding-right: 10px;
                    margin: 0 10px;
                }
                :host .menu-item-icon {
                    width: 15px;
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
                    @apply --layout-start-justified;
                    @apply --layout-flex-9;
                }
                :host .menu-item {
                    border-bottom: 1px solid var(--color-ash);
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                    width: 100%;
                }
                :host .nav-menu-items .menu-item .link {
                    margin: 0;
                    padding: 20px 30px;
                }
                :host .menu-item-icon {
                    width: 24px;
                }
                :host .menu-item > .link,
                :host .item {
                    font-size: 24px;
                }
            }
        </style>
        <ul id="primary-nav-items" class="nav-menu-items">
            <li class="menu-item">
                <a href\$="[[_computeLink(worldRoot, '/', 'false',  currentSite, selectedRegion)]]" class\$="link [[_computeLinkClass(worldRoot, worldPaths, currentSite, selectedLink)]]">
                    <svg class="menu-item-icon" id="world-icon" data-name="Kano World Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                        <title>Kano World Icon</title>
                        <path class="icon-component" d="M8.41,11.26a4.34,4.34,0,0,0,2.68-2.63,21.12,21.12,0,0,1-5.52,2.62A4.34,4.34,0,0,0,8.41,11.26Zm5.54-6v-.1l0,0A.71.71,0,0,0,13.83,5a.91.91,0,0,0-.34-.28,2.49,2.49,0,0,0-1.07-.16,10.41,10.41,0,0,0-1.79.24,4.36,4.36,0,0,0-8,2.57l-.36.16a9,9,0,0,0-1.23.69,3.65,3.65,0,0,0-.6.5,1.83,1.83,0,0,0-.3.4A1.19,1.19,0,0,0,0,9.42v.13a1.21,1.21,0,0,0,0,.16v.11l0,.09h0v0l0,.06.06.11a1.11,1.11,0,0,0,.15.17,1.28,1.28,0,0,0,.29.2,1.93,1.93,0,0,0,.48.16,4.52,4.52,0,0,0,.79.08,8.79,8.79,0,0,0,1.28-.08l.15,0c.3,0,.6-.08.89-.14.6-.11,1.18-.25,1.74-.4.83-.24,1.61-.49,2.35-.78a20.18,20.18,0,0,0,2-.91c.34-.17.66-.35,1-.52l.42-.25L12,7.47a10.69,10.69,0,0,0,1.21-.88,2.69,2.69,0,0,0,.71-.84A.89.89,0,0,0,14,5.27Zm-10.84,4a10,10,0,0,1-1.23.15H1.45l.3-.28a10.11,10.11,0,0,1,1-.74l0,0,.07.23a4.18,4.18,0,0,0,.29.66Zm10-3.82h0a1.85,1.85,0,0,1-.52.49,7.93,7.93,0,0,1-1.16.66l-.13.06a4.43,4.43,0,0,0-.2-.88A3.76,3.76,0,0,0,11,5.33a9,9,0,0,1,1.47-.08,1.84,1.84,0,0,1,.71.13s0,0,0,0h0Z"></path>
                    </svg>
                    <span class="menu-item-label">World</span>
                </a>
            </li>
            <li class="menu-item">
                <a href\$="[[_computeLink(storeRoot, '/store', 'true',  currentSite, selectedRegion)]]" class\$="link [[_computeLinkClass(storeRoot, '/store', currentSite, selectedLink)]]">
                    <svg class="menu-item-icon" id="store-icon" data-name="Kano Store Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                        <title>Kano Store Icon</title>
                        <path class="icon-component" d="M11.5,9H4.29a.57.57,0,0,1-.56-.45L2.62,3.39l-1-.08a.57.57,0,0,1,.08-1.14l1.47.11a.57.57,0,0,1,.52.45l1.1,5.15H11l.83-3.83A.57.57,0,1,1,13,4.3l-.92,4.28A.57.57,0,0,1,11.5,9Z"></path>
                        <circle class="icon-component" cx="5.53" cy="10.9" r="1.14"></circle>
                        <circle class="icon-component" cx="10.35" cy="10.9" r="1.14"></circle>
                        <path class="icon-component" d="M10.55,5.38H5.24a.57.57,0,0,1,0-1.14h5.32a.57.57,0,1,1,0,1.14Z"></path>
                        <path class="icon-component" d="M10.17,7.19H5.62A.57.57,0,1,1,5.62,6h4.56a.57.57,0,1,1,0,1.14Z"></path>
                    </svg>
                    <span class="menu-item-label">Shop</span>
                </a>
            </li>
        </ul>
`,

  is: 'kano-primary-links',

  properties: {
      /**
       * The current selected link as determined by the parent app
       */
      selectedLink: {
          type: String,
          value: ''
      },
      /**
       * The current selected region as determined by the parent app
       */
      selectedRegion: {
          type: String,
          value: ''
      },
      /**
       * Basepath of the site to allow for testing across multiple environments
       */
      currentSite: {
          type: String
      },
      /**
       * Basepath of the store to allow for testing across multiple environments
       */
      storeRoot: {
          type: String,
          value: 'https://kano.me'
      },
      /**
       * Share paths for Kano World, to allow for matching between different URL forms
       */
      worldPaths: {
          type: Array,
          value: function() {
              return ['/shares', '/shared'];
          }
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

  _computeLinkClass: function (site, paths, currentSite, selectedLink) {
      var selectedPath = '/' + selectedLink,
          pathMatch = paths;
      if (Array.isArray(paths)) {
          pathMatch = paths.join('|');
      }
      var pathPattern = new RegExp(pathMatch);
      return site === currentSite && pathPattern.test(selectedPath)  ? 'link--selected' : 'link--deselected';
  }
});
