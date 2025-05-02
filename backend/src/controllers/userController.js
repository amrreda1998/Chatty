import User from '../models/userModel.js';
import cloudinary from '../lib/cloudinary.js';
import validator from 'validator';
import fs from 'fs/promises';

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const userId = req.user._id;

    // Get current user with select optimization
    const user = await User.findById(userId).select(
      'fullName email profilePic'
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Handle profile picture upload first
    if (req.file) {
      try {
        // Delete old profile picture if exists
        if (user.profilePic) {
          const publicId = user.profilePic.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(`chat_profile_pics/${publicId}`);
        }

        const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
          folder: 'chat_profile_pics',
          resource_type: 'auto',
          allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
        });

        user.profilePic = uploadResponse.secure_url;

        // Clean up temporary file
        await fs.unlink(req.file.path);
      } catch (error) {
        // Attempt to clean up temporary file on error
        try {
          await fs.unlink(req.file.path);
        } catch (unlinkError) {
          console.error('Error deleting temporary file:', unlinkError);
        }

        console.error('Profile picture upload error:', error);
        return res.status(400).json({
          success: false,
          message: 'Error uploading profile picture',
          error:
            process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
      }
    }

    // Update user fields if provided
    if (fullName) {
      const sanitizedFullName = fullName.trim();
      if (!validator.isLength(sanitizedFullName, { min: 3, max: 50 })) {
        return res.status(400).json({
          success: false,
          message: 'Full name must be between 3 and 50 characters',
        });
      }
      user.fullName = sanitizedFullName;
    }

    if (email) {
      const sanitizedEmail = email.toLowerCase().trim();
      if (!validator.isEmail(sanitizedEmail)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format',
        });
      }

      const emailExists = await User.findOne({
        email: sanitizedEmail,
        _id: { $ne: userId },
      }).select('_id');

      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use',
        });
      }
      user.email = sanitizedEmail;
    }

    await user.save();

    // Return updated user with selected fields only
    const updatedUser = await User.findById(userId).select(
      'fullName email profilePic createdAt updatedAt'
    );

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error in updateProfile:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
