import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from "../models/User.js"
import { config } from 'dotenv';
import { randomBytes } from 'crypto';
import { createTransport } from 'nodemailer';

config();

export const send2FACode = async (user) => {
  const twoFactorCode = randomBytes(3).toString('hex');
  user.twoFactorCode = twoFactorCode;
  // await user.save();

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Your 2FA Code',
    text: `Your 2FA code is: ${twoFactorCode}`
  };

  await transporter.sendMail(mailOptions);
};

const transporter = createTransport({
  service: 'Gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

export default function configurePassport() {
  // Serialize user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from the session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Google OAuth Strategy
  passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
  },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const { state } = req.query;
        let user = await User.findOne({ email: profile.emails[0].value });
        let image = await User.findOne({ email: profile.photos[0].value });


        console.log(state, 'this is the profile');


        if (user) {
          if (!user.google || !user.google.id) {
            user.google = {
              id: profile.id,
              email: profile.emails[0].value
            };
            await user.save();
          }
          return done(null, user);
        }



        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          google: {
            id: profile.id,
            email: profile.emails[0].value
          },
          isVerified: false,
          twoFactorCode: '',
          phoneNumber: '',
          user: state,
          isApproved: state === 'buyer' || '"buyer"' ? true : false,
          images: profile.photos[0].value,
          password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
        });



        send2FACode(newUser);

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        console.error('Google Strategy Error:', error);
        return done(error, null);
      }
    }
  ));

  // Facebook OAuth Strategy
  passport.use('facebook', new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL || "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name', 'displayName'],
    passReqToCallback: true
  },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const { state } = req.query;
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          if (!user.facebook || !user.facebook.id) {
            user.facebook = {
              id: profile.id,
              email: profile.emails[0].value
            };
            console.log(user.facebook.email);
            await user.save();
          }
          return done(null, user);
        }

        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          facebook: {
            id: profile.id,
            email: profile.emails[0].value
          },
          isVerified: false,
          twoFactorCode: '',
          phoneNumber: '',
          user: state,
          images: profile.photos[0].value,
          password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
        });

        send2FACode(newUser);



        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        console.error('Facebook Strategy Error:', error);
        return done(error, null);
      }
    }
  ));

  // Error handler middleware
  passport.use('error', (err, req, res, next) => {
    console.error('Passport Error:', err);
    res.status(500).json({ error: 'Authentication error occurred' });
  });
}

// Helper function to ensure authentication
export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Please log in to access this resource' });
};

// Helper function to handle authentication errors
export const handleAuthError = (err, req, res, next) => {
  console.error('Authentication Error:', err);
  res.status(500).json({ error: 'Authentication error occurred' });
};

// Helper function to send 2FA code via email
