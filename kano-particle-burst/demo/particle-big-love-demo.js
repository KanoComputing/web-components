import '../kano-particle-burst.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style>
    .like-icon {
        width: 40px;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
      }
      .like-inner{
          z-index: 1;
          width: 22px;
          height: 22px;
          transition: all 0.2s ease-out;
          cursor: pointer;
          background-image: url('../../demo-assets/icons/like-outline.svg');
          background-size: contain;
          background-repeat: no-repeat;
      }
      .like-icon.liked .like-inner{
          background-image: url('../../demo-assets/icons/like.svg');
      }
      :host[like] .like-inner{
          background-image: url('../../demo-assets/icons/like.svg');
      }
      .like-icon:hover > .like-inner{
          width:27px;
          height: 27px;
      }
      .like-icon:active > .like-inner{
          width: 40px;
          height: 40px;
          background-image: url('../../demo-assets/icons/like.svg');
      }
      kano-particle-burst{
            position:absolute;
            top: 22px;
            left: 20px;
      }
      :host{
          -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      }
    </style>

    <div class="like-icon">
        <div class="like-inner">
            <kano-particle-burst number-particles="30" gravity="0.3" particle-decay="0.02" max-particle-size="15"></kano-particle-burst>
        </div>
    </div>
`,

  is: "particle-big-love-demo",

  listeners: {
      'tap': 'likeTap',
  },

  properties: {
      like: {
          type: Boolean,
          value: false,
          notify: true,
          reflectToAttribute: true,
          reflectToClass: true
      }
  },

  attached: function() {
      this.toggleClass('liked', this.like, this.$$('.like-icon'));
  },

  likeTap: function(e) {
      this.like = !this.like;
      this.toggleClass('liked', this.like, this.$$('.like-icon'));
      if(this.like){
          var snd = new Audio("../../demo-assets/audio/bubbles-sound.wav");
          snd.play();
          var childElement = this.$$('kano-particle-burst');
          childElement.fire('fireAnimation');
          setTimeout(function(){
              childElement.fire('fireAnimation');
          }, 250);
      }
  }
});
