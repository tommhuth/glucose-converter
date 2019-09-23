module.exports = {
    presets: [
        "@babel/preset-react",
        [
            "@babel/preset-env",
            {
                targets: "last 2 version, not < 0.2%, not ie 10, not ie 9, ie 11, not dead, not android < 5, safari 11",
                debug: true,
                useBuiltIns: "usage",
                corejs: { version: 3, proposals: true }
            }
        ]
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties"
    ]
}