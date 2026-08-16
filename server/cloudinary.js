import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'nslcfmss',
  api_key: process.env.CLOUDINARY_API_KEY || '813653695963947',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'Od8QMCbiqZvd32Wg3mJtX9sI25k',
  secure: true
});

/**
 * Upload an image file or base64 / remote URL to Cloudinary
 * @param {string} imagePath - File path, base64 string, or remote HTTP URL
 * @param {object} options - Optional Cloudinary upload options
 */
export async function uploadImageToCloudinary(imagePath, options = {}) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'livora_wallpapers',
      use_filename: true,
      unique_filename: true,
      resource_type: 'auto',
      ...options
    });
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message || 'Failed to upload image to Cloudinary'
    };
  }
}

/**
 * Generate optimized Cloudinary image URL with dynamic transformations
 */
export function getOptimizedImageUrl(publicIdOrUrl, options = {}) {
  if (!publicIdOrUrl) return '';
  if (publicIdOrUrl.includes('res.cloudinary.com')) {
    return publicIdOrUrl;
  }
  const { width = 800, quality = 'auto', format = 'auto' } = options;
  return cloudinary.url(publicIdOrUrl, {
    width,
    crop: 'scale',
    quality,
    fetch_format: format,
    secure: true
  });
}

export default cloudinary;
