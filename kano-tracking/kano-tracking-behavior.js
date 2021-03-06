import 'blueimp-md5/js/md5.js';
import 'platform/platform.js';

// Expire the session after 30 minutes of inactivity
const DEFAULT_EXPIRY = 30 * 60 * 1000;

export const GeneralBehavior = {
    properties: {
        config: {
            type: Object
        },
        browserId: {
            type: String
        },
        errorQueue: {
            type: Array,
            value: () => []
        },
        lastUpdate: {
            type: String
        },
        location: {
            type: String
        },
        os: {
            type: Object,
            value: () => {}
        },
        previousSession: {
            type: Boolean,
            value: false
        },
        queue: {
            type: Array,
            value: () => []
        },
        schema: {
            type: String
        },
        sessionId: {
            type: String
        },
        sessionStarted: {
            type: Boolean,
            value: false
        },
        timezoneOffset: {
            type: String
        },
        token: {
            type: String,
            observer: '_trackingTokenChanged'
        }
    },
    observers: [
        '_dispatchQueue(queue, sessionStarted)',
        '_dispatchErrorQueue(errorQueue, sessionStarted)'
    ],
    listeners: {
        'error-event': '_trackUserError',
        'tracking-event': '_trackBasicEvent'
    },
    ready () {
        this.context = this.context ||
                       Kano.MakeApps ||
                       Kano.World ||
                       Kano.App ||
                       {};
        this.config = this.config || this.context.config;
        if (!this.config && !this.context.initialized) {
            console.warn('No Kano configuration:\nPlease import a Kano.World or Kano.App config Object to use tracking');
        }
        this.context.initialized = true;
        window.onerror = this._trackSystemError.bind(this);
    },
    _dispatchEvent (payload, initialize) {
        let sessionExpired = this._sessionExpired(this.lastUpdate);
        if (sessionExpired && this.sessionStarted) {
            this._restartSession();
        }
        if (!this.sessionStarted && !initialize) {
            this.push('queue', payload);
            return;
        }
        let headers = new Headers({
                'Content-Type': 'application/json'
            }),
            body = {
                app_id: this.config.APP_ID,
                app_version: this.config.VERSION,
                browser_id: this.browserId,
                page_path: this.path || '',
                session_id: this.sessionId,
                name: payload.name,
                os: this.os.name,
                os_version: this.os.version,
                time: parseInt(Date.now() / 1000),
                timezone_offset: this.timezoneOffset
            };
        if (this.token) {
            headers.append('Authorization', this.token);
        } else if (payload.token) {
            /**
             * If a token has been passed through with the event details,
             * use this as a backup token to identify events with a user
             */
            headers.append('Authorization', payload.token);
        }
        if (this.kitId) {
            body.kitId = this.kitId;
        }
        if (this.mode) {
            body.mode = this.mode;
        }
        if (payload.data) {
            body.data = payload.data;
        }
        if (this.config.DEBUG) {
            console.log('Tracking event: ' + payload.name);
            console.log(body);
        }
        this.lastUpdate = Date.now();
        fetch(this.config.API_URL + '/track/'  + this.schema, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        }).catch(err => {
            if (this.config.DEBUG) {
                console.log(err);
            }
        });
    },
    _dispatchQueue (queue, sessionStarted) {
        if (queue.length && sessionStarted) {
            this.debounce('dispatch-queue', () => {
                queue.forEach(item => {
                    this._dispatchEvent(item);
                });
                this.queue = [];
            });
        }
    },
    _dispatchErrorQueue (queue, sessionStarted) {
        if (queue.length && sessionStarted) {
            queue.forEach(item => {
                this._trackError(item);
            });
            this.queue = [];
        }
    },
    _initializeTracking () {
        this._setSchema();
        this._setIds();
        this._setOs();
        this._setTimezoneOffset();
        let storedLocation = localStorage.getItem('KANO-TRACKING-LOCATION');
        if (!storedLocation || storedLocation === 'Unkown') {
            this._getLocation().then(response => {
                this.location = response;
                localStorage.setItem('KANO-TRACKING-LOCATION', response);
                this._startSession();
            });
        } else {
            this.location = storedLocation;
            this._startSession();
        }
    },
    _restartSession () {
        /**
         * Generate a new sessionId for the new session, and reset all
         * previous details
         */
        let idString = window.navigator.userAgent + Date.now().toString(),
            hashedId = window.md5(idString);
        this.sessionId = hashedId;
        sessionStorage.setItem('KANO-TRACKING-SESSION-ID', hashedId);
        this.sessionStarted = false;
        this.previousSession = false;
        this._startSession();
    },
    _setSchema () {
        /**
         * When using Kano Code within the Electron app, we want to be able
         * to provide the app's schema in place of the default schema
         */
        this.schema = localStorage.getItem('KANO-TRACKING-SCHEMA') || this.config.TRACKING.SCHEMA;
    },
    _setIds () {
        let browserId = localStorage.getItem('KANO-TRACKING-BROWSER-ID'),
            sessionId = sessionStorage.getItem('KANO-TRACKING-SESSION-ID'),
            savedSessionId = localStorage.getItem('KANO-TRACKING-SESSION-ID'),
            idString = window.navigator.userAgent + Date.now().toString(),
            hashedId = window.md5(idString);
        /**
         * If a `session-id` has been saved in localStorage, then we want
         * make use of this to continue the session, and then clear
         * localStorage
         */
        if (savedSessionId) {
            sessionId = savedSessionId;
            sessionStorage.setItem('KANO-TRACKING-SESSION-ID', savedSessionId);
            if (!this.preserveSavedSession) {
                localStorage.removeItem('KANO-TRACKING-SESSION-ID');
            }
        }
        /**
         * If a sessionId exists at this point, we are in a previous session
         * and don't want to reinitialise it
         */
        if (sessionId) {
            this.previousSession = true;
        } else {
            sessionId = hashedId;
            sessionStorage.setItem('KANO-TRACKING-SESSION-ID', hashedId);
        }
        if (!browserId) {
            browserId = hashedId;
            localStorage.setItem('KANO-TRACKING-BROWSER-ID', hashedId);
        }
        this.browserId = browserId;
        this.sessionId = sessionId;
    },
    _getLocation () {
        return fetch(this.config.GEO_API)
          .then((response) => response.json())
          .then((response) => {
              return response.Country.Names.en;
          }).catch((error) => {
              return 'Unknown';
          });
    },
    _saveSession () {
        localStorage.setItem('KANO-TRACKING-SESSION-ID', this.sessionId);
    },
    _saveSchema () {
        localStorage.setItem('KANO-TRACKING-SCHEMA', this.schema);
    },
    _sessionExpired (lastUpdate) {
        if (!lastUpdate) {
            return false;
        }
        let now = Date.now();
        return now - lastUpdate > DEFAULT_EXPIRY;
    },
    _setOs () {
        let os = {
            name: window.platform.os.family,
            version: window.platform.os.version
        }
        this.os = os;
    },
    _setTimezoneOffset () {
        let now = new Date(),
            timezoneOffset = now.getTimezoneOffset();
        this.timezoneOffset = timezoneOffset;
    },
    _startSession () {
        if (!this.previousSession) {
            this._dispatchEvent({
                name: 'started_session',
                data: {
                    user_location: this.location
                }
            }, true);
        }
        this.sessionStarted = true;
    },
    _trackingTokenChanged (current, previous) {
        /**
         * If there was a previous session, but not a new one – ie. the
         * user has logged out – we want to trigger a new session
         */
        if (previous && !current) {
            this._restartSession();
        }
    },
    _trackBasicEvent (e) {
        let name = e.detail.name,
            payload = {
                name
            };
        if (e.detail.data) {
            payload.data = e.detail.data;
        }
        if (e.detail.token) {
            payload.token = e.detail.token;
        }
        this._dispatchEvent(payload);
    },
    _trackError (payload) {
        if (this.sessionStarted) {
            payload.os = this.os.name;
            payload.os_version = this.os.version;
            this._dispatchEvent(payload);
        } else {
            this.push('errorQueue', payload);
        }
    },
    _trackUserError (e) {
        this._trackError({
            name: 'user_error',
            data: {
                error_message: e.detail.message
            }
        });
    },
    _trackSystemError (msg, url, lineNo, columnNo, error) {
        let message = [
                'Message: ' + msg,
                'Path: ' + url,
                'Line: ' + lineNo,
                'Column: ' + columnNo
            ].join(' - ');
            this._trackError({
                name: 'system_error',
                data: {
                    error_message: message
                }
            });
        return false;
    }
};
