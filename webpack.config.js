module.exports = {
  // ... other Webpack configurations ...

  // Add this configuration to ignore the specific warning
  ignoreWarnings: [
    {
      module: /@firebase\/auth\/dist\/auth\.esm\.js/,
      message: /Failed to parse source map/,
    },
  ],
};
