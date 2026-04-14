interface UploadResponse {
  uploadUrl: string;
  key: string;
  expiresIn: number;
}

interface UploadFileParams {
  file: File;
  competition: string;
  fieldName: string;
}

export async function uploadFileToR2({
  file,
  competition,
  fieldName,
}: UploadFileParams): Promise<string> {
  // Step 1: Request presigned URL from API
  const response = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      fileSize: file.size,
      competition,
      fieldName,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to generate upload URL");
  }

  const { uploadUrl, key }: UploadResponse = await response.json();

  // Step 2: Upload file to R2 using presigned URL
  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error("Failed to upload file to R2");
  }

  // Step 3: Return the file key
  return key;
}
