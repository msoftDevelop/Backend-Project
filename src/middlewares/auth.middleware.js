import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.Header("Authorization")?.replace("Bearer ", "");

  try {
    if (!token) {
      throw new ApiError(401, "You are  unauthorized");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEM_SECRET);
    const user = await User.findbyId(decodedToken._id).select(
      "-password",
      "-refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "InValid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "InValid Access Token");
  }
});
