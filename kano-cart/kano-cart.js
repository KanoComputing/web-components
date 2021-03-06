/**
`kano-cart` is designed to show the cart icon and region selector

Example:

    <kano-cart cart-item-count="1"
               selected-region="uk"
               selected-region="https://kano.me"></kano-cart>

@group Kano Elements
@demo ./kano-cart/demo/kano-cart.html

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
                --color-white: #ffffff;
                display: block;
                @apply --layout-flex;
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-end-justified;
                height: 100%;
                padding-right: 10px;
                text-align: left;
            }
            :host [hidden] {
                display: none;
            }
            :host .content {
                @apply --layout-flex;
                margin-left: 10px;
            }
            :host .region-selector {
                padding-right: 1rem;
                position: relative;
            }
            :host .current-region {
                color: var(--color-concrete);
                cursor: pointer;
            }
            :host .region-pointer {
                width: 15px;
            }
            :host .region-pointer-component {
                fill: var(--color-concrete);
            }
            :host .current-region:hover {
                color: var(--color-charcoal);
            }
            :host .current-region:hover .region-pointer-component {
                fill: var(--color-mango);
            }
            :host .region-selector--closed .region-pointer {
                transform: rotate(90deg);
            }
            :host .region-selector--open .region-pointer {
                transform: rotate(-90deg);
            }
            :host .all-regions {
                background-color: var(--color-white);
                border-radius: 2px;
                box-shadow: 0 0 5px rgba(0,0,0,0.15);
                right: 0;
                list-style: none;
                margin: 0;
                padding: 15px;
                position: absolute;
                top: 62px;
            }
            :host .all-regions::before {
                color: var(--color-white);
                content: '▲';
                font-size: 18px;
                position: absolute;
                right: 22px;
                text-shadow: 0 -3px 3px rgba(0,0,0,0.1);
                top: -13px;
                transform: scale(2, 0.75);
            }
            :host .region-selector,
            :host .region,
            :host .current-region,
            :host .cart-link {
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-end-justified;
                height: 100%;
            }
            :host .region-selector {
                flex: 2 0 auto;
            }
            :host .region
            :host .current-region,
            :host .cart-link {
                @apply --layout-flex-1;
            }
            :host .region:nth-last-of-type(n+2) {
                padding-bottom: 0.8rem;
            }
            :host .region--selected {
                color: var(--color-charcoal);
            }
            :host .region--active {
                color: var(--color-concrete);
                cursor: pointer;
            }
            :host .region--active:hover {
                color: var(--color-charcoal);
            }
            :host .region-icon {
                height: auto;
                width: 1.8rem;
            }
            :host .cart-link {
                color: var(--color-slate);
                position: relative;
                text-decoration: none;
            }
            :host .cart-icon-wrapper {
                background-color: var(--color-slate);
                border-radius: 100%;
                display: inline-block;
                height: 2.2rem;
                width: 2.2rem;
            }
            :host .cart-icon {
                height: 1.4rem;
                margin: 0.37rem 0 0 0.3rem;
                width: 1.4rem;
            }
            :host .cart-icon-component--stroke {
                stroke: var(--color-white);
            }
            :host .cart-icon-component--fill {
                fill: var(--color-white);
            }
            :host .cart-count {
                background-color: var(--color-rhubarb);
                border-radius: 100%;
                display: block;
                color: var(--color-white);
                font-size: 10px;
                height: 22px;
                line-height: 22px;
                position: absolute;
                right: -5px;
                text-align: center;
                top: 5px;
                width: 22px;
            }
            @media all and (max-width: 840px) {
                :host .current-region .region-icon {
                    display: none;
                }
                :host .all-regions .region-label {
                    padding-right: 1rem;
                }
            }
            @media all and (min-width: 840px) {
                :host {
                    padding-left: 60px;
                }
                :host .region-label {
                    padding-right: 1rem;
                }
            }
        </style>
        <div class\$="region-selector region-selector--[[_computeSelectorClass(menuOpen)]]">
            <div class="current-region" on-tap="_toggleMenu">
                <svg class="region-pointer" id="region-pointer" data-name="Region Pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                  <title>Region Pointer</title>
                  <path class="region-pointer-component" d="M4.84,7.1s0,4.76,1.75,3.42A10.32,10.32,0,0,0,9.08,7.58a1,1,0,0,0,0-1A10.32,10.32,0,0,0,6.59,3.68C4.84,2.34,4.84,7.1,4.84,7.1Z"></path>
                </svg>
                <span class="region-label">[[_computeRegionLabel(selectedRegion)]]</span>
                <img class="region-icon" src\$="[[_computeIconPath(selectedRegion)]]">
            </div>
            <ul class="all-regions" hidden\$="{{!menuOpen}}">
                <dom-repeat>
                    <template is="dom-repeat" items="{{regions}}">
                        <li class\$="region region--[[_computeRegionClass(item, selectedRegion)]]" on-tap="_updateRegion">
                            <span class="region-label">[[_computeRegionLabel(item)]]</span>
                            <img class="region-icon" src\$="[[_computeIconPath(item)]]">
                        </li>
                    </template>
                </dom-repeat>
            </ul>
        </div>
        <a class="cart-link" href\$="[[_computeCartLink(selectedRegion)]]" title="Your Shopping Cart">
            <div class="cart-icon-wrapper">
                <svg id="cart-icon" class="cart-icon" data-name="cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                    <title>Kano Cart Icon</title>
                    <path class="cart-icon-component cart-icon-component--fill" d="M11.5,9H4.29a.57.57,0,0,1-.56-.45L2.62,3.39l-1-.08a.57.57,0,0,1,.08-1.14l1.47.11a.57.57,0,0,1,.52.45l1.1,5.15H11l.83-3.83A.57.57,0,1,1,13,4.3l-.92,4.28A.57.57,0,0,1,11.5,9Z"></path>
                    <circle class="cart-icon-component cart-icon-component--fill" cx="5.53" cy="10.9" r="1.14"></circle>
                    <circle class="cart-icon-component cart-icon-component--fill" cx="10.35" cy="10.9" r="1.14"></circle>
                    <path class="cart-icon-component cart-icon-component--fill" d="M10.55,5.38H5.24a.57.57,0,0,1,0-1.14h5.32a.57.57,0,1,1,0,1.14Z"></path>
                    <path class="cart-icon-component cart-icon-component--fill" d="M10.17,7.19H5.62A.57.57,0,1,1,5.62,6h4.56a.57.57,0,1,1,0,1.14Z"></path>
                </svg>
            </div>
            <div class="cart-count" hidden\$="[[!cartItemCount]]">
                [[cartItemCount]]
            </div>
        </a>
`,

  is: 'kano-cart',

  properties: {
    /**
     * Path to the assets
     */
      assetsPath: {
          notify: true,
          type: String,
          value: '/'
      },
      /**
       * Count of the number of items in the cart
       */
      cartItemCount: {
          type: Number,
          value: 0
      },
      /**
       * Whether the region selector menu is open
       */
      menuOpen: {
          type: Boolean,
          value: false
      },
      /**
       * Details for each of the store regions
       */
      regions: {
          type: Object,
          value: ['uk', 'us', 'eu', 'row']
      },
      /**
       * The current user region as determined by the container app
       */
      selectedRegion: {
          type: String,
          observer: '_closeMenu',
          value: 'row'
      },
      /**
       * Basepath of the site to allow for testing across multiple environments
       */
      siteRoot: {
          type: String,
          value: 'https://kano.me'
      }
  },

  _computeCartLink: function (selectedRegion) {
      return '/store/' + selectedRegion + '/cart';
  },

  _computeIconPath: function (region) {
      return this.assetsPath + region + '.svg';
  },

  _computeRegionLabel: function (region) {
      return region.toUpperCase();
  },

  _computeRegionClass: function (region, selectedRegion) {
      return region === selectedRegion ? 'selected' : 'active';
  },

  _computeSelectorClass: function (menuState) {
      return menuState ? 'open' : 'closed';
  },

  _closeMenu: function () {
      this.menuOpen = false;
  },

  _toggleMenu: function () {
      this.menuOpen = !this.menuOpen;
  },

  _updateRegion: function (e) {
      this.fire('update-region', e.model.item);
  }
});
