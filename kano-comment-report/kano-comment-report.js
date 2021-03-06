/**
`kano-comment-report`

@group Kano Elements
@hero hero.svg
@demo ./kano-comment-report/demo/kano-comment-report.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '../kano-style/kano-style.js';
import { APIClient } from '../kano-api-client-behavior/kano-api-client-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                display: block;
            }
            :host .report-form {
                display: flex;
                flex-direction: column;
                text-align: start;
                padding: 20px;
            }
            :host .report-form h2 {
                font-family: 'Bariol', sans-serif;
                font-size: 1.8em;
                font-weight: bold;
                color: black;
            }
            :host .radio {
                display: flex;
                flex-direction: column;
                align-content: center;
                justify-content: flex-start;
                text-align: start;
                font-family: 'Bariol', sans-serif;
                font-size: 1.2em;
                font-weight: bold;
                color: black;
            }
            :host .radio span {
                text-align: start;
                padding: 10px 0;
            }
            :host .report-statment {
                border-radius: 3px;
                border-color: var(--color-grey-lighter);
                @apply --kano-font-bold;
                font-size: 18px;
            }
            :host .report-button {
                @apply --kano-button;
                background: var(--color-red);
                margin: 10px;
                align-self: center;
                font-family: 'Bariol', sans-serif;
                font-size: 1em;
                font-weight: bold;
                text-shadow: none;
                padding: 15px;
            }
        </style>
        <kano-kit-modal id="dialog">
            <div class="report-form">
                <h2>This user is being:</h2>
                <form class="radio" on-submit="_submitReport">
                    <label><input type="radio" name="report" value="unsafe" on-tap="_checkReason"> Unsafe: someone is in danger or being threatened </label>
                    <label><input type="radio" name="report" value="unkind" on-tap="_checkReason"> Unkind: someone is being mean, or breaking the community guidelines </label>
                    <label><input type="radio" name="report" value="offensive" on-tap="_checkReason"> Offensive: someone used bad language or inappropiate images </label>
                    <label><input type="radio" name="report" value="spam" checked="" on-tap="_checkReason"> Spam: someone is trying to advertise something </label>
                <h2>Comments</h2>
                <textarea id="text" class="report-statment" rows="8" cols="50" value="{{reportComment::input}}"></textarea>
                <input class="report-button" type="submit" value="REPORT">
                </form>
            </div>
        </kano-kit-modal>
`,

  is: 'kano-comment-report',

  properties: {
      comment: {
          type: Object
      },
      reason: {
          type: Object,
          value: 'spam'
      },
      reportComment: {
          type: String,
          value: ''
      }
  },

  behaviors: [
      APIClient
  ],

  _checkReason (e) {
      var checked = e.target.checked;
      if (checked) {
          this.reason = e.target.value;
      }
  },

  open () {
      this.$.dialog.open();
  },

  _submitReport () {
      if (!this.comment) {
          this.$.dialog.close();
          return;
      }
      fetch(this._getUrl('report'), {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: {
              type: this.comment.type,
              id: this.comment.id,
              user: this.comment.user,
              reason: this.reason,
              comment: this.reportComment || 'No Comment'
          }
      })
      .then(() => {
          this.$.dialog.close();
      })
  }
});
