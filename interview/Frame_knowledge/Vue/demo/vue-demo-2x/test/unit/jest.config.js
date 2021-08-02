const path = require('path');

module.exports = {
    rootDir: path.resolve(__dirname, '../../'),
    setupFiles: ['<rootDir>/test/unit/setup'],
    coverageDirectory: '<rootDir>/test/unit/coverage',
    testEnvironment: "jsdom",
    moduleFileExtensions: [
        "js",
        "json",
        "vue"
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,vue}',
        '!src/App.vue',
        '!src/main.js',
        '!src/router/index.js',
        "!**/node_modules/**"
    ],
    coverageReporters: [
        "html",
        "text-summary"
    ],
    snapshotSerializers: ["jest-serializer-vue"]
}
