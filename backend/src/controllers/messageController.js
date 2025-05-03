import Message from '../models/messageModel.js';
import User from '../models/userModel.js';
import cloudinary from '../lib/cloudinary.js';
import fs from 'fs/promises';

// sendMessage controller

// Get all users except the current user
export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    // Find all users except the current user
    const users = await User.find({ _id: { $ne: currentUserId } }).select(
      '-password'
    );
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
    });
  }
};

// getAllMessages controller
export const getAllMessages = async (req, res) => {
  const { otherUserId } = req.query;
  const currentUserId = req.user._id;
  if (!otherUserId) {
    return res
      .status(400)
      .json({ message: 'You must provide a valid otherUserId' });
  }
  try {
    //Search all the database for all messages that has the 2 ids and sort by time stamp
    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: currentUserId },
      ],
    }).sort({ createdAt: 1 }); //make sure it is sorted by time

    return res.status(200).json({
      message: 'Messages successfully retrieved',
      data: messages,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

// send a message
export const sendMessage = async (req, res) => {
  const senderId = req.user._id;
  const { receiverId, text } = req.body;

  try {
    // Check if receiver exists
    const receiverExists = await User.findById(receiverId);
    if (!receiverExists) {
      // Clean up uploaded file if exists
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(400).json({
        message: 'Receiver not found',
        success: false,
      });
    }

    // Validate that at least text or image is provided
    if (!text?.trim() && !req.file) {
      return res.status(400).json({
        message: 'Please provide either text or image or both',
        success: false,
      });
    }

    let imageUrl;
    // Handle image upload if present
    if (req.file) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
          folder: 'chat_messages',
          resource_type: 'auto',
          allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
        });
        imageUrl = uploadResponse.secure_url;
        // Clean up temporary file
        await fs.unlink(req.file.path);
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        // Clean up temporary file on error
        await fs.unlink(req.file.path);
        return res.status(400).json({
          message: 'Error uploading image',
          success: false,
        });
      }
    }

    //create a message document
    const messageDoc = new Message({
      senderId,
      receiverId,
      text: text?.trim(),
      ...(imageUrl && { image: imageUrl }),
    });

    //saving to the database
    await messageDoc.save();

    return res.status(201).json({
      message: 'Message sent successfully',
      success: true,
      data: messageDoc,
    });
  } catch (error) {
    console.error('Send message error:', error);
    // Clean up uploaded file if exists on error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting temporary file:', unlinkError);
      }
    }
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false,
    });
  }
};
