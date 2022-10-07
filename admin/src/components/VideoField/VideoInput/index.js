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
    const [videoUid, setVideoUid] = useState();
    const [provider, setProvider] = useState();
    const [invalidUrl, setInvalidUrl] = useState(false);
    const { formatMessage } = useIntl();

    // Set video provider and videoUid based on input value
    useEffect(() => {
        const data = getVideoProviderAndUid(value);
        if (data) {
            setInvalidUrl(false);
            setProvider(data.provider);
            setVideoUid(data.videoUid);
        } else {
            if (value.length > 0) {
                setInvalidUrl(true);
            } else setInvalidUrl(false);
            setProvider(null);
            setVideoUid(null);
        }
    }, [value]);

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
                            value={value}
                            hint={"hello"}
                            onChange={(e) => {
                                onChange({
                                    target: {
                                        name,
                                        value: e.target.value,
                                        type: attribute.type,
                                    },
                                });
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
                    {provider && videoUid && (
                        <Flex paddingTop={4} justifyContent={"center"}>
                            {provider === "vimeo" && (
                                <iframe
                                    src={`https://player.vimeo.com/video/${videoUid}`}
                                    frameBorder={0}
                                    allowFullScreen
                                    height={200}
                                ></iframe>
                            )}
                            {provider === "youtube" && (
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoUid}`}
                                    frameBorder={0}
                                    allowFullScreen
                                    height={200}
                                ></iframe>
                            )}
                            {provider === "facebook" && (
                                <iframe
                                    src={`https://www.facebook.com/plugins/video.php?href=${videoUid}&show_text=false&t=0`}
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
