import express from "express";
import passport from "passport";
import authControllers from "@controllers/auth.controller";

const router = express.Router();

router.post("/local", authControllers.userLogin);
router.post("/register", authControllers.userSignUp);

// initiate the OpenID authentication
router.get(
  "/google",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// the OpenID Provider responds to the prior authentication request
router.get(
  "/google/callback",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  authControllers.googleCallbackHandler
);

router.get(
  "/facebook",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  passport.authenticate("facebook", { scope: ["public_profile", "email"] })
);

router.get(
  "/facebook/callback",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/login",
  }),
  authControllers.facebookCallbackHandler
);

export default router;
