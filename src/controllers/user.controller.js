import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;
  console.log(email);
  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError("All fields are required", 400);
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError("User with email or username already exists", 409);
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log(avatarLocalPath);
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  console.log(coverImageLocalPath);
  if (!avatarLocalPath) {
    throw new ApiError("Avatar is required", 400);
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    username: username.toLowerCase(),
    password
  });
  const CreatedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!CreatedUser) {
    throw new ApiError("Something went wrong While Registering User", 500);
  }

  return res
    .status(201)
    .json(new ApiResponse(200, CreatedUser, "User Registered Successfully"));
});

export { registerUser };
