import loggerUtil, { themes } from "@utils/logger.util";
import config from "config";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { JwtPayload } from "jsonwebtoken";
import UserModel from "@models/user.model";

const passportSetup = () => {
  /**
   * JWT Strategy Configuration
   */

  if (config.has("jwt.secret")) {
    const jwtSecret = config.get<string>("jwt.secret");

    passport.use(
      new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: jwtSecret,
        },
        async function (jwtPayload: JwtPayload, done) {
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

export default passportSetup;
