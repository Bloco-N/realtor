const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")

const GOOGLE_CLIENT_ID = "1095655495339-ssaqalutrubbkppoma540il8ehcpvpm1.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("Profile")
    console.log(profile)
    done(null,profile)
  }
));

passport.serializeUser((user,done)=>{
    console.log("serialize")
    done(null,user)
})

passport.deserializeUser((user,done)=>{
  console.log("deserialize")
    done(null,user)
})