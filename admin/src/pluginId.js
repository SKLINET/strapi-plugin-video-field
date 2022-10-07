import pluginPkg from "../../package.json";

const pluginId = pluginPkg.name.replace(/^(@sklinet\/strapi-)plugin-/i, "");

export default pluginId;
