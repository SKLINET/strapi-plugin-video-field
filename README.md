<h1 align="center">Strapi plugin Video Field</h1>

<p align="center">Adds custom video field to your Strapi application</p>

<p align="center">
  <img src="assets/video-field.png" alt="Image of Video Field" align="center">
</p>

## 👋 Intro

-   [Features](#features)
-   [Installation](#installation)
-   [Requirements](#requirements)

## <a id="features"></a>✨ Key feature

-   **Video field:** This plugin adds custom video field into your Strapi application ! Plugin currently supports YouTube, Vimeo, and Facebook videos.

## <a id="installation"></a>🔧 Installation

Inside your Strapi app, add the package:

With `npm`:

```bash
npm install @sklinet/strapi-plugin-video-field
```

With `yarn`:

```bash
yarn add @sklinet/strapi-plugin-video-field
```

In `config/plugins.js` file add:

```js
"video-field":{
    enabled:true
};
```

If you do not yet have this file, then create and add:

```js
module.exports = () => ({
    "video-field":{
      enabled:true
    };
})
```

Then run build:

```bash
npm run build
```

or

```bash
yarn build
```

## <a id="requirements"></a>⚠️ Requirements

Strapi **v4.x.x+**

Node **14 - 16**

Tested on **v4.4.1**
