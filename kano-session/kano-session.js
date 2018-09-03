import '@polymer/polymer/polymer-legacy.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import { APIClient } from '../kano-api-client-behavior/kano-api-client-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

const MAX_SESSION_LENGTH = 86400;

// Copies the legacy KW token to the v2 in localStorage
var legacyToken = localStorage.getItem('KW_TOKEN');

if (!!legacyToken && legacyToken !== 'null') {
    localStorage.setItem('KW_TOKENv2', JSON.stringify(legacyToken));
}

// Promise map of the requests that will be made. This allows all instances of `kano-session` to share requests
var promises = {};

Polymer({
  _template: html`
        <app-localstorage-document id="session" key="KW_SESSION" data="{{session}}"></app-localstorage-document>
        <app-localstorage-document id="token" key="KW_TOKENv2" data="{{token}}"></app-localstorage-document>
`,

  is: 'kano-session',
  behaviors: [APIClient],

  properties: {
      /**
       * Authenticated user. Will be undefined if no token was retrieved from the storage
       */
      user: {
          type: Object,
          notify: true
      },
      /**
       * User's token. Used to retrieve the session if not cached or expired. Stored in the storage.
       */
      token: {
          type: Object,
          notify: true
      },
      /**
       * Set to true to enforce the presence of the `profile` key in the user. Will be cached in memory for
       * the durartion of the navigation
       */
      includeProfile: {
          type: Boolean,
          value: false
      },
      /**
       * Exposes the status of the session. `initialising` ,`not-authenticated`, `authenticated`, `authenticating`, `expired`
       */
      status: {
          type: String,
          value: 'initialising',
          notify: true
      }
  },

  observers: [
      '_sessionChanged(session)',
      '_tokenChanged(token)',
      '_userChanged(user)',
      '_includeProfileChanged(includeProfile, session, token)'
  ],

  attached () {
      this.init();
  },

  init () {
      return Promise.all([
          this.$.token.initializeStoredValue(),
          this.$.session.initializeStoredValue()
      ]).then(results => {
          this.token = this.token || null;
          this.session = this.session || null;
          if (!this.token) {
              this.status = 'not-authenticated';
          }
          return Promise.resolve(this.session);
      });
  },

  _tokenChanged (token) {
      if (!this.session || this._hasExpired()) {
          this._retrieveSession();
      } else {
          this.set('user', this.session.user);
          this.status = 'authenticated';
      }
      if (!token) {
          localStorage.removeItem('KW_TOKEN');
          this.set('user', null);

      } else {
          localStorage.setItem('KW_TOKEN', this.token);
      }
  },

  _includeProfileChanged (value, session, token) {
      if (value && session && token) {
          if (!promises['profile']) {
              var headers = new Headers();
                  headers.append('Authorization', this.token);
              promises['profile'] = fetch(this._getUrl('user-by-username', { username: session.user.username }), { headers })
                  .then(r => r.json())
                  .catch(e => {
                      let offline = !window.navigator.onLine;
                      /**
                       * We should only clear the token and session if
                       * the user is online. Otherwise it's a
                       * connection error, and we can leave the token
                       * in place. If the browser doesn't support
                       * `window.navigator.onLine`, then this will be
                       * false to avoid errors.
                       */
                      if (!offline) {
                          this.token = null;
                          this.session = null;
                          this.status = 'not-authenticated';
                      }
                      /** Clear the promise so we can try again */
                      promises['profile'] = null;
                  });
          }
          promises['profile'].then(res => {
              if (res) {
                  this.set('user.profile', res.user.profile);
                  this.updateProgress();
              }
          });
      }
  },

  _hasExpired () {
      return (new Date() - this.session.startedAt) > MAX_SESSION_LENGTH;
  },

  logout () {
      localStorage.setItem('progress', null);
      this.set('user', null);
      this.set('token', null);
      promises = {};
      this.fire('logout');
  },

  reinitialize () {
      return this.init().then(session => {
          if (!this.token) {
              return Promise.reject();
          }
          var headers = new Headers();
          headers.append('Authorization', this.token);
          if (!promises['session']) {
              this.status = 'authenticating';
              promises['session'] = fetch(this._getUrl('session'), { headers })
                  .then(r => r.json());
          }
          return promises['session'].then(res => {
              this.set('user', res.session.user);
              this.status = 'authenticated';
              return Promise.resolve(res.session.user);
          });
      });
  },

  _retrieveSession () {
      if (!this.token) {
          return;
      }
      var headers = new Headers();
      headers.append('Authorization', this.token);
      if (!promises['session']) {
          this.status = 'authenticating';
          promises['session'] = fetch(this._getUrl('session'), { headers })
              .then(r => r.json());
      }
      promises['session'].then(res => {
          this.set('user', res.session.user);
          this.status = 'authenticated';
      });
  },

  _sessionChanged (session) {
      if (session === null) {
          this.set('user', null);
      }
  },

  updateProgress () {
      if (!promises['progress']) {
          var headers = new Headers();
              headers.append('Authorization', this.token);
          promises['progress'] = fetch(this._getUrl('progress'), {
              headers
          })
          .then(r => r.json())
          .catch(e => {
              /** Clear the promise to that we can try again */
              promises['progress'] = null;
          });
      }
      promises['progress'].then(res => {
          this.set('user.profile.progress', res.progress);
      });
  },

  _userChanged (user) {
      if (user) {
          this.set('session', {
              user,
              startedAt: Date.now()
          });
      } else {
          this.set('session', null);
      }
  }
});
