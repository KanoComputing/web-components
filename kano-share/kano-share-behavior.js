/**
 * @polymerBehavior
 */
export const ShareBehavior = {
    properties: {
        appIntegration: {
            type: Boolean,
            computed: '_appIntegration(availableApps, selectedShare)'
        },
        availableApps: {
            type: Array,
            value: () => []
        },
        avatar: {
            type: String,
            computed: '_computeAvatar(selectedShare)'
        },
        defaultAvatar: {
            type: String,
            value: 'https://s3.amazonaws.com/kano-avatars/judoka-standard.png'
        },
        availableHardware: {
            type: Array,
            value: () => []
        },
        hardwareIntegration: {
            type: Boolean,
            computed: '_hardwareIntegration(availableHardware, selectedShare)'
        },
        liked: {
            type: Boolean,
            notify: true,
            value: null
        },
        numberOfLikes: {
            type: Number,
            value: 0
        },
        /** Array of IDs for shares saved on the current device */
        savedShares: {
            type: Array
        },
        savedToDevice: {
            type: Boolean,
            computed: '_savedToDevice(selectedShare, savedShares)'
        },
        selectedShare: {
            type: Object
        },
        sharedByUser: {
            type: Boolean,
            computed: '_sharedByUser(selectedShare, user.id)'
        }
    },
    observers: [
        '_checkLikes(selectedShare.*, user)'
    ],
    /** Check whether this share can be remixed (or not) */
    _appIntegration (availableApps, share) {
        if (!availableApps || !share) {
            return false;
        }
        return availableApps.indexOf(share.app) > -1;
    },
    _checkLikes () {
        if (this.selectedShare) {
            this.set('numberOfLikes', this.selectedShare.likes.length);
            if (this.user) {
                var liked = this.selectedShare.likes.some((like) => {
                    return like.user === this.user.id;
                });
                return this.set('liked', liked);
            } else {
                return this.set('liked', false);
            }
        }
    },
    _computeAvatar (share) {
        if (!share || !share.user) {
            return this.defaultAvatar;
        }
        return share.user.avatar.urls.character || this.defaultAvatar;
    },
    _hardwareIntegration (availableHardware, share) {
        if (!availableHardware || !share) {
            return false;
        }
        let shareContainsAnimation = this._shareContainsAnimation(share),
            shareContainsCode = this._shareContainsCode(share);
        /**
         * If the share contains an animation, then we only need to
         * ensure that the available hardware can display this.
         */
        if (shareContainsAnimation) {
            return availableHardware.some(hardware => {
                  return hardware.animation;
            });
        }
        /**
         * If the share contains code, then we need to ensure that the
         * hardware requirements specified by the share are met, and
         * and that the hardware is able to run code.
         */
         if (shareContainsCode) {
             return share.hardware.some(hardware => {
                 return availableHardware.some(item => {
                     return item.code &&
                            item.product === hardware.product;
                 });
             });
         }
    },
    _savedToDevice (selectedShare, savedShares) {
        if (!selectedShare || !savedShares) {
            return false;
        }
        return savedShares.indexOf(selectedShare.id) > -1;
    },
    _sharedByUser (share, userId) {
        if (!share || !userId) {
            return false;
        }
        return share.user && share.user.id === userId;
    },
    _shareContainsAnimation (share) {
        if (!share || !share.attachments) {
            return false;
        }
        /**
         * We can tell if the share contains code by checking for an
         * animation attachment.
         */
        return share.attachments.animation_url !== null &&
               share.attachments.animation_url !== undefined;
    },
    _shareContainsCode (share) {
        if (!share || !share.attachments) {
            return false;
        }
        /**
         * We can tell if the share contains code by checking for the
         * workspace info in the attachments.
         */
        return share.attachments.workspace_info_url !== null &&
               share.attachments.workspace_info_url !== undefined;
    },
    _updateDevice () {
        let action = !this.savedToDevice ? 'add' : 'remove',
            app = this.selectedShare;
        this.fire('update-device-action', {
            action,
            app
        });
    }
};
