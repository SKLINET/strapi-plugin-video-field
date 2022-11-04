"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "video",
    plugin: "video-field",
    type: "json",
  });
};
