const getVideoProviderAndUid = (url) => {
    if (url.includes("vimeo")) {
        const regExp =
            /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
        const match = url.match(regExp);
        if (match && match[5]) {
            return {
                provider: "vimeo",
                providerUid: match[5],
            };
        }
    }
    if (url.includes("youtube")) {
        const regExp =
            /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\/)|(\?v=|\&v=))([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[8].length == 11) {
            return {
                provider: "youtube",
                providerUid: match[8],
            };
        }
    }
    if (url.includes("facebook")) {
        return {
            provider: "facebook",
            providerUid: url,
        };
    }
};

export default getVideoProviderAndUid;
