export function extractPhotos(photoURL) {
  // Remove 'public' prefix if it exists
  let processedURL = photoURL.startsWith('public') ? photoURL.substring(6) : photoURL;
  
  // Remove leading slash if it exists
  processedURL = processedURL.startsWith('/') ? processedURL.substring(1) : processedURL;
  
  // Replace spaces and underscores with %20
  const encodedURL = processedURL.replace(/[\s]/g, '%20');
  return `https://wnkzwrltiupurxawgqyn.supabase.co/storage/v1/object/public/Hello%20Tractor/${encodedURL}`;
}
