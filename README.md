# Create React SPA

This is a bare-bones skeleton for starting a single-page React app.

## Installation

To install, clone or download the repo and run `npm install`.

## Building and Running Your App

### Development Mode

To run the app in development mode, use `npm run dev-client` and navigate to [`http://localhost:8080`](http://localhost:8080). The Webpack dev server is already set up for hot-reloading of React components.

Alternatively you may use `npm run dev`, which runs the Express server in parallel with the Webpack dev server, but this is only needed if HTTP requests will be made to the Express server after the page initially loads (see the last section below on Implementing HTTP Requests).

### Production Mode

The build script `npm run build` puts the production files into a new `public` folder (that Git is configured to ignore), and `npm start` serves the Express app in production mode at [`http://localhost:3000`](http://localhost:3000) by default.

## ES6+ and ES5 Bundles

The build stage outputs two JavaScript bundles: a slim ES6+ version, and a polyfill-bloated ES5 version. Browsers that support ES modules will request only the former, while browsers that don’t will request only the latter. To see how this is implemented, take a look at the `<script>` tag at the bottom of [`src/index.html`](./src/index.html#L10).

Babel is configured to load polyfills into the ES5 version for any JavaScript used in the app that IE10 doesn’t support (unless it’s used by something in `node_modules`, which is why we import `map` and `set` directly into `src/js/es5-index.js`). This doesn’t cover DOM polyfills. To change which browsers to target for JS polyfill support, edit the Babel settings for `es5Bundle` in `webpack-helpers/base-bundles.js` as needed (at the bottom of the file).

## CSS Modules

Webpack is configured for CSS modules here. See the `src/js/components/App` folder for an example. In development mode, the generated class names are legible and `style-loader` injects *internal* style sheets. In production mode, the generated class names are hashes, `mini-css-extract-plugin` builds an *external* style sheet, and `html-webpack-plugin` injects a link to the style sheet (`html-webpack-exclude-assets-plugin` is used to inject *only* a link to the CSS, since otherwise a link to the JS bundle would be injected too, and we’re already requesting the JS from the script tags at the end of the HTML’s `<body>`).

## JavaScript Class Properties

Experimental class properties are supported out of the box, so it’s fine to use (say) arrow-function methods and `const state = { ... };` in React class components. (The `babel-eslint` parser used in `src/js/.eslintrc.json` takes care of the linting.)

## JavaScript Module Syntax

Node’s experimental support for ES6 `import`/`export` syntax is enabled in this package, so use that rather than `require` and `module.exports` in both the `src` and `server` folders. In `webpack.config.js` and `webpack-helpers`, however, `require` and `module.exports` must be used.

## Implementing HTTP Requests

This skeleton does *not* presume that HTTP requests will be made to the server after the page is initially loaded. If they will be, `npm install` at least `body-parser` and uncomment as instructed in `server/server.js` (and write the API in the `server` folder, of course.)

To make the requests work in development mode as well, uncomment the webpack dev server’s proxy settings as instructed in `webpack-helpers/base-bundles.js` (the `npm run dev` script already runs the Express server on port 3000 in parallel with the webpack dev server [port 8080], so once the API is written, diverting API calls to port 3000 in this manner will suffice).

If the Fetch API will be used for HTTP requests, support legacy browsers by npm-installing `whatwg-fetch` and uncommenting in `src/js/es5-index.js` as instructed.
