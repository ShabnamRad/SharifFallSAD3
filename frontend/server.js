const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
const express = require('express');
const stormpath = require('express-stormpath');
const bodyParser = require('body-parser');

const app = express();

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(stormpath.init(app, {
    web: {
        produces: ['application/json']
    }
}));

app.get('/css/bootstrap.min.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'build/css/bootstrap.min.css'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.on('stormpath.ready', function () {
    app.listen(3000, 'localhost', function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('Listening at http://localhost:3000');
    });
});