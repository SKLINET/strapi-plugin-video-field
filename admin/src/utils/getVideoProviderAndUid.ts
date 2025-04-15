const getVideoProviderAndUid = (url: string) => {
  if (url.includes("vimeo")) {
    const regExp =
      /^https?:\/\/(?:www\.)?vimeo\.com\/(?:(?:channels\/[\w]+\/)|(groups\/[\w]+\/videos\/))?(\d+)(?:\/([\w]+))?/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return {
        provider: "vimeo",
        providerUid: match[1],
        privacyHash: match[2] || null,
      };
    }
  }

  if (url.includes("youtube") || url.includes("youtu.be")) {
    const standardRegExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\/)|(\?v=|\&v=))([^#\&\?]{11}).*/;
    const shortRegExp = /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/;

    const standardMatch = url.match(standardRegExp);
    if (standardMatch && standardMatch[8].length === 11) {
      return {
        provider: "youtube",
        providerUid: standardMatch[8],
      };
    }

    const shortsMatch = url.match(shortRegExp);
    if (shortsMatch && shortsMatch[1]) {
      return {
        provider: "youtube",
        providerUid: shortsMatch[1],
      };
    }
  }

  if (url.includes("facebook")) {
    return {
      provider: "facebook",
      providerUid: url,
    };
  }

  return null;
};

export { getVideoProviderAndUid };
