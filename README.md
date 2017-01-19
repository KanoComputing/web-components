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
