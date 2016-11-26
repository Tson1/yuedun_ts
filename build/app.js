var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var moment = require('moment');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var connection = require('./models/connection');
connection.getConnect();
var settins = require('./settings');
var mongodb = settins.mongodb;
(require('./utils/cron'))();
var admin = require('./routes/admin');
var blog = require('./routes/blogAction');
var weixin = require('./routes/weixinAction');
var duoshuo = require('./routes/duoshuo');
var index2 = require('./routes/index2');
var message = require('./routes/message');
const viewerLog_1 = require('./utils/viewerLog');
const cover_1 = require('./utils/cover');
var app = express();
const cover = new cover_1.default(app);
var store = new MongoStore({
    interval: 60000,
    mongooseConnection: connection.mongoose.connection
});
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(favicon(path.join(__dirname, 'public/images/favicon2.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '3mb'
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: mongodb.cookieSecret,
    store: store,
    resave: true,
    saveUninitialized: true
}));
app.use('/*', function (req, res, next) {
    if (req.originalUrl.indexOf('/admin') === -1) {
        viewerLog_1.default(req);
    }
    next();
});
cover.registerRouters();
app.use('/admin', function (req, res, next) {
    if (req.cookies['autologin']) {
        next();
        return;
    }
    if (!req.session.user) {
        if (req.url == "/doLogin") {
            next();
            return;
        }
        res.render('admin/login');
    }
    else if (req.session.user) {
        next();
    }
});
app.use('/admin', admin);
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    next(err);
});
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
//# sourceMappingURL=app.js.map