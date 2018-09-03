const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
    <style is="custom-style">
        :root {
            --content-width: 880px;
            --content-padding: 0 8px;
        }
    </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
