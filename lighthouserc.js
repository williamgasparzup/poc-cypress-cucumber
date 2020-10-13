module.exports = {
  ci: {
    upload: {
      target: 'temporary-public-storage',
    },
    collect: {
      staticDistDir: './public',
      isSinglePageApplication: true,
    }
  },
};
