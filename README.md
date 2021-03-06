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

[hyb] kano-api-client-behavior
[hyb] kano-drop-down
[hyb] kano-modal
[hyb] kano-progress-api-behavior
[hyb] kano-share
[hyb] kano-step
[hyb] kano-user-summary
[hyb] kano-auth
[hyb] kano-drop-down-item
[hyb] kano-nav
[hyb] kano-progress-bar
[hyb] kano-share-card
[hyb] kano-style
[hyb] kano-cart
[hyb] kano-gamification
[hyb] kano-nav-bar-icons
[hyb] kano-project-card
[hyb] kano-share-feed
[hyb] kano-tracking
[hyb] kano-circle-progress
[hyb] kano-glint-animation
[hyb] kano-notifications
[hyb] kano-reward-modal
[hyb] kano-share-stats
[hyb] kano-user-badge
[hyb] kano-circle-spinner
[hyb] kano-icons
[hyb] kano-particle-burst
[hyb] kano-secondary-links
[hyb] kano-share-wrapper
[hyb] kano-user-menu
[hyb] kano-alert (Breaking change: As of shadow DOM v1, the slotted selector can only style top level elements. To style the buttons inside a kano-alert component, place them at the top level)
[hyb] kano-comment-report
[hyb] kano-lightboard-preview
[hyb] kano-primary-links
[hyb] kano-session
[hyb] kano-sound-player-behavior
[hyb] kano-user-stats


Usual issues experienced with the kano components:

 - `style` tag being outside of the template (A warning will be generated)
 - @apply(--whatever) => @apply --whatever
 - in demos: wrap style is="custom-style" in a `custom-style` element (web-components v1 spec)