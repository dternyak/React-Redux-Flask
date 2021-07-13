const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const {merge} = require('webpack-merge');

const development = require('./dev.config');
const production = require('./prod.config');

require('babel-polyfill').default;

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, '../src'),
    build: path.join(__dirname, '../dist'),
};

process.env.BABEL_ENV = TARGET;

const common = {
    entry: [
        PATHS.app,
    ],

    output: {
        path: PATHS.build,
        filename: 'bundle.js',
    },

    resolve: {
        extensions: ['', '.jsx', '.js', '.json', '.scss'],
        modules: ['node_modules', PATHS.app],
    },

    infrastructureLogging: {
        level: 'verbose',
    },

    module: {
        rules: [
        //     {
        //     test: /bootstrap-sass\/assets\/javascripts\//,
        //     use: [
        //         {
        //             loader: 'imports-loader',
        //         }
        //     ]
        // }, 
        {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {limit: 10000, mimetype: 'application/font-woff'}
                }
            ]
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {limit: 10000, mimetype: 'application/font-woff2'}
                }
            ]
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {limit: 10000, mimetype: 'application/font-woff'}
                }
            ]
        }, {
            test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {limit: 10000, mimetype: 'application/font-otf'}
                }
            ]
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'file-loader',
                }
            ]
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {limit: 10000, mimetype: 'application/svg+xml'}
                }
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader'
                }
            ]
        }, {
            test: /\.png$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {name: '[name].[ext]'}
                }
            ]
        }, {
            test: /\.jpg$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {name: '[name].[ext]'}
                }
            ]
        }],
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: (webpack) => (
                    [
                        autoprefixer({
                            browsers: ['last 2 versions'],
                        }),
                        postcssImport({
                            addDependencyTo: webpack,
                        }),
                    ]
                ),
            }
        })
    ]

};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(development, common);
}

if (TARGET === 'build' || !TARGET) {
    module.exports = merge(production, common);
}
