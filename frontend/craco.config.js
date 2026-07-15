const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      // Levels the playing field by removing the rigid case-checking plugin
      webpackConfig.plugins = webpackConfig.plugins.filter(
        (plugin) => plugin.constructor.name !== 'CaseSensitivePathsPlugin'
      );
      return webpackConfig;
    }
  },
  style: {
    postcss: {
      plugins: [],
    },
  },
};
