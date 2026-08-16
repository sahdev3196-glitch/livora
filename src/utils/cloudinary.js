/**
 * Cloudinary Frontend Helper Utilities for LIVORA
 * Cloud Name: nslcfmss
 */

export const CLOUDINARY_CONFIG = {
  cloudName: 'nslcfmss',
  baseUrl: 'https://res.cloudinary.com/nslcfmss/image/upload'
};

/**
 * Returns an optimized Cloudinary URL for any image.
 * If given a full Cloudinary URL, applies quality/format parameters.
 * If given a relative path or remote URL, returns an auto-fetching or transformed URL.
 */
export function buildCloudinaryUrl(publicIdOrUrl, options = {}) {
  if (!publicIdOrUrl) return '';

  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = options;

  const transforms = [];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width || height) transforms.push(`c_${crop}`);
  transforms.push(`q_${quality}`);
  transforms.push(`f_${format}`);

  const transformString = transforms.join(',');

  // If already a Cloudinary URL
  if (publicIdOrUrl.includes('res.cloudinary.com')) {
    return publicIdOrUrl.replace('/upload/', `/upload/${transformString}/`);
  }

  // If publicId without full URL
  if (!publicIdOrUrl.startsWith('http') && !publicIdOrUrl.startsWith('/')) {
    return `${CLOUDINARY_CONFIG.baseUrl}/${transformString}/${publicIdOrUrl}`;
  }

  // Otherwise return original URL or relative asset path
  return publicIdOrUrl;
}

/**
 * Upload image to server backend which proxies to Cloudinary
 */
export async function uploadToCloudinary(fileOrBase64, folder = 'livora_wallpapers') {
  try {
    let payload = fileOrBase64;
    
    if (fileOrBase64 instanceof File) {
      payload = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(fileOrBase64);
      });
    }

    const response = await fetch('/api/cloudinary/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image: payload, folder })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Frontend uploadToCloudinary failed:', error);
    return { success: false, error: error.message };
  }
}
