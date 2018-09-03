const resourceMap = {
    'activity-feed': 'feeds/activity',
    'personalised': 'share/feed/personalised',
    'feature-share': 'share/:itemId/feature',
    'feed': 'share',
    'flag-comment': 'comments/flag/:commentId',
    'like-share': 'share/:id/like',
    'login': 'auth',
    'notifications': 'notifications',
    'notifications-read': 'notifications/read/:notificationId',
    'notifications-read-all': 'notifications/read',
    'post-comment': 'comments',
    'session': 'auth/session',
    'share-by-slug': 'share/slug/:slug',
    'share-comments': 'comments/share/:id',
    'share-by-id': 'share/:itemId',
    'share-by-username': 'share/:userId/:app',
    'stats': 'stats/activity',
    'user-by-username': 'users/username/:username',
    'user-by-id': 'users/:userId',
    'follow': 'users/follow/:userId',
    'progress': 'progress',
    'progress-by-username': 'progress/user/:username',
    'report': 'report',
    'change-password': 'accounts/change-password',
    'change-email': 'accounts/change-email/:userId',
    'update-profile': 'users/profile',
    'notification-settings': 'sync/settings'
};

let cache = {};

/**
 * @polymerBehavior
 */
export const APIClient = {
    properties: {
        config: {
            type: Object
        },
        context: {
            type: Object,
            value: () => Kano.World || Kano.App || {},
            observer: '_initClient'
        }
    },
    _initClient () {
        this.config = this.config || this.context.config;
        if (!this.context.config && !this.context.initialized) {
            console.warn('No Kano configuration:\nPlease import a Kano.World or Kano.App config Object to use the API');
        }
        this.context.initialized = true;
    },
    _getUrl (resource, params={}) {
        if (!this.config) {
            return;
        }
        let path = resourceMap[resource];

        Object.keys(params).forEach(key => {
            path = path.replace(new RegExp(`:${key}`, 'i'), params[key]);
        });
        return `${this.config.API_URL}/${path}`;
    },
    /**
     * Holds in memory the responses and returns them instead of calling the endpoint again.
     * No invalidation is configured, the responses will be the same until the user leaves or refreshes the page
     */
    cacheOrAPI (url) {
        // Populate the cache if not existing
        if (!cache[url]) {
            cache[url] = fetch(url).then(r => r.json());
        }
        return cache[url];
    },
    unlockBadge (id, token, onComplete) {
        if (!token) {
            return;
        }
        fetch(this._getUrl('progress'), {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({
                name: 'unlock-badge',
                detail: {
                    id: id
                }
            })
        })
        .then(r => r.json())
        .then(res => {
            if (res.success && onComplete) {
                onComplete(res.update);
            }
        });
    }
};
