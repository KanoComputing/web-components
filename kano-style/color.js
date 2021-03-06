const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
    <style is="custom-style">
        html {
            /*
            UNIFIED KANO LOOK - start
            Colors put forward by Kano designers for standardisation. Please try to pick one of these colors or discuss with pms/designers the need to expand the list.
            */

            --color-black: #292f35;
            --color-abbey: #394148;
            --color-chateau: #414a51;
            --color-grey: #9fa4a8;
            --color-stone: #d3d6d9;
            --color-porcelain: #e9ebec;
            --color-flame: #d95000;
            --color-kano-orange: #ff6900;
            --color-pumpkin: #ff860d;
            --color-cinnabar: #cf2828;
            --color-flamingo: #f63636;
            --color-carnation: #ff5845;
            --color-topaz: #d99700;
            --color-amber: #ffc100;
            --color-candlelight: #ffda38;
            --color-sushi: #629e33;
            --color-grassland: #88c440;
            --color-apple: #9ee049;
            --color-azure: #0e71d4;
            --color-dodger-blue: #1093f5;
            --color-sky: #11b0ff;

            --color-facebook: #3b549a;
            --color-twitter: #04b9e3;

            /*UNIFIED KANO LOOK - end*/

            --color-orange: #ff842a;
            --color-lighter-orange: #FF9C54;
            --color-dark-orange: #df6d24;
            --color-darker-orange: #b1561c;
            --color-green: #5AC869;
            --color-darker-green: #41AF50;
            --color-light-green: #9fd465;
            --color-lighter-green: #74E283;
            --color-lightblue: #96d7ec;
            --color-blue: #59b3d0;
            --color-kw-blue: #54A2E3;
            --color-red: #e95c5a;
            --color-lighter-red: #eb6c6a;
            --color-yellow: #fed646;
            --color-white: #f5f5f5;
            --color-grey-lightest: #f5f5f5;
            --color-grey-lighter: #ddd;
            --color-grey-light: #aaa;
            --color-grey-mid: #ececec;
            --color-grey-dark: #999;
            --color-grey-darker: #666;
            --color-oslo-grey: #83898e;
            --color-iron-grey: #e0e1e3;

            --color-rhubarb: #ea5455;
            --color-raspberry: #d74d4d;
            --color-mango: #fc823f;
            --color-charcoal: #141414;
            --color-slate: #586871;
            --color-concrete: #a7a7a7;
            --color-ash: #e6e6e6;
            --color-daffodil: #f9ca00;
            --color-battleship-grey: #5c656a;
            --color-flame: #f63636;
            --color-night: #333940;
            --color-magenta: #ea0084;

            --color-dark: #263238;
            --color-midnight: #2a2f35;

            --primary-color: var(--color-dark);
            --color-header: #444444;

            --green-gradient: linear-gradient(#7DC243,#63B72C);
            --blue-gradient: linear-gradient(#96d7ec,#5FAEC7);
            --orange-gradient: linear-gradient(#ff842a,#DA6713);
            --red-gradient: linear-gradient(#e95c5a,#E44B48);
        }
    </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
