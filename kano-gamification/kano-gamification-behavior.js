export const Gamification = {
    properties: {
        config: {
            type: Object
        },
        context: {
            type: Object
        },
        sessionTracked: {
            type: Boolean,
            value: false
        },
        token: {
            type: String,
            observer: '_trackSessionStarted'
        }
    },
    listeners: {
        'gamification-event': '_saveGamificationEvent'
    },
    ready () {
        this.context = Kano.World || Kano.App || {};
        this.config = this.config || this.context.config;
        if (!this.config && !this.context.initialized) {
            console.warn('No Kano configuration:\nPlease import a Kano.World or Kano.App config Object to use the API');
        }
        this.context.initialized = true;
    },
    _saveGamificationEvent (e) {
        if (!this.token || !e.detail || !e.detail.name || !e.detail.detail) {
            return;
        }
        let headers = new Headers({
            'Authorization': this.token,
            'Content-Type': 'application/json'
        });
        fetch(this.config.API_URL + '/progress/', {
            method: 'POST',
            headers,
            body: JSON.stringify(e.detail)
        })
        .then(response => response.json())
        .then(response => {
            this._trackGamificationEvent(response.update);
            if (this.$['reward-modal']) {
                this.$['reward-modal'].process(response, this.user);
            }
        })
        .catch(err => {});
    },
    _trackGamificationEvent (update) {
        let badgesAwarded = [],
            badgeTest = new RegExp('badges-.*'),
            badgesToTrack = false;

        for (let category in update) {
            let isBadge = badgeTest.test(category),
                categoryChanges = update[category].changes,
                newBadges = categoryChanges.new || [];
            newBadges.forEach(badge => {
                badgesAwarded.push(badge);
            });
        }

        badgesToTrack = badgesAwarded.length;

        if (badgesToTrack) {
            badgesAwarded.forEach(badge => {
                this.fire('tracking-event', {
                    name: 'badge_unlocked',
                    data: {
                        badge_id: badge.id,
                        badge_name: badge.title
                    }
                });
            });
        }
    },
    _trackSessionStarted () {
        if (!this.token) {
            this.sessionTracked = false;
        } else if (!this.sessionTracked) {
            this.fire('gamification-event', {
                name: 'session-activity',
                detail: {}
            });
            this.sessionTracked = true;
        }
    }
};
