import { v2 as cloudinary } from 'cloudinary';

// Only configure if environment variables are set
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else {
  console.warn('Warning: Cloudinary credentials are not set. Image upload features will not work.');
}

export default cloudinary;

/**
 * Upload image to Cloudinary
 * @param {Buffer} buffer - Image buffer
 * @param {string} folder - Folder path in Cloudinary (optional)
 * @returns {Promise<Object>} Upload result with secure_url
 */
export async function uploadImage(buffer, folder = 'aniflux') {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(buffer);
  });
}

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Public ID of the image
 * @returns {Promise<Object>} Delete result
 */
export async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
}
