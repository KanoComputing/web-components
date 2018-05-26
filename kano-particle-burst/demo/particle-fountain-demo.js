import '../kano-particle-burst.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style>
      .particle-repeater{
          display: flex;
          align-items: center;
          justify-content: center;
      }
      kano-particle-burst{
            width: 5px;
            height: 5px;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50px;
            background-color: #ff3377;
      }
    </style>

    <div class="particle-repeater">
        <kano-particle-burst id="particles" number-particles="[[numberParticles]]" max-particle-size="[[maxParticleSize]]"></kano-particle-burst>
    </div>
`,

  is: "particle-fountain-demo",

  properties: {
      numberParticles: {
          type: Number,
          value: 30,
          reflectToAttribute: true
       },
       maxParticleSize: {
           type: Number,
           value: 10,
           reflectToAttribute: true
       }
  },

  attached: function() {
      var childElement = this.$.particles;

      setInterval(function(){
          childElement.setAttribute('gravity', Math.random() * 0.4 + 0.1);
          childElement.setAttribute('particle-decay', Math.random()*0.04);
          childElement.fire('fireAnimation');
      }.bind(this), 100)
  }
});
