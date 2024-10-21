import { getTranslation } from './utils/getTranslation';
import FieldIcon from './components/Field/Icon';
import { Initializer } from './components/Initializer';
import { PLUGIN_ID } from './pluginId';
import { prefixPluginTranslations } from './utils/prefixPluginTranslations';

export default {
    register(app: any) {
        app.customFields.register({
            name: 'video',
            pluginId: PLUGIN_ID,
            type: 'json',
            icon: FieldIcon,
            intlLabel: {
                id: getTranslation('video-field.label'),
                defaultMessage: 'Video',
            },
            intlDescription: {
                id: getTranslation('video-field.description'),
                defaultMessage: 'Video field for YouTube or Vimeo.',
            },
            components: {
                Input: async () =>
                    import(/* webpackChunkName: "video-field-input-component" */ './components/Field/Input'),
            },
        });

        app.registerPlugin({
          id: PLUGIN_ID,
          initializer: Initializer,
          isReady: false,
          name: PLUGIN_ID,
        });
    },

    async registerTrads(app: any) {
        const { locales } = app;

        const importedTranslations = await Promise.all(
            (locales as string[]).map((locale) => {
                return import(`./translations/${locale}.json`)
                    .then(({ default: data }) => {
                        return {
                            data: prefixPluginTranslations(data, PLUGIN_ID),
                            locale,
                        };
                    })
                    .catch(() => {
                        return {
                            data: {},
                            locale,
                        };
                    });
            }),
        );

        return importedTranslations;
    },
};
