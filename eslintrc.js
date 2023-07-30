module.exports = {
  // Your other ESLint configurations here
  overrides: [
    {
      files: ["*.js", "*.jsx"], // Add more file patterns if needed
      rules: {
        "react-hooks/exhaustive-deps": "off",
      },
    },
  ],
};
