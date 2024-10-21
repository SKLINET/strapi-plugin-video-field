import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Flex, Field } from '@strapi/design-system';
import { getVideoProviderAndUid } from '../../utils/getVideoProviderAndUid';
import { useIntl } from 'react-intl';
import { getTranslation } from '../../utils/getTranslation';

interface VideoInputProps {
    intlLabel: Record<any, any>;
    onChange: (e: any) => void;
    attribute: Record<any, any>;
    name: string;
    disabled?: boolean;
    error?: string;
    labelAction?: Record<any, any>;
    required?: boolean;
    value?: any;
    [key: string]: any;
}

const VideoInput = ({ attribute, name, onChange, value, intlLabel, intlDescription }: VideoInputProps) => {
    const [providerUid, setProviderUid] = useState<string | null>(null);
    const [provider, setProvider] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [invalidUrl, setInvalidUrl] = useState(false);
    const { formatMessage } = useIntl();

    // Load data from value on page load
    useEffect(() => {
        let initialValue;

        if (typeof value === 'object') {
            initialValue = value;
        } else {
            try {
                initialValue = JSON.parse(value);
            } catch (e) {
                initialValue = {};
            }
        }

        if (initialValue?.url) {
            setVideoUrl(initialValue.url);
            if (initialValue.provider && initialValue.providerUid) {
                setInvalidUrl(false);
                setProvider(initialValue.provider);
                setProviderUid(initialValue.providerUid);
            } else {
                setInvalidUrl(true);
            }
        }
    }, [value]);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setVideoUrl(e.target.value || '');
        if (e.target.value) {
            const data = getVideoProviderAndUid(e.target.value);

            if (e.target.value.length > 0) {
                setInvalidUrl(true);
            }

            if (data?.provider && data?.providerUid) {
                setInvalidUrl(false);
                setProvider(data.provider);
                setProviderUid(data.providerUid);
            }

            const valueObj = {
                url: e.target.value,
                provider: data?.provider || '',
                providerUid: data?.providerUid || '',
            };

            onChange({
                target: {
                    name,
                    value: JSON.stringify(valueObj),
                    type: attribute.type,
                },
            });
        } else {
            setInvalidUrl(false);
            const valueObj = {
                url: '',
                provider: undefined,
                providerUid: undefined,
            };
            onChange({
                target: {
                    name,
                    value: JSON.stringify(valueObj),
                    type: attribute.type,
                },
            });
        }
    };

    const fieldLabel = intlLabel
        ? formatMessage(intlLabel)
        : formatMessage({ id: getTranslation('video-field.label'), defaultMessage: 'Video' });
    const fieldDescription = intlDescription
        ? formatMessage(intlDescription)
        : formatMessage({ id: getTranslation('video-field.title'), defaultMessage: 'Video url' });

    const fieldPlaceholder = formatMessage({
        id: getTranslation('video-field.placeholder'),
        defaultMessage: 'eg. https://vimeo.com/123456789',
    });
    const fieldErrorMessage = formatMessage({
        id: getTranslation('video-field.invalid.url'),
        defaultMessage: 'Invalid video url',
    });

    return (
        <Box>
            <Field.Root id={name} hint={fieldDescription} error={invalidUrl ? fieldErrorMessage : undefined}>
                <Field.Label>{fieldLabel}</Field.Label>
                <Field.Input
                    type="text"
                    name={name}
                    value={videoUrl}
                    onChange={onInputChange}
                    placeholder={fieldPlaceholder}
                />
                <Field.Hint />
                <Field.Error />
            </Field.Root>

            {provider && providerUid && (
                <Flex paddingTop={4} justifyContent={'center'}>
                    {provider === 'vimeo' && (
                        <iframe
                            src={`https://player.vimeo.com/video/${providerUid}`}
                            frameBorder={0}
                            allowFullScreen
                            height={200}
                        ></iframe>
                    )}
                    {provider === 'youtube' && (
                        <iframe
                            src={`https://www.youtube.com/embed/${providerUid}`}
                            frameBorder={0}
                            allowFullScreen
                            height={200}
                        ></iframe>
                    )}
                    {provider === 'facebook' && (
                        <iframe
                            src={`https://www.facebook.com/plugins/video.php?href=${providerUid}&show_text=false&t=0`}
                            frameBorder="0"
                            height={200}
                            allowFullScreen
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        />
                    )}
                </Flex>
            )}
        </Box>
    );
};

export default VideoInput;
