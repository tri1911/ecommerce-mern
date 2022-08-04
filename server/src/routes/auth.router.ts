import express from "express";
import authControllers from "@controllers/auth.controller";
import passport from "passport";

const router = express.Router();

router.post("/login", authControllers.userLogin);
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

export default router;
