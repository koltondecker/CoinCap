const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
    new LocalStrategy(
        {
            usernameField: "username",
        },
        (username, password, done) => {
            // When a user tries to sign in this code runs
            db.User.findOne({
                userName: username,
            })
                .then((dbUser) => {
                    // If there's no user with the given username
                    if (!dbUser) {
                        return done(null, false, {
                            message: "Incorrect username.",
                        });
                    }
                    // If there is a user with the given username, but the password the user gives us is incorrect
                    // else if (!dbUser.comparePassword(password)) {
                    //   return done(null, false, {
                    //     message: "Incorrect password.",
                    //   });
                    // }
                    // If none of the above, return the user
                    return done(null, dbUser);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
// passport.serializeUser((user, cb) => {
//   cb(null, user);
// });

// passport.deserializeUser((obj, cb) => {
//   cb(null, obj);
// });

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// Exporting our configured passport
module.exports = passport;
