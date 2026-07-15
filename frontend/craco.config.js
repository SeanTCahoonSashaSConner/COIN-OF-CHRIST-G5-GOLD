// craco.config.js
const WebpackHealthPlugin = require('./plugins/health-check/webpack-health-plugin');
const setupHealthEndpoints = require('./plugins/health-check/health-endpoints');

// Enable health check plugin/endpoints (dev server only).
const config = {
  enableHealthCheck: true,
};

// Single shared plugin instance so the dev server endpoints can read its status.
const healthPluginInstance = config.enableHealthCheck
  ? new WebpackHealthPlugin()
  : null;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add health check plugin to webpack if enabled
      if (config.enableHealthCheck && healthPluginInstance) {
        webpackConfig.plugins.push(healthPluginInstance);
      }
      return webpackConfig;
    },
  },
  devServer: (devServerConfig) => {
    // Add health check endpoints if enabled
    if (config.enableHealthCheck && healthPluginInstance) {
      const originalSetupMiddlewares = devServerConfig.setupMiddlewares;

      devServerConfig.setupMiddlewares = (middlewares, devServer) => {
        // Call original setup if exists
        if (originalSetupMiddlewares) {
          middlewares = originalSetupMiddlewares(middlewares, devServer);
        }

        // Setup health endpoints
        setupHealthEndpoints(devServer, healthPluginInstance);

        return middlewares;
      };
    }

    return devServerConfig;
  },
};
