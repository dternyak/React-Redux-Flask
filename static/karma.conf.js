module.exports = function (config) {
    config.set({
        basePath: 'src',
        singleRun: true,
        frameworks: ['mocha'],
        reporters: ['dots'],
        browsers: ['Chrome'],
        files: [
            'test/**/*.spec.js',
        ],
        preprocessors: {
            'test/**/*.spec.js': ['webpack'],
        },
        webpack: {
            resolve: {
                extensions: ['', '.js', '.ts'],
                modulesDirectories: ['node_modules', 'src'],
            },
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel-loader',
                }],
            },
        },
        webpackMiddleware: {
            stats: {
                color: true,
                chunkModules: false,
                modules: false,
            },
        },
    });

};
