// controllers/user.controller.js
import path from 'path';
import fs from 'fs/promises';
import User from '../models/user.model.js';

class UserController {
  async store(req, res) {
    return res.json({message: "Test endpoint working"});
  }

  async uploadImage(req, res) {
    try {
      console.log('Files received:', req.files);
      console.log('Body received:', req.body);

      // Check if files were uploaded
      if (!req.files || !req.files.image) {
        return res.status(400).json({ 
          success: false,
          error: 'No image file was uploaded.' 
        });
      }

      const image = req.files.image;
      
      // Get user ID from request body
      const userId = req.body.userId;
      
      if (!userId) {
        return res.status(400).json({ 
          success: false,
          error: 'User ID is required.' 
        });
      }

      // Validate file type
      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedMimeTypes.includes(image.mimetype)) {
        return res.status(400).json({ 
          success: false,
          error: 'Only image files (JPEG, PNG, GIF, WebP) are allowed.' 
        });
      }

      // Validate file size (already handled by middleware, but double-check)
      if (image.size > 5 * 1024 * 1024) {
        return res.status(400).json({ 
          success: false,
          error: 'File size exceeds the limit of 5MB.' 
        });
      }

      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ 
          success: false,
          error: 'User not found.' 
        });
      }

      // Create uploads directory if it doesn't exist
      const uploadsDir = './uploads';
      try {
        await fs.access(uploadsDir);
      } catch {
        await fs.mkdir(uploadsDir, { recursive: true });
      }

      // Delete old profile picture if it exists
      if (user.profilePicture && user.profilePicture.startsWith('/uploads/')) {
        const oldImagePath = '.' + user.profilePicture;
        try {
          await fs.unlink(oldImagePath);
          console.log('Old profile picture deleted:', oldImagePath);
        } catch (error) {
          console.log('Could not delete old image:', error.message);
        }
      }

      // Generate unique filename
      const fileExtension = path.extname(image.name);
      const filename = `profile_${userId}_${Date.now()}${fileExtension}`;
      const uploadPath = path.join(uploadsDir, filename);

      // Move the file to the upload directory
      await image.mv(uploadPath);

      // Create the URL that will be accessible from the frontend
      const imageUrl = `/uploads/${filename}`;

      // Update user's profile picture in the database
      const updatedUser = await User.findByIdAndUpdate(
        userId, 
        { profilePicture: imageUrl },
        { new: true, runValidators: true }
      ).select('-password'); // Exclude password from response

      return res.status(200).json({ 
        success: true,
        message: 'Profile picture uploaded successfully',
        imageUrl: imageUrl,
        user: {
          id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          profilePicture: updatedUser.profilePicture
        }
      });

    } catch (error) {
      console.error('Error uploading file:', error);
      return res.status(500).json({ 
        success: false,
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Other controller methods...
  async index(req, res) {
    return res.json();
  }

  async create(req, res) {
    return res.json();
  }

  async show(req, res) {
    return res.json();
  }

  async edit(req, res) {
    return res.json();
  }

  async update(req, res) {
    return res.json();
  }

  async destroy(req, res) {
    return res.json();
  }

  async view(req, res) {
    return res.json();
  }

  async grid(req, res) {
    return res.json();
  }

  async form(req, res) {
    return res.json();
  }
}

export default new UserController();