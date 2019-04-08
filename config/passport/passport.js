var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport, user) {

    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'login',
            passwordField: 'password',
            passReqToCallback: true
        },


        function (req, login, password, done) {
            var User = user;
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }

            User.findOne({
                where: {
                    Login: login
                }
            }).then(function (user) {

                if (!user) {

                    return done(null, false, {
                        message: 'Email does not exist'
                    });

                }
                
                if (!isValidPassword(user.Haslo, password)) {

                    return done(null, false, {
                        message: 'Incorrect password.'
                    });

                }

                var userinfo = user.get();
                module.exports = { userLogin: user.Login };
                return done(null, userinfo);


            }).catch(function (err) {

                console.log("Error:", err);

                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            });
        }

    ));

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'login',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },


        function (req, login, password, done) {
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };


            User.findOne({
                where: {
                    Login: login
                }
            }).then(function (user) {
                if (user) {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else{
                    var userPassword = generateHash(password);
                    var data =
                    {
                        Haslo: userPassword,
                        Login: req.body.login
                    };

                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }

                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.IdKontoDomenowe);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                module.exports = { userLog: user.Login };
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
}

