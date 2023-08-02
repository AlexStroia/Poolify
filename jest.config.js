// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//   testRegex: "/tests/.*\\.(test|spec)\\.(ts|tsx)$",
//   transformIgnorePatterns: ["<rootDir>/node_modules/"],
// };

// jest.config.js

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testRegex: "/tests/.*\\.(test|spec)\\.(ts|tsx)$",
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
