import express from 'express';
import { register, login, logout, updateProfile } from '../controllers/auth.controllers.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import {arcjetProtection}  from '../middlewares/arcjet.middleware.js';

const router = express.Router();

router.use(arcjetProtection); // Apply Arcjet protection middleware to all routes in this router

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);  


router.post('/update-profile', protectRoute, updateProfile);    

router.get('/check', protectRoute, (req, res) => {
    res.status(200).json({ message: "User is authenticated", user: req.user });
});

export default router;