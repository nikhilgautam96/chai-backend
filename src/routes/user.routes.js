import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();
router.route('/register').post(
    upload.fields([
        {
            // In frontend the field should be named as 'avatar'. communicate b/w frontend and backend engineers.
            name: 'avatar',
            maxCount: 1,
        },
        {
            name: 'coverImage', // In frontend the field should be named as 'coverImage'.
            maxCount: 1,
        },
    ]),
    registerUser
);

export default router;
