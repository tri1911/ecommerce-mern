import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import passport from "passport";
import { Role } from "@models/user.model";
import { userInRequestSchema } from "@schemas/user.schema";

/**
 * Routes that use this `authorize` middleware are restricted to authenticated users
 * - If the role is included (e.g. authorize(Role.Admin)) then the route is restricted to users in the specified role / roles
 * - Otherwise if the role is not included (e.g. authorize()) then the route is restricted to all authenticated users regardless of role
 * - Routes that don't use the authorize middleware are publicly accessible
 */

const authorize = (...roles: Role[]) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return [
    // authenticate JWT token and attach user to request object (req.user)
    passport.authenticate("jwt", { session: false }),
    // authorize based on user role
    asyncHandler((req: Request, res: Response, next: NextFunction) => {
      const { role: userRole } = userInRequestSchema.parse(req.user);
      if (roles.length && !roles.includes(userRole)) {
        // user's role is not authorized
        res.status(403).json({ message: "Unauthorized" });
      }
      // authentication and authorization successful
      next();
    }),
  ];
};

export default authorize;
