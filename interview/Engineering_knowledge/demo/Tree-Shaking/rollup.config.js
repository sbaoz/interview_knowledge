import {babel} from '@rollup/plugin-babel'
import {uglify} from 'rollup-plugin-uglify'

export default {
    input: 'src/main.js',
    treeshake: true,
    output: {
        file: 'dist/rollup.bundle.js',
        format: 'cjs'
    },
    plugins: [
        babel(),
        uglify()
    ]
}
