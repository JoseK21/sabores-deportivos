import { deleteApi } from "@/lib/api";

export const deleteBlobFile = async (fileUrl: string) => {
  try {
    const deletedBlobFile = await deleteApi(`/api/images/upload?fileurl=${fileUrl}`);

    return deletedBlobFile;
  } catch (error) {
    console.log("🚀 >>  deleteBlobFile >>  error:", error);

    return { isError: true, error };
  }
};
