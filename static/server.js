var http = require('http');
var express = require('express'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});

var app = express();

app.use(require('morgan')('short'));

(function initWebpack() {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack/common.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));

  app.use(express.static(__dirname + '/'));
})();

app.all(/^\/api\/(.*)/, function api(req, res) {
    proxy.web(req, res, { target: 'http://localhost:5000' });
});

app.get(/.*/, function root(req, res) {
  res.sendFile(__dirname + '/index.html');
});




const server = http.createServer(app);
server.listen(process.env.PORT || 3000, function onListen() {
  const address = server.address();
  console.log('Listening on: %j', address);
  console.log(' -> that probably means: http://localhost:%d', address.port);
});
