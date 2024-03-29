import passport, { Profile } from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
} from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";

import loggerUtil, { themes } from "@utils/logger.util";
import config from "config";
import UserModel from "@models/user.model";
import { JwtAuthPayload } from "@schemas/user.schema";

/**
 * JWT Strategy Configuration
 */

const jwtAuthSetup = () => {
  if (config.has("jwt.secret")) {
    passport.use(
      new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: config.get<string>("jwt.secret"),
        },
        async (jwtPayload: JwtAuthPayload, done: VerifiedCallback) => {
          try {
            const user = await UserModel.findById(jwtPayload.sub, {
              email: 1,
              firstName: 1,
              lastName: 1,
              role: 1,
            }).lean();
            if (user) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          } catch (err) {
            return done(err);
          }
        }
      )
    );
  } else {
    loggerUtil.error(themes.error("JWT secret is missing!"));
  }
};

/**
 * Helper function
 */

const findOrCreate = async (profile: Profile) => {
  const { id: subject, name, emails, photos, provider } = profile;
  const email = emails && emails.length > 0 ? emails[0].value : undefined;
  const avatar = photos && photos.length > 0 ? photos[0].value : undefined;

  // check whether the user does exist in database
  const user = await UserModel.findOne({ email });

  // if user does exist, just simply return that `user` info from database
  if (user) {
    // before return, merge the google info to the existing `user` (if necessary)
    const savedProviders = user.federatedCredentials.map(
      (cred) => cred.provider
    );
    if (!savedProviders.includes(provider)) {
      user.federatedCredentials.push({ provider, subject });
      await user.save();
    }
    return user;
  }

  // otherwise, create new `user` record and save it into the database
  const savedUser = await UserModel.create({
    email,
    firstName: name?.givenName,
    lastName: name?.familyName,
    federatedCredentials: [{ provider, subject }],
    avatar,
  });

  return savedUser;
};

/**
 * Google Strategy Configuration
 */

const googleAuthSetup = () => {
  if (
    config.has("google.clientID") &&
    config.has("google.clientSecret") &&
    config.has("google.callbackURL")
  ) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: config.get<string>("google.clientID"),
          clientSecret: config.get<string>("google.clientSecret"),
          callbackURL: config.get<string>("google.callbackURL"),
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const user = await findOrCreate(profile);
            return done(null, user);
          } catch (err) {
            return done(err as Error, false);
          }
        }
      )
    );
  } else {
    loggerUtil.error(themes.error("Google keys are missing!"));
  }
};

/**
 * Facebook Strategy Configuration
 */

const facebookAuthSetup = () => {
  if (
    config.has("facebook.clientID") &&
    config.has("facebook.clientSecret") &&
    config.has("facebook.callbackURL")
  ) {
    passport.use(
      new FacebookStrategy(
        {
          clientID: config.get<string>("facebook.clientID"),
          clientSecret: config.get<string>("facebook.clientSecret"),
          callbackURL: config.get<string>("facebook.callbackURL"),
          profileFields: ["id", "emails", "photos", "name"],
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const user = await findOrCreate(profile);
            return done(null, user);
          } catch (err) {
            return done(err as Error, false);
          }
        }
      )
    );
  } else {
    loggerUtil.error(themes.error("Facebook keys are missing!"));
  }
};

const passportSetup = () => {
  jwtAuthSetup();
  googleAuthSetup();
  facebookAuthSetup();
};

export default passportSetup;
