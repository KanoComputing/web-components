/**
`kano-auth'
@group Kano Elements
@demo ./kano-auth/demo/kano-auth.html
 */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '../kano-modal/kano-modal.js';
import '../kano-style/button.js';
import '../kano-style/typography.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                --paper-spinner-color: #ff842a;
            }
            :host kano-modal {
                --kano-modal-main: {
                    color: #4d4d4d;
                };
            }
            :host kano-modal > * {
                margin: auto;
                color: #4d4d4d;
            }
            :host kano-modal {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
            }
            :host #pager {
                padding: 50px 0 40px;
                margin-top: 85px;
                background-color: #fff;
            }
            :host #pager > * {
                margin: auto 50px;
            }
            :host h2 {
                font-family: 'Bariol', sans-serif;
                font-size: 21px;
                font-weight: bold;
                margin-top: 10px;
                margin-bottom: 14px;
            }
            :host .body {
                color: #999;
                margin-bottom: 18px;
                line-height: 18px;
            }
            :host .fields {
                display: flex;
                align-items: stretch;
                justify-content:center;
                flex-direction: column;
            }
            :host .submit-wrapper {
                margin-top: 20px;
                position: relative;
            }
            :host .submit-wrapper paper-spinner-lite {
                @apply --layout-fit;
                margin: auto;
                pointer-events: none;
            }
            :host .fields > input {
                display: block;
                margin: 8px 0px 4px 0px;
                border-radius: 5px;
                border: 1px solid #ccc;
                outline: none;
                font-size: 16px;
                font-family: 'Bariol', sans-serif;
                padding: 10px;
            }
            :host .fields input:focus {
                border-color: #ff842a;
            }
            :host .fields input[type=checkbox] {
                display: inline;
                margin-right: 10px
            }
            :host input[type=submit] {
                @apply --kano-button;
                margin: auto;
                background-color: #ff842a;
                font-weight: bold;
                width: 80%;
            }
            :host input[type=submit]:hover {
                background-color: #fd621e;
            }
            :host input[type=submit]:disabled,
            :host input[type=submit]:disabled:hover {
                background-color: #ccc;
                cursor: default;
            }
            :host input[type=submit]:focus {
                text-decoration: underline;
            }
            :host fieldset {
                border: 1px #ff842a dashed;
                border-radius: 5px;
            }
            :host fieldset.grey {
                border: 1px #ccc dashed;
                margin: 20px auto;
            }
            :host fieldset button {
                margin: 25px auto 30px auto;
            }
            :host fieldset legend {
                font-weight: bold;
                background-color: #fff;
                padding: 0px 10px;
            }
            :host .footer {
                color: #999;
                margin-top: 56px;
            }
            :host .footer .bold {
                font-weight: bold;
            }
            :host a, :host a {
                color: #999;
                text-decoration: none;
                border-bottom: 1px solid #e2e2e2;
                cursor: pointer;
            }
            :host a:hover, :host a:hover {
                color: black;
            }
            :host .checkboxes {
                text-align: left;
                margin: 10px auto 5px auto;
            }
            :host .form-error {
                text-align: left;
                color: #ED5F5F;
                font-weight: bold;
                margin: auto 2px 5px 2px;
            }
            :host .modal-error {
                text-align: center;
                color: #ED5F5F;
                font-weight: bold;
                margin: 25px auto;
            }
            :host fieldset.grey > * {
                margin: 2px auto;
            }
            :host .link-arrow {
                opacity: 0.5;
            }
            @media all and (max-width: 580px) {
                :host #pager {
                    width: 100vw;
                    max-width: 380px;
                }
                :host #pager > * {
                    margin: auto 40px;
                }
                :host h2 {
                    font-size: 18px;
                }
            }
            @media all and (min-width: 580px) {
                :host #pager {
                    width: 460px;
                }
            }
        </style>
        <kano-modal id="dialog" on-dismiss="_cancel" assets-path="[[assetsPath]]" motif="[[assetsPath]]/avatar/judoka-face.svg" opened="{{opened}}" closable="{{!isForceSignup}}">
            <iron-pages attr-for-selected="id" selected="login" id="pager">
                <div id="login">
                    <h2>Log in to your account</h2>
                    <form class="fields" on-submit="confirmLogin">
                        <input type="text" value="{{username::input}}" placeholder="Your Kano username" tabindex="0">
                        <div class="form-error" hidden\$="{{!errors.username}}">{{errors.username}}</div>
                        <input type="password" value="{{password::input}}" placeholder="Your secret password" tabindex="0">
                        <div class="form-error" hidden\$="{{!errors.password}}">{{errors.password}}</div>
                        <div class="submit-wrapper">
                            <input disabled\$="[[processing]]" type="submit" value="Log in">
                            <paper-spinner-lite active="[[processing]]"></paper-spinner-lite>
                        </div>
                    </form>
                    <div class="footer">
                        Forgot your <a on-tap="displayPasswordReset">password</a> or
                        <a on-tap="displayUsernameReminder">username</a>?<br>
                        <a on-tap="signupClicked">Sign up <img src="[[assetsPath]]/icons/link-arrow.svg" class="link-arrow"></a>
                    </div>
                </div>
                <div id="signup">
                    <h2>Save your XP: join Kano</h2>
                    <div class="body">
                        Make a special username to save what you’ve earned.
                    </div>
                    <form class="fields" on-submit="confirmUserDetails">
                        <input type="text" value="{{firstName::input}}" placeholder="Type your first name" tabindex="0">
                        <input type="text" value="{{username::input}}" placeholder="Make up a Kano username" tabindex="0">
                        <div class="form-error" hidden\$="{{!errors.username}}">{{errors.username}}</div>
                        <input type="password" value="{{password::input}}" placeholder="Make up a secret password" tabindex="0">
                        <div class="form-error" hidden\$="{{!errors.password}}">{{errors.password}}</div>
                        <div class="submit-wrapper">
                            <input disabled\$="[[processing]]" type="submit" value="Join">
                            <paper-spinner-lite active="[[processing]]"></paper-spinner-lite>
                        </div>
                    </form>
                    <div class="footer">
                        Have an account already? Go to <br>
                        <a on-tap="loginClicked">Log in <img src="[[assetsPath]]/icons/link-arrow.svg" class="link-arrow"></a>
                    </div>
                </div>
                <div id="grownups">
                    <h2>Now go find your mum or dad!</h2>
                    <div class="body">
                        Ask a parent, teacher or guardian to help you (it’ll take less than a minute).
                        <template is="dom-if" if="[[!requireEmail]]">
                            If they can’t help right now, press ‘Sign up later’.
                        </template>
                    </div>
                    <form on-submit="grownupsSection">
                        <fieldset>
                          <legend>Grown Ups Only</legend>
                          <input type="submit" value="Join">
                        </fieldset>
                    </form>
                    <template is="dom-if" if="[[!requireEmail]]">
                        <div class="footer">
                            <div class="bold">
                                No grown ups around?
                            </div>
                            <a on-tap="_skip">Sign up later</a>
                        </div>
                    </template>
                </div>
                <div id="username-email">
                    <h2>Save your XP: join Kano</h2>
                    <div class="body">
                        Kano accounts need to be associated with an adult’s
                        email address. You’ll be able to see your progress in
                        learning to code, creative shares, and awards won.
                        Make a special username to save what you've earned.
                    </div>
                    <form class="fields" on-submit="confirmEmail">
                        <input type="text" value="{{username::input}}" placeholder="Your Kano username" tabindex="0">
                        <div class="form-error" hidden\$="{{!errors.username}}">{{errors.username}}</div>
                        <input type="password" value="{{password::input}}" placeholder="Your secret password" tabindex="0">
                        <div class="form-error" hidden\$="{{!errors.password}}">{{errors.password}}</div>
                        <input type="text" value="{{email::input}}" placeholder="Add your email address" tabindex="0">
                        <div class="form-error" hidden\$="{{!errors.email}}">{{errors.email}}</div>
                        <div class="checkboxes">
                            <div class="checkbox-input">
                                <input type="checkbox" checked="{{terms::change}}" id="tcs"><label for="tcs">I accept all the <a href="{{worldUrl}}/terms-of-use" target="_blank">Terms &amp; Conditions</a></label>
                            </div>
                            <div class="checkbox-input">
                                <input type="checkbox" checked="{{newsletter::change}}" id="newsletter"><label for="newsletter">Subscribe to the Kano newsletter</label>
                            </div>
                        </div>
                        <div class="submit-wrapper">
                            <input disabled\$="[[!emailValid]]" type="submit" value="Join">
                            <paper-spinner-lite active="[[processing]]"></paper-spinner-lite>
                        </div>
                    </form>
                    <div class="modal-error" hidden\$="{{!errors.connection}}">{{errors.connection}}</div>
                    <div class="footer">
                        Have an account already? Go to <br>
                        <a on-tap="loginClicked">Log in <img src="[[assetsPath]]/icons/link-arrow.svg" class="link-arrow"></a>
                    </div>
                </div>
                <div id="email">
                    <h2>Secure {{firstName}}’s Kano Account</h2>
                    <div class="body">
                        Kano accounts need to be associated with an adult’s
                        email address. You’ll be able to see {{firstName}}’s progress in
                        learning to code, creative shares, and awards won.
                    </div>
                    <form class="fields" on-submit="confirmEmail">
                        <input type="text" value="{{email::input}}" placeholder="Add your email address" tabindex="0">
                        <div class="form-error" hidden\$="{{!errors.email}}">{{errors.email}}</div>
                        <div class="checkboxes">
                            <div class="checkbox-input">
                                <input type="checkbox" checked="{{terms::change}}" id="tcs"><label for="tcs">I accept all the <a href="{{worldUrl}}/terms-of-use" target="_blank">Terms &amp; Conditions</a></label>
                            </div>
                            <div class="checkbox-input">
                                <input type="checkbox" checked="{{newsletter::change}}" id="newsletter"><label for="newsletter">Subscribe to the Kano newsletter</label>
                            </div>
                        </div>
                        <div class="submit-wrapper">
                            <input disabled\$="[[!emailValid]]" type="submit" value="Join">
                            <paper-spinner-lite active="[[processing]]"></paper-spinner-lite>
                        </div>
                    </form>
                    <div class="modal-error" hidden\$="{{!errors.connection}}">{{errors.connection}}</div>
                </div>
                <div id="done">
                    <h2>You’ve made a Kano Account</h2>
                    <div class="body">
                        Write down your username and password. Keep them
                        somewhere secret and safe.
                    </div>
                    <form on-submit="_success">
                        <fieldset class="grey">
                          <legend>Keep this safe</legend>
                          <div class="username"><strong>Username</strong> {{username}}</div>
                          <div class="password"><strong>Password</strong> {{password}}</div>
                        </fieldset>
                        <div class="submit-wrapper">
                            <input type="submit" value="Done" disabled="[[!successful]]">
                            <paper-spinner-lite active="[[!successful]]"></paper-spinner-lite>
                        </div>
                    </form>
                </div>
                <div id="username-reminder">
                    <h2>Forgotten your username?</h2>
                    <form class="fields" on-submit="confirmUsernameReminder">
                        <input type="text" value="{{email::input}}" placeholder="Your email address" tabindex="0">
                        <div class="form-error" hidden\$="{{!errors.email}}">{{errors.email}}</div>
                        <div class="submit-wrapper">
                            <input disabled\$="[[processing]]" type="submit" value="Request reminder">
                            <paper-spinner-lite active="[[processing]]"></paper-spinner-lite>
                        </div>
                    </form>
                    <div class="footer">
                        <a on-tap="displayPasswordReset">Forgot your password?</a><br>
                        <a on-tap="signupClicked">Sign up <img src="[[assetsPath]]/icons/link-arrow.svg" class="link-arrow"></a>
                    </div>
                </div>
                <div id="password-reset">
                    <h2>Forgotten your password?</h2>
                    <form class="fields" on-submit="confirmPasswordReset">
                        <input type="text" value="{{username::input}}" placeholder="Your username" tabindex="0">
                        <div class="form-error" hidden\$="{{!errors.username}}">{{errors.username}}</div>
                        <div class="submit-wrapper">
                            <input disabled\$="[[processing]]" type="submit" value="Request new password">
                            <paper-spinner-lite active="[[processing]]"></paper-spinner-lite>
                        </div>
                    </form>
                    <div class="footer">
                        <a on-tap="displayUsernameReminder">Forgot your username?</a><br>
                        <a on-tap="signupClicked">Sign up <img src="[[assetsPath]]/icons/link-arrow.svg" class="link-arrow"></a>
                    </div>
                </div>
                <div id="reset-confirmation">
                    <h2>Thanks!</h2>
                    <div class="body">
                        Please check your email and follow the instructions that have been sent to you.
                    </div>
                    <div class="body">
                        Or <a on-tap="loginClicked">Log in <img src="[[assetsPath]]/icons/link-arrow.svg" class="link-arrow"></a>
                    </div>
                    <div class="footer">
                        Forgot your <a on-tap="displayPasswordReset">password</a> or
                        <a on-tap="displayUsernameReminder">username</a>?<br>
                        <a on-tap="signupClicked">Sign up <img src="[[assetsPath]]/icons/link-arrow.svg" class="link-arrow"></a>
                    </div>
                </div>
            </iron-pages>
        </kano-modal>
`,

  is: 'kano-auth',

  properties: {
      errors: {
          type: Object,
          value: {}
      },
      username: {
          type: String
      },
      password: {
          type: String
      },
      firstName: {
          type: String
      },
      email: {
          type: String
      },
      /*
      * Boolean to prevent users skipping email input
      */
      requireEmail: {
          type: Boolean,
          value: false
      },
      terms: {
          type: Boolean,
          value: true
      },
      newsletter: {
          type: Boolean,
          value: true
      },
      finished: {
          type: Boolean,
          value: false
      },
      assetsPath: {
          type: String,
          value: '/'
      },
      apiUrl: {
          type: String,
          value: 'https://api-staging.kano.me'
      },
      processing: {
          type: Boolean,
          value: false
      },
      emailValid: {
          type: Boolean,
          computed: '_computeEmailValidity(terms, processing)',
          readOnly: true,
          notify: true
      },
      opened: {
          type: Boolean,
          notify: true
      },
      successful: {
          type: Boolean,
          value: true
      },
      isForceSignup: {
          type: Boolean,
          value: false
      }
  },

  setView (viewName) {
      this.$.pager.selected = viewName;

      let cap = viewName.charAt(0).toUpperCase() + viewName.slice(1);
      this.fire('track-event', 'authModal' + cap + 'ViewLoaded');
  },

  open (defaultPage) {
      this.reset();
      defaultPage = defaultPage || 'login';
      this.setView(defaultPage);
      this.$.dialog.open();
  },

  close () {
      this.$.dialog.close();
  },

  _skip () {
      this.fire('track-event', 'authModalGrownupsViewSkipClicked');
      this.fire('skip');
      this._cancel();
  },

  reset () {
      this.set('errors', {});
      this.firstName = null;
      this.username = null;
      this.password = null;
      this.email = null;
      this.terms = true;
      this.newsletter = true;
      this.finished = false;
  },

  validateUsername (username) {
      if (!username) {
          this.set('errors.username', "Username is required.");
          return false;
      }

      if (username.length < 3) {
          this.set('errors.username', "Must be at least 3 characters long.");
          return false;
      }

      if (!/^[a-zA-Z0-9_\-.]+$/.test(username)) {
          this.set('errors.username', "Only letters, numbers, dashes, underscores and dots are allowed.");
          return false;
      }

      this.set('errors.username', undefined);
      return true;
  },

  checkUsernameAvailability (username) {
      let url = this.apiUrl + "/users/username/" + username;
      return fetch(url).then((res) => {
          return !res.ok;
      });
  },

  validatePassword (password) {
      if (!password) {
          this.set('errors.password', "Password cannot be empty.");
          return false;
      }

      if (password.length < 6) {
          this.set('errors.password', "Password must be at least 6 characters long.");
          return false;
      }

      this.set('errors.password', undefined);
      return true;
  },

  confirmUserDetails (e) {
      e.preventDefault();
      if (this.validateUsername(this.username) &&
          this.validatePassword(this.password)) {
          this.set('processing', true);
          this.checkUsernameAvailability(this.username).then((available) => {
              if (available) {
                  this.firstName = this.firstName || 'Your kid';
                  this.setView('grownups');
              } else {
                  this.set('errors.username', 'This one is already taken.');
              }
              this.set('processing', false);
          }).catch((err) => {
              this.set('errors.password', 'Something went wrong. Please try again later.');
              this.set('processing', false);
          });
      }
  },

  grownupsSection (e) {
      e.preventDefault();
      this.setView('email');
  },

  validateEmail (email) {
      let emailRegex = /^[_a-z0-9-\+]+(\.[_a-z0-9-\+]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]+)$/i;

      if (!emailRegex.test(email)) {
          this.set('errors.email', "Please enter a valid email address.");
          return false;
      }

      this.set('errors.email', undefined);
      return true;
  },

  confirmEmail (e) {
      e.preventDefault();
      if (this.validateEmail(this.email)) {
          let progress = localStorage.getItem('progress');
          try {
              progress = JSON.parse(progress);
          } catch (e) {
              progress = null;
          }
          this.set('processing', true);
          this.signup().then((session) => {
              if (session) {
                  this.finished = true;
                  this.setView('done');
                  this.set('errors.connection', undefined);
                  if (progress) {
                      //saving local progress to API
                      this.syncProgress(progress, session.token).then(() =>
                              this.doLogin(this.username, this.password));
                  } else {
                      this.doLogin(this.username, this.password);
                  }
              } else {
                  this.set('errors.connection', 'Something went wrong. Please try again later.');
                  this.set('processing', false);
              }
          });
      }
  },

  signup () {
      let url = this.apiUrl + "/users";
      return fetch(url, {
          method: 'post',
          headers: new Headers({
              'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
              username: this.username,
              password: this.password,
              email: this.email,
              marketing_enabled_primary: this.newsletter
          })
      }).then(r => r.json())
        .then((res) => {
          return res.session;
      });
  },

  syncProgress (progress, token) {
      let url = this.apiUrl + "/users/profile",
          headers = new Headers({
              'Content-Type': 'application/json',
              'Authorization': token
          });
      return fetch(url, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify({
              'stats': {
                      'make-apps': {
                          'progress': progress
                      }
              }
          })
      });
  },

  confirmLogin (e) {
      e.preventDefault();
      this.set('errors.username', undefined);
      this.set('errors.password', undefined);

      if (!this.username) {
          this.set('errors.username', 'Username cannot be empty.');
          return;
      }

      if (!this.password) {
          this.set('errors.password', 'Password cannot be empty.');
          return;
      }

      this.set('processing', true);
      this.doLogin(this.username, this.password).then(() => {
          this._success();
      }).catch((err) => {
          this.set('errors.username', err);
          this.set('processing', false);
      });
  },

  doLogin (username, password) {
      let url = this.apiUrl + "/auth";
      return fetch(url, {
          method: 'post',
          headers: new Headers({
              'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
              email: this.username,
              password: this.password
          })
      }).then((res) => {
          if (!res.ok) {
              throw new Error('Username or password not recognised');
          }
          return res.json();
      }).then((data) => {
          this.fire('login', data.session);
          return;
      });
  },

  confirmUsernameReminder (e) {
      e.preventDefault();
      this.set('errors.email', undefined);

      if (!this.email) {
          this.set('errors.email', 'Email cannot be empty.');
          return;
      }

      this.set('processing', true);
      if (this.validateEmail(this.email)) {
          this.requestUsernameReminder(this.email).then(() => {
              this.setView('reset-confirmation');
              this.set('processing', false);
          }).catch((err) => {
              this.set('errors.email', err);
              this.set('processing', false);
          });
      }
  },

  requestUsernameReminder (email) {
      let url = `${this.apiUrl}/accounts/username-reminder`;
      return fetch(url, {
          method: 'post',
          headers: new Headers({
              'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
              email: this.email
          })
      }).then((res) => {
          if (!res.ok) {
              throw new Error('Email not recognised');
          }
          return res.json();
      });
  },

  confirmPasswordReset (e) {
      e.preventDefault();
      this.set('errors.email', undefined);

      if (!this.username) {
          this.set('errors.username', 'Username cannot be empty.');
          return;
      }

      this.set('processing', true);
      if (this.validateUsername(this.username)) {
          this.requestPasswordReset(this.username).then(() => {
              this.setView('reset-confirmation');
              this.set('processing', false);
          }).catch((err) => {
              this.set('errors.username', err);
              this.set('processing', false);
          });
      }
  },

  requestPasswordReset (username) {
      let url = `${this.apiUrl}/accounts/reset-password`;
      return fetch(url, {
          method: 'post',
          headers: new Headers({
              'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
              username: this.username
          })
      }).then((res) => {
          if (!res.ok) {
              throw new Error('Username not recognised');
          }
          return res.json();
      });
  },

  loginClicked () {
      this.reset();
      this.setView('login');
  },

  signupClicked () {
      this.reset();
      if (this.isForceSignup) {
          this.setView('username-email');
      } else {
          this.setView('signup');
      }

  },

  displayUsernameReminder() {
      this.reset();
      this.setView('username-reminder');
  },

  displayPasswordReset() {
      this.reset();
      this.setView('password-reset');
  },

  _success (e) {
      if (e) {
          e.preventDefault();
      }
      this.set('processing', false);
      this.fire('success');
      this.close();
  },

  _cancel () {
      this.fire('cancel');
      this.close();
  },

  _computeEmailValidity (terms, processing) {
      return terms && !processing;
  }
});
