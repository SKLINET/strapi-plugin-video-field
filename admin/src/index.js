import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginId from "./pluginId";
import VideoIcon from "./components/VideoField/VideoIcon";
import { getTrad } from "./utils";

export default {
  register(app) {
    app.customFields.register({
      name: "video",
      pluginId: "video-field",
      type: "json",
      icon: VideoIcon,
      intlLabel: {
        id: getTrad("video-field.label"),
        defaultMessage: "Video",
      },
      intlDescription: {
        id: getTrad("video-field.description"),
        defaultMessage: "Video field for YouTube or Vimeo.",
      },
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "video-field-input-component" */ "./components/VideoField/VideoInput"
          ),
      },
    });
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
