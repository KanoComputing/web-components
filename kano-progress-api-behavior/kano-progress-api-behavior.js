import { APIClient } from '../kano-api-client-behavior/kano-api-client-behavior.js';
/**
 *  This behaviour abstracts the client-side handling of
 *  progress events in our gamification API as well as
 *  triggering the rewards modal.
 */

ProgressAPIImpl = {
    properties: {
        config: {
            type: Object
        }
    },
    ready () {
        APIClient.ready.apply(this, arguments);
    },
    fireProgressEvent (name, detail, rewardDialog) {
        var progressEvent = {
            name: name,
            detail: detail
        };

        this._progressTransaction(progressEvent, rewardDialog);
    },
    _progressTransaction (events, rewardDialog) {
        if (!Array.isArray(events)) {
            events = [events];
        }

        var url = this._getUrl('progress'),
            headers = {
                'Content-Type': 'application/json'
            };

        if (this.token) {
            headers.Authorization = this.token;
        }

        return fetch(url, {
            method: 'POST',
            headers: new Headers(headers),
            body: JSON.stringify(events)
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data.success === true) {
                if (data.update) {
                    rewardDialog.open(data);
                }
            } else {
                console.log("Error: Failed to process progress event");
            }
        });
    }
};

/**
 * @polymerBehavior
 */
export const ProgressAPI = [APIClient, ProgressAPIImpl];
