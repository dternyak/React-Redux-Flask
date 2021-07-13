const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    devtool: 'eval-cheap-module-source-map',
    entry: [
        // 'bootstrap-loader',
        'webpack-hot-middleware/client',
        './src/index',
    ],
    output: {
        publicPath: '/dist/',
    },

    module: {
        rules: [{
            test: /\.(scss)$/,
            use: [{
              // inject CSS to page
              loader: 'style-loader'
            }, {
              // translates CSS into CommonJS modules
              loader: 'css-loader'
            }, {
              // Run postcss actions
              loader: 'postcss-loader',
              options: {
                // `postcssOptions` is needed for postcss 8.x;
                // if you use postcss 7.x skip the key
                postcssOptions: {
                  // postcss plugins, can be exported to postcss.config.js
                  plugins: function () {
                    return [
                      require('autoprefixer')
                    ];
                  }
                }
              }
            }, {
              // compiles Sass to CSS
              loader: 'sass-loader'
            }]
        }],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            },
            __DEVELOPMENT__: true,
        }),
        new MiniCssExtractPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
        }),
    ],
};
