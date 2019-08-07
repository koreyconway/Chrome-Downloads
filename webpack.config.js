const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production'
    , entry: {
        main: './src/main.js'
    }
    , output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    }
    , plugins: [
        new CopyPlugin([
            { from: 'src/manifest.json', to: '.', toType: 'dir' },
            { from: 'src/icon.png', to: '.', toType: 'dir' },
            { from: 'LICENSE', to: '.', toType: 'dir' },
        ]),
    ],
}
