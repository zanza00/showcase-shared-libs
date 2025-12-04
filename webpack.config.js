const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "showcase",
    projectName: "shared-libs",
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  console.log(defaultConfig);

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
};
