const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  // if (phase === PHASE_DEVELOPMENT_SERVER) {
  //   return {
  //     /* development only config options here */
  //   };
  // }

  return {
    assetPrefix: '/base',
    useFileSystemPublicRoutes: false,
    env: {
      githubToken: process.env.GITHUB_GRAPH_API_TOKEN,
    },
    target: 'server',
    reactStrictMode: true,
    experimental: {
      granularChunks: true,
      modern: false,
      plugins: false,
      profiling: false,
      sprFlushToDisk: true,
      reactMode: 'legacy',
      workerThreads: false,
      basePath: '',
      pageEnv: false,
      productionBrowserSourceMaps: false,
      optionalCatchAll: false,
    },
  };
};
