import express from 'express';
import { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners } from '../controllers/message.controllers.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

// the middleware is applied to all routes in this router, so all routes will require authentication

router.use(arcjetProtection, protectRoute); // Apply Arcjet protection middleware to all routes in this router

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post('/send/:id', sendMessage);

export default router;