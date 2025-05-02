import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
config();
cloudinary.config({
  cloud_name: process.env.Cloudinary_Name,
  api_key: process.env.Cloudinary_Api_Key,
  api_secret: process.env.Cloudinary_API_Secret,
});

export default cloudinary;
