export default {
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "app/**/*.js",
    "!app/**/*.test.js",
    "!app/**/*.feature.test.js",
  ],
  coverageDirectory: "coverage",
  testMatch: ["**/*.feature.test.js"],
  forceExit: true,
  testTimeout: 10000,
  transform: {},
};
