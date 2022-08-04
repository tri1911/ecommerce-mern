import loggerUtil, { themes } from "@utils/logger.util";
import config from "config";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { JwtPayload } from "jsonwebtoken";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "@models/user.model";

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
        async (jwtPayload: JwtPayload, done) => {
          try {
            const user = await UserModel.findById(jwtPayload.sub);
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
 * Google OAuth 2.0 Strategy Configuration
 */

const googleAuthSetup = () => {
  if (
    config.has("google.clientID") &&
    config.has("google.clientID") &&
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
          const { id: subject, name, emails, photos, provider } = profile;
          const email =
            emails && emails.length > 0 ? emails[0].value : undefined;

          try {
            // if the email exists, merge google login info to that user record
            const user = await UserModel.findOne({
              email,
            });
            // if yes, just simply return that `user` info from database
            if (user) {
              // merge the google info to the existing `user` (if necessary)
              const savedProviders = user.federatedCredentials.map(
                (cred) => cred.provider
              );
              if (!savedProviders.includes(provider)) {
                user.federatedCredentials.push({ provider, subject });
                await user.save();
              }
              return done(null, user);
            } else {
              // otherwise, create new `user` record and save it into the database
              const savedUser = await UserModel.create({
                email,
                firstName: name?.givenName,
                lastName: name?.familyName,
                federatedCredentials: [{ provider, subject }],
                avatar:
                  photos && photos.length > 0 ? photos[0].value : undefined,
              });

              return done(null, savedUser);
            }
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

const passportSetup = () => {
  jwtAuthSetup();
  googleAuthSetup();
};

export default passportSetup;
