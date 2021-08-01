module.exports = {
    presets: [[
        '@vue/cli-plugin-babel/preset',
        {
            modules: false
        }
    ]],
    env: {
        test: {
            presets: [[
                '@vue/cli-plugin-babel/preset',
                {
                    targets: {
                        node: 'current'
                    }
                }
            ]]
        }
    }
}
