var express = require('express');
var app = express();
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var path = require('path');
var authController = require(__dirname + '/controllers/authController.js');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var models = require("./models");

var authRoute = require('./routes/auth.js')(app, passport);
var siteRoute = require('./routes/site.js')(app, passport);
var hrRoute = require('./routes/hr.js')(app, passport);
var fixedAssetsRoute = require('./routes/fixedAssets.js')(app, passport);
var companyRoute = require('./routes/company.js')(app, passport);
var productionRoute = require('./routes/production.js')(app, passport);
var emailsRoute = require('./routes/emails.js')(app, passport);
var profileRoute = require('./routes/profile.js')(app, passport);
var proposalsRoute = require('./routes/proposals.js')(app, passport);
var clientsRoute = require('./routes/clients.js')(app, passport);
var permissionRoute = require('./routes/permission.js')(app, passport);

app.get('/', authController.signin);

require('./config/passport/passport.js')(passport, models.konta_domenowe);

//Sync Database
models.sequelize.sync().then(function () {
    console.log('Nice! Database looks fine')
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(5000, function (err) {
    if (!err)
        console.log("Site is live");
    else console.log(err)
});