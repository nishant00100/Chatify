import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

export const getAllContacts = async (req, res) => {
    try{

        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);

    } catch(err){
        console.log("Error fetching contacts:", err);
        res.status(500).json({ message: "Error fetching contacts" });
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;  // id of the user to chat with

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });

        res.status(200).json(messages);

    } catch (err) {
        console.log("Error fetching messages:", err);
        res.status(500).json({ message: "Error fetching messages" });
    }

}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;

        const { id: receiverId } = req.params;

        const senderId = req.user._id;

        let imageUrl;
        if(image){
            // upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });
        await newMessage.save();  // or we can use Message.create({senderId, receiverId, text, image: imageUrl})

        // send the message to the receiver using Socket.IO

        res.status(201).json(newMessage);

    } catch (err) {
        console.log("Error sending message:", err);
        res.status(500).json({ message: "Error sending message" });
    }
}


export const getChatPartners = async (req, res) => {
    try{

        const loggedInUserId = req.user._id;

        // Find all messages where the logged-in user is either the sender or receiver

        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        });

        const chatPartnerIds = [
            ...new Set(messages.map(msg => msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId : msg.senderId)),
        ];

        const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

        res.status(200).json(chatPartners);

    } catch(err){
        console.log("Error fetching chat partners:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}