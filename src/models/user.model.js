import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true, // to  make this field seachable.
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true, // to  make this field seachable.
        },
        avatar: {
            type: String, // url string :
            required: true,
        },
        coverImage: {
            type: String, // url string :
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        watchHistory: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

export const User = new model('User', userSchema);
