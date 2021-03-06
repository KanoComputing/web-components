const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
    <style is="custom-style">
        html {
            --kano-button: {
                border: none;
                outline: none;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                line-height: 16px;
                font-family: 'Bariol', sans-serif;
                color: white;
                padding: 13px 22px 11px 22px;
                border-radius: 5px;
                text-transform: uppercase;
                transition-property: background-color, color;
                transition-duration: 0.3s;
                transition-timing-function: ease;
                overflow: hidden;
                white-space: nowrap;
            };

            --kano-round-button: {
                @apply --kano-button;
                border-radius: 40px;
            };

            --kano-button-small: {
                @apply --kano-button;
            };

            --kano-button-big: {
                @apply --kano-button;
            };

            --kano-icon-button: {
                background: transparent;
                border: 0px;
                outline: none;
            };
        }
    </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
