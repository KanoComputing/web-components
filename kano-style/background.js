const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
    <style is="custom-style">
        html {
            --kano-empty-box: {
                background: repeating-linear-gradient(135deg, transparent, transparent 5px, rgba(255,255,255,.5) 5px, rgba(255,255,255,.5) 10px), #b3b3b3;
            };
            --kano-dotted-background: {
                background-image: -webkit-repeating-radial-gradient(center center, rgba(0,0,0,.04), rgba(0,0,0,.04) 4px, transparent 1px, transparent 100%);
                background-image: -moz-repeating-radial-gradient(center center, rgba(0,0,0,.04), rgba(0,0,0,.04) 4px, transparent 1px, transparent 100%);
                background-image: -ms-repeating-radial-gradient(center center, rgba(0,0,0,.04), rgba(0,0,0,.04) 4px, transparent 1px, transparent 100%);
                background-image: repeating-radial-gradient(center center, rgba(0,0,0,.04), rgba(0,0,0,.04) 4px, transparent 1px, transparent 100%);
                -webkit-background-size: 20px 20px;
                -moz-background-size: 20px 20px;
                background-size: 20px 20px;
            };
        }
    </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
