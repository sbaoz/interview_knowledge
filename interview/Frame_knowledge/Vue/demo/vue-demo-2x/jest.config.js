module.exports = {
    testEnvironment: "jsdom",
    moduleFileExtensions: [
        "js",
        "json",
        "vue"
    ],
    transform: {
        "\\.vue?$": "vue-jest",
        "\\.js?$": "babel-jest"
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{js,vue}",
        "!**/node_modules/**"
    ],
    coverageReporters: [
        "html",
        "text-summary"
    ],
    snapshotSerializers: ["jest-serializer-vue"]

}
