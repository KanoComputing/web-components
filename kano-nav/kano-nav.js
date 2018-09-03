/**
`kano-nav` is the Kano Universe designed nav bar to provide navigation
across all kano online products. It also displays user navigation and notifications

Example:

    <kano-nav assets-path="./assets/navbar/" site-root="/"></kano-nav>

@group Kano Elements
@demo ./kano-nav/demo/kano-nav.html

*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '../kano-style/typography.js';
import '../kano-style/color.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            @keyframes slideInLeft {
                from {
                    transform: translate3d(-100%, 0, 0);
                    visibility: visible;
                }
                to {
                    transform: translate3d(0, 0, 0);
                }
            }
            :host {
                --kano-nav-font-family: 'bariol', Helvetica, Arial, sans-serif;
                display: block;
                font-smoothing: antialiased;
                font-family: var(--kano-nav-font-family);
                font-weight: bold;
                height: 60px;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                z-index: 100;
                @apply --layout-vertical;
            }
            /* Buttons will keep their font family unless you target them directly */
            button {
                font-family: var(--kano-nav-font-family);
            }
            *[hidden] {
                display: none !important;
            }
            iron-icon {
                --iron-icon-width: 16px;
                --iron-icon-height: 16px;
            }
            :host ul {
                list-style: none;
                margin: 0px;
                padding: 0px;
            }
            :host .wrapper {
                box-sizing: border-box;
                position: relative;
                margin: auto;
                max-width: 1400px;
                padding: 0 20px;
                width: 100%;
                @apply --layout-flex;
                @apply --layout-horizontal;
                @apply --layout-justify;
            }
            :host .navbar {
                background: #fff;
                box-shadow: 0 0 5px rgba(0,0,0,0.15);
                display: block;
                position: relative;
                @apply --layout-flex;
                @apply --layout-vertical;
            }
            :host .slideInLeft {
                animation-name: slideInLeft;
                animation-duration: 0.5s;
                animation-fill-mode: both;
            }
            :host .hamburger {
                border: 0px;
                background-color: transparent;
                box-shadow: none;
                @apply --layout-horizontal;
                @apply --layout-center;
                display: none;
                padding: 0px 16px;
                cursor: pointer;
            }
            :host .hamburger:focus {
                background-color: #eee;
                outline: none;
            }
            :host .hamburger img {
                height: 16px;
            }
            :host .logo {
                @apply --layout-horizontal;
                @apply --layout-center-justified;
                margin-right: calc(4vw - 20px);
                align-items: center;
                height: 100%;
            }
            :host .logo .link {
                @apply --layout-horizontal;
                @apply --layout-center;
            }
            :host .logo img {
                margin-top: 5px;
                width: 70px;
                height: 35px;
            }
            :host .left,
            :host .right,
            :host .user {
                height: 60px;
            }
            :host .right,
            :host .user {
                @apply --layout-end-justified;
            }
            @media screen and (min-width: 769px) {
                :host .wrapper {
                    height: 60px;
                }
                :host .center {
                    @apply --layout-center;
                    @apply --layout-flex-3;
                    @apply --layout-horizontal;
                    @apply --layout-justified;
                }
                :host .overlay {
                    display: none;
                }
            }
            @media screen and (max-width: 768px) {
                :host .logo img {
                    margin-bottom: 2px;
                    margin-top: 0px;
                }
                :host .no-mobile {
                    display: none;
                }
                :host .wrapper {
                    height: auto;
                    padding: 0px;
                    padding-top: 60px;
                }
                :host .hamburger {
                    display: flex;
                    height: 100%;
                    left: 0;
                    position: absolute;
                    top: 0;
                }
                :host .center {
                    @apply --layout-justified;
                    @apply --layout-vertical;
                    background-color: #ffffff;
                    height: 100%;
                    left: 0;
                    min-width: 220px;
                    position: fixed;
                    top: 0;
                    width: 60%;
                    z-index: 100;
                }
                :host .center[hidden] {
                    animation-name: slideOutLeft;
                    animation-duration: 0.5s;
                    animation-fill-mode: both;
                }
                :host .right,
                :host .left {
                    position: absolute;
                    top: 0px;
                }
                :host .left {
                    width: 100%;
                }
                :host .right {
                    right: 0px;
                }
                :host .left {
                    left: 0px;
                }
                :host .logo {
                    margin: auto;
                }
                :host .logo .link {
                    padding: 0 10px;
                }
                :host .overlay {
                    background-color: rgba(0, 0, 0, 0.6);
                    display: block;
                    height: 100%;
                    left: 0;
                    position: fixed;
                    top: 0;
                    width: 100%;
                    z-index: 80;
                }
                :host .close-button {
                    height: 30px;
                    left: calc(60% + 50px);
                    position: absolute;
                    top: 3%;
                    width: 30px;
                }
                :host .close-button-component--light {
                    fill: #ffffff;
                }
                :host .close-button-component--dark {
                    fill: var(--color-charcoal);
                }
            }
        </style>
        <iron-media-query query="(max-width: 768px)" query-matches="{{isMobile}}"></iron-media-query>
        <nav id="navbar" class="navbar">
            <div class="wrapper">
                <div class="left">
                    <button class="hamburger slideInLeft" on-tap="_toggleMenu">
                        <img src\$="[[assetsPath]]hamburger.svg">
                    </button>
                    <div class="logo">
                        <a href="[[siteRoot]]" class="link">
                            <img src\$="[[assetsPath]]kano_logo.svg" alt="">
                        </a>
                    </div>
                </div>
                <div class="overlay" hidden\$="[[!_isMenuOpened(isMobile, menuOpened)]]" on-tap="_toggleMenu">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.31 20.31" class="close-button">
                        <title>Close Button</title>
                        <g id="close-button-1" data-name="Layer 2">
                            <g id="close-button-2" data-name="Layer 4">
                                <path class="close-button-component close-button-component--light" d="M3,17.33A9.65,9.65,0,0,1,.75,14,10.35,10.35,0,0,1,0,10.15,9.94,9.94,0,0,1,.76,6.33,9.88,9.88,0,0,1,3,3a10.2,10.2,0,0,1,7.17-3A10.31,10.31,0,0,1,14,.75a10,10,0,0,1,5.59,5.59,10.29,10.29,0,0,1,.75,3.81,10.19,10.19,0,0,1-3,7.17A9.9,9.9,0,0,1,14,19.54a9.93,9.93,0,0,1-3.83.76,10.33,10.33,0,0,1-3.81-.75A9.66,9.66,0,0,1,3,17.33Z"></path>
                                <path class="close-button-component close-button-component--dark" d="M6.6,7.34a.85.85,0,0,1,.27-.66.87.87,0,0,1,.67-.27.89.89,0,0,1,.66.27l2,2a.1.1,0,0,0,.16,0l2-2A.9.9,0,0,1,13,6.42a.87.87,0,0,1,.67.27.85.85,0,0,1,.26.66,1,1,0,0,1-.26.67l-2,2a.12.12,0,0,0,0,.16l2,2a.9.9,0,0,1,.26.66.92.92,0,0,1-.28.67.89.89,0,0,1-.67.27.88.88,0,0,1-.64-.27l-2-2a.11.11,0,0,0-.16,0l-2,2a1,1,0,0,1-.67.27.94.94,0,0,1-.92-1,.88.88,0,0,1,.27-.64l2-2a.1.1,0,0,0,0-.16l-2-2A1,1,0,0,1,6.6,7.34Z"></path>
                            </g>
                        </g>
                    </svg>
                </div>
                <div class="center" hidden\$="[[!_isMenuOpened(isMobile, menuOpened)]]">
                    <slot id="primary" name="primary"></slot>
                    <slot id="secondary" name="secondary"></slot>
                </div>
                <div class="right">
                    <slot id="right" name="right"></slot>
                </div>
            </div>
        </nav>
`,

  is: 'kano-nav',

  properties: {
      /**
       * Path to the assets required by this components
       */
      assetsPath: {
          type: String,
          value: '/'
      },
      /**
       * Is the nav-bar being displayed on a mobile device
       */
      isMobile: {
          type: Boolean,
          value: false,
          notify: true,
          reflectToAttribute: true
      },
      /**
       * Is the left menu opened
       */
      menuOpened: {
          type: Boolean,
          value: false,
          notify: true
      },
      /**
       * Site root to allow for logo link to be changed
       */
      siteRoot: {
          type: String,
          value: '/'
      }
  },

  ready: function () {
      if (window.location.pathname === '/') {
          this.toggleClass('selected', true, this.$['logo']);
      }
  },

  _toggleMenu: function () {
      this.menuOpened = !this.menuOpened;
  },

  _isMenuOpened: function (isMobile, menuOpened) {
      return isMobile && menuOpened || !isMobile;
  }
});
