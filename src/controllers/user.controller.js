import { asyncHandler } from '../utils/asyncHandler.js';
import { log } from 'console';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

/**
 *
 * REGISTER USER :
 *      1. get user details from frontend.
 *      2. Validation on the values. (like - not empty, etc.)
 *      3. check if user already exists. (using - username, email)
 *      4. check for coverImage, check for avatar.
 *          4.1 upload them on cloudinary. save the reference link.
 *          4.2 check if avatar is uploaded on cloudinary or not. First check if multer upload was successful or not.
 *              then check if cloudinary upload was successful or not.
 *      5. create a new user Object, create entry in DB.
 *      6. remove password and refresh token field from mongoDB response.
 *      7. check for user creation.
 *      8. return response (SUCCESS or ERROR).
 *
 */

const registerUser = asyncHandler(async (req, res) => {
    // 1. get user details from frontend. ( if data is coming via FORM or JSON) then 'req.body'.
    const { fullName, email, username, password } = req.body;
    log('email:', email);

    // 2. Validation on the values. (like - not empty, etc.)
    if (
        [fullName, email, username, password].some(
            (field) => field?.trim() === ''
        )
    ) {
        throw new ApiError(400, 'All fields are required.');
    }

    // 3. check if user already exists. (using - username, email)
    const existedUser = User.findOne({
        $or: [{ username }, { email }],
    });
    if (!existedUser) {
        throw new ApiError(409, 'User with username and email already exists.');
    }

    // 4. check for coverImage, check for avatar.
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, 'Avatar file is required.');
    }
    // 4.1
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if (!avatar) {
        throw new ApiError(400, 'Avatar file is required.');
    }

    // 5. create a new user Object, create entry in DB.
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || '',
        email,
        password,
        username: username.toLowerCase(),
    });

    // 6. remove password and refresh token field from mongoDB response.
    const createdUser = await User.findById(user._id).select(
        '-password -refreshToken'
    ); // to check if 'user' entry was done or not.

    // 7. check for user creation.
    if (!createdUser) {
        throw new ApiError(
            500,
            'Something went wrong while registering the User.'
        );
    }

    // 8. return response (SUCCESS or ERROR).
    return res
        .status(201)
        .json(
            new ApiResponse(200, createdUser, 'User registered Succesfully.')
        );

    res.status(201).json({
        message: 'OK',
    });
});

export { registerUser };
