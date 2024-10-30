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
-   **Facebook videos:** If using videos from Facebook, please keep in mind, that you must use url, which contains "facebook" in it in order to make them work.

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

In `config/middlewares.js` file extend "strapi::security" middleware:

```js
{
        name: "strapi::security",
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    "frame-src":[
                        "'self'",
                        "youtube.com",
                        "www.youtube.com",
                        "vimeo.com",
                        "*.vimeo.com",
                        "facebook.com",
                        "www.facebook.com",
                    ],
                },
            },
        },
    },
```

If you do not yet have this file, then create and add:

```js
module.exports = [
    "strapi::errors",
    {
        name: "strapi::security",
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    "frame-src": [
                        "'self'",
                        "youtube.com",
                        "www.youtube.com",
                        "vimeo.com",
                        "*.vimeo.com",
                        "facebook.com",
                        "www.facebook.com",
                    ],
                    "connect-src": ["'self'", "https:", "blob:", "*.strapi.io",],
                    "img-src": [
                        "'self'",
                        "data:",
                        "blob:",
                        "dl.airtable.com",
                        "strapi.io",
                        "s3.amazonaws.com",
                        "cdn.jsdelivr.net",
                    ],
                    "style-src": ["'self'", "'unsafe-inline'"],
                    "media-src": ["'self'", "data:", "blob:"],
                    "script-src": [
                        "'self'",
                        "cdn.jsdelivr.net",
                        "blob:",
                        "https:",
                    ],
                    "font-src": ["'self'"],
                    upgradeInsecureRequests: null,
                },
            },
        },
    },
    "strapi::cors",
    "strapi::poweredBy",
    "strapi::logger",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
];
```

Then run build:

```bash
npm run build
```

or

```bash
yarn build
```

All done, you're now able to use video-field plugin ! After installation, you will find the video field at the custom fields section of the content-type builder.

This plugin returns value in JSON format. Your video-field will return data like this:

```js
{
    provider: "videoUid", // Provider of the video (youtube, vimeo, or facebook)
    providerUid: "RANDOMUID", // UID of the video
    url: "https://www.examplevideourl.com/RANDOMUID" // the whole URL of the video
}
```

## <a id="requirements"></a>⚠️ Requirements

Strapi **v5.x.x+**

Node **>= v20.x.x**

Tested on **v5.1.1**
