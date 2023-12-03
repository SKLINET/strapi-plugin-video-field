import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Stack } from "@strapi/design-system/Stack";
import { Typography } from "@strapi/design-system/Typography";
import { Flex } from "@strapi/design-system/Flex";
import {
    Field,
    FieldHint,
    FieldLabel,
    FieldInput,
} from "@strapi/design-system/Field";
import { useIntl } from "react-intl";
import { getTrad, getVideoProviderAndUid } from "../../../utils";

const VideoInput = ({
    attribute,
    error,
    intlLabel,
    labelAction,
    name,
    onChange,
    required,
    value,
}) => {
    const [providerUid, setProviderUid] = useState();
    const [provider, setProvider] = useState();
    const [videoUrl, setVideoUrl] = useState();
    const [invalidUrl, setInvalidUrl] = useState(false);
    const { formatMessage } = useIntl();

    // Load data from value on page load
    useEffect(() => {
        let initialValue;
        try {
            initialValue = JSON.parse(value);
        } catch (e) {
            initialValue = {};
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
    }, []);


    return (
        <Field name={name} id={name} error={error}>
            <Stack spacing={1}>
                <FieldLabel action={labelAction} required={required}>
                    {formatMessage(intlLabel)}
                </FieldLabel>

                <Field
                    name="videoUrl"
                    hint={formatMessage({
                        id: getTrad("video-field.title"),
                        defaultMessage: "Video url",
                    })}
                >
                    <Stack spacing={1}>
                        <FieldInput
                            type="text"
                            placeholder={formatMessage({
                                id: getTrad("video-field.placeholder"),
                                defaultMessage:
                                    "eg. https://vimeo.com/123456789",
                            })}
                            value={videoUrl}
                            onChange={(e) => {
                                setVideoUrl(e.target.value || "");
                                if (e.target.value) {
                                    const data = getVideoProviderAndUid(
                                        e.target.value
                                    );

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
                                        provider: data?.provider || "",
                                        providerUid: data?.providerUid || "",
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
                                        url: "",
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
                            }}
                        />
                        <FieldHint />
                        {invalidUrl && (
                            <Typography
                                textColor={"danger600"}
                                fontWeight={"bold"}
                                variant="pi"
                            >
                                {formatMessage({
                                    id: getTrad("video-field.invalid.url"),
                                    defaultMessage: "Invalid video url",
                                })}
                            </Typography>
                        )}
                    </Stack>
                    {provider && providerUid && (
                        <Flex paddingTop={4} justifyContent={"center"}>
                            {provider === "vimeo" && (
                                <iframe
                                    src={`https://player.vimeo.com/video/${providerUid}`}
                                    frameBorder={0}
                                    allowFullScreen
                                    height={200}
                                ></iframe>
                            )}
                            {provider === "youtube" && (
                                <iframe
                                    src={`https://www.youtube.com/embed/${providerUid}`}
                                    frameBorder={0}
                                    allowFullScreen
                                    height={200}
                                ></iframe>
                            )}
                            {provider === "dailymotion" && (
                                <iframe 
                                 type="text/html"
                                 src={`https://www.dailymotion.com/embed/video/${providerUid}`}
                                    frameBorder={0}
                                    allowFullScreen
                                    height={400}
                                ></iframe>
                            )}
                            {provider === "facebook" && (
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
                </Field>
            </Stack>
        </Field>
    );
};

VideoInput.defaultProps = {
    description: null,
    disabled: false,
    error: null,
    labelAction: null,
    required: false,
    value: "",
};

VideoInput.propTypes = {
    intlLabel: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    attribute: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.object,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    labelAction: PropTypes.object,
    required: PropTypes.bool,
    value: PropTypes.string,
};

export default VideoInput;
