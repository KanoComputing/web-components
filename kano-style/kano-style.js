import './typography.js';
import './color.js';
import './button.js';
import './input.js';
import './background.js';
import './layout.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
    <style is="custom-style">
        html {
            --kano-shadow: {
                box-shadow: 0px 3px 0px 0px rgba(0,0,0,0.11);
            };

            --kano-overlay: {
                position: absolute;
                top: 0px;
                bottom: 0px;
                right: 0px;
                left: 0px;
                z-index: 999;
            };

            --kano-box-shadow: {
            -webkit-box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
            -moz-box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
            -o-box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
            box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
            }

            --kano-inset-box-shadow: {
                -webkit-box-shadow: inset 4px 0 5px 0 rgba(0, 0, 0, 0.14);
                -moz-box-shadow: inset 4px 0 5px 0 rgba(0, 0, 0, 0.14);
                -o-box-shadow: inset 4px 0 5px 0 rgba(0, 0, 0, 0.14);
                box-shadow: inset 4px 0 5px 0 rgba(0, 0, 0, 0.14);
            }
        }

        iron-overlay-backdrop.reward {
            --iron-overlay-backdrop-opacity: 1;
            --iron-overlay-backdrop-background-color: #5c6870;
        }
    </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
