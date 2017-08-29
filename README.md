# Kano Web Components

### A library of shared elements and behaviors for the Kano ecosystem

[Docs & demo](https://kanocomputing.github.io/web-components)

Used in: Kano Code, Kano World (new codebase)

#### Development

After cloning the repo, install the dependencies in the main folder:

```
git clone git@github.com:KanoComputing/web-components.git
cd web-components
bower install
```

The components refer to their bower dependencies outside of their environment i.e. `../` and `../../`. This is because **web-components** is meant to be a bower dependency itself.
E.g. `<link rel="import" href="../../iron-image/iron-image.html">` Therefore, a good practice is using Polyserve [[link]](https://github.com/PolymerLabs/polyserve) that serves the component folders under `./bower_components/`.

Polyserve's default port is **8080** and the components are accessible at `http://localhost:8080/components/web-components/{componentName}`.

For example, the `kano-auth` demo-page would be `http://localhost:8080/components/web-components/kano-auth/demo/index.html`.

To use the local version of **web-components** as a bower dependency, type ```bower link``` in the **web-components** folder and then ```bower link web-components``` in the project folder where you want to use it. Be aware though that Gulp can't handle symlinks (in which case manual copy-pasting of the dependency folder offers a solution).

### Releasing on Github

When a new release is due, you can update the release in the Kano Web Components repository [[link]](https://github.com/KanoComputing/web-components/releases).

## Migration to Polymer 2.x

Listed here are all the components defined in this repository. Initally developed using Polymer 1.x, we now intent to move progressively towards Polymer 2.x.

To work on the migration, use the `bower-2.x.json` file and rename it to bower.json (backing up the original bower.json).
Clean and reinstall your bower dependencies. This will update all the third party libraries to their 2.x version.
The imports for a 1.x element will now point to the Polymer compatibility layer for 2.x

This list indicates the status of the migration:

hyb = hybrid

[1.x] kano-api-client-behavior
[1.x] kano-drop-down
[hyb] kano-modal
[1.x] kano-progress-api-behavior
[1.x] kano-share
[1.x] kano-step
[1.x] kano-user-summary
[hyb] kano-auth
[1.x] kano-drop-down-item
[1.x] kano-nav
[1.x] kano-progress-bar
[1.x] kano-share-card
[1.x] kano-style
[hyb] kano-cart
[1.x] kano-gamification
[1.x] kano-nav-bar-icons
[1.x] kano-project-card
[1.x] kano-share-feed
[1.x] kano-tracking
[hyb] kano-circle-progress
[1.x] kano-glint-animation
[1.x] kano-notifications
[1.x] kano-reward-modal
[1.x] kano-share-stats
[hyb] kano-user-badge
[1.x] kano-circle-spinner
[1.x] kano-icons
[1.x] kano-particle-burst
[1.x] kano-secondary-links
[1.x] kano-share-wrapper
[1.x] kano-user-menu
[1.x] kano-alert
[1.x] kano-comment-report
[1.x] kano-lightboard-preview
[1.x] kano-primary-links
[1.x] kano-session
[1.x] kano-sound-player-behavior
[1.x] kano-user-stats


Usual issues experienced with the kano components:

 - `style` tag being outside of the template (A warning will be generated)