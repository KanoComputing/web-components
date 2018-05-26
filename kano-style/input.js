import './typography.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
  <style is="custom-style">
      html {
          --kano-input: {
              font-family: bariol;
              font-size: 1.1em;
              border-radius: 3px;
          };

          --kano-light-input: {
              font-family: var(--font-body, Arial);
              background-color: transparent;
              border: 0px;
              border-bottom: 2px solid var(--color-black, black);
              font-size: 1em;
          };

          --kano-light-select: {
              background-color: transparent;
              border: 1px solid var(--color-black, black);
              font-size: 1em;
          };

          --kano-settings-container: {
              display: inline-block;
              width: 74%;
              padding: 10px 0px;
          };

          --kano-settings-label: {
              position: relative;
              display: inline-block;
              width: 71px;
              text-align: right;
          };
      }
  </style>
</custom-style><dom-module id="input-range">
    <template>
        <style>
          input[type=range] {
            -webkit-appearance: none;
            background-color: transparent; }

          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none; }

          input[type=range]::-ms-track {
            cursor: pointer;
            background-color: transparent;
            border-color: transparent;
            color: transparent; }

          /* Special styling for WebKit/Blink */
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 9px;
            width: 20px;
            border-radius: 3px;
            background-color: #B2B2B2;
            cursor: pointer;
            margin-top: -3px; }

          /* All the same stuff for Firefox */
          input[type=range]::-moz-range-thumb {
            height: 9px;
            width: 20px;
            border-radius: 3px;
            background-color: #B2B2B2;
            cursor: pointer; }

          /* All the same stuff for IE */
          input[type=range]::-ms-thumb {
            height: 9px;
            width: 20px;
            border-radius: 3px;
            background-color: #B2B2B2;
            cursor: pointer; }

          input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 3px;
            cursor: pointer;
            background: #CBCBCB; }

          input[type=range]:focus::-webkit-slider-runnable-track {
            background: #CBCBCB; }

          input[type=range]::-moz-range-track {
            width: 100%;
            height: 3px;
            cursor: pointer;
            background: #CBCBCB; }

          input[type=range]::-ms-track {
            width: 100%;
            height: 3px;
            cursor: pointer;
            background: #CBCBCB; }

          input[type=range]::-ms-fill-lower {
            width: 100%;
            height: 3px;
            cursor: pointer;
            background: #CBCBCB; }

          input[type=range]:focus::-ms-fill-lower {
            background: #CBCBCB; }

          input[type=range]::-ms-fill-upper {
            width: 100%;
            height: 3px;
            cursor: pointer;
            background: #CBCBCB; }

          input[type=range]:focus::-ms-fill-upper {
            background: #CBCBCB; }
        </style>
    </template>
</dom-module><dom-module id="input-text">
    <template>
        <style>
            input[type="text"],
            input[type="email"],
            input[type="password"],
            textarea {
                background: white;
                border-radius: 4px;
                box-sizing: border-box;
                border: 1px solid #d3d6d8;
                display: block;
                font-size: 14px;
                padding: 8px 16px;
                width: 100%;
            }
            input[type="text"]:focus,
            input[type="email"]:focus,
            input[type="password"]:focus,
            textarea:focus {
                outline: none;
                border-color: var(--color-kano-orange);
            }
            /**
             * Style the placeholders with all the browser-prefixes.
             * See here: https://css-tricks.com/almanac/selectors/p/placeholder/
             */
            input[type="text"]::-webkit-input-placeholder,
            input[type="email"]::-webkit-input-placeholder,
            input[type="password"]::-webkit-input-placeholder,
            textarea:focus {
                text-transform: uppercase;
            }
            input[type="text"]::-moz-placeholder,
            input[type="email"]::-moz-placeholder,
            input[type="password"]::-moz-placeholder,
            textarea:focus {
                text-transform: uppercase;
            }
            input[type="text"]:-moz-placeholder,
            input[type="email"]:-moz-placeholder,
            input[type="password"]:-moz-placeholder,
            textarea:focus {
                text-transform: uppercase;
            }
            input[type="text"]:-ms-input-placeholder,
            input[type="email"]:-ms-input-placeholder,
            input[type="password"]:-ms-input-placeholder,
            textarea:focus {
                text-transform: uppercase;
            }
        </style>
    </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

/*

DEPRECATED:

Please use `kwc-style` instead.

Changes here only to prevent conflicts with `kwc-style` when the two are used alongside eachother in the same application.

*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
;
