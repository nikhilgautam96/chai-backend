import mongoose, { Schema, model } from 'mongoose';

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // Cloudnary URL
            required: true,
        },
        thumbNail: {
            type: String,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number, // from Cloudnary
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export const Video = new model('Video', videoSchema);
