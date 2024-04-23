export const MAX_FILE_SIZE = 1000000;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/octet-stream"];

export async function urlToFile(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();

  const fileName = url.substring(url.lastIndexOf("/") + 1);

  const mimeType = blob.type;

  return new File([blob], fileName, { type: mimeType });
}
