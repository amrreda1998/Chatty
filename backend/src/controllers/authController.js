import validator from 'validator';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utlis.js';

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if all required fields are present
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Sanitize and validate inputs
    const sanitizedEmail = email.toLowerCase().trim();
    const sanitizedFullName = fullName.trim();

    // Email validation
    if (!validator.isEmail(sanitizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address',
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email: sanitizedEmail });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    // Password validation
    if (!validator.isLength(password, { min: 6, max: 40 })) {
      return res.status(400).json({
        success: false,
        message: 'Password must be between 6 and 40 characters',
      });
    }

    // Full name validation
    if (!validator.isLength(sanitizedFullName, { min: 3, max: 50 })) {
      return res.status(400).json({
        success: false,
        message: 'Full name must be between 3 and 50 characters',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      fullName: sanitizedFullName,
      email: sanitizedEmail,
      password: hashedPassword,
    });

    // Save user and generate token
    await newUser.save();
    generateToken(newUser._id, res);

    // Send success response
    return res.status(201).json({
      success: true,
      message: 'Registration successful!',
      data: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Email format validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    generateToken(user._id, res);

    // Send success response
    return res.status(200).json({
      message: 'Logged in successfully',
      data: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const logOut = async (req, res) => {
  try {
    // Clear the JWT cookie
    res.cookie('jwt', '', {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    res.status(200).json({
      message: 'Logged out successfully',
      success: true,
    });
  } catch (error) {
    console.error('Error in logout controller:', error.message);
    res.status(500).json({
      message: 'Error logging out',
      success: false,
    });
  }
};
