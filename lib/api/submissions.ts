interface FileUpload {
  file: File;
  fieldName: string;
}

interface UploadedFile {
  key: string;
  filename: string;
  contentType: string;
}

export async function uploadFile(
  file: File,
  fieldName: string,
  competition: "dare-nigeria" | "sme-pitch"
): Promise<UploadedFile> {
  // Get presigned URL
  const response = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    throw new Error(error.error || "Failed to get upload URL");
  }

  const { uploadUrl, key } = await response.json();

  // Upload file to R2
  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!uploadResponse.ok) {
    throw new Error("Failed to upload file");
  }

  return {
    key,
    filename: file.name,
    contentType: file.type,
  };
}

export async function uploadFiles(
  files: FileUpload[],
  competition: "dare-nigeria" | "sme-pitch"
): Promise<Record<string, UploadedFile>> {
  const uploadedFiles: Record<string, UploadedFile> = {};

  for (const { file, fieldName } of files) {
    if (file) {
      uploadedFiles[fieldName] = await uploadFile(file, fieldName, competition);
    }
  }

  return uploadedFiles;
}

export async function submitDareNigeriaApplication(
  formData: Record<string, unknown>,
  files?: Record<string, UploadedFile>
): Promise<{ success: boolean; applicationId?: string; error?: string }> {
  const response = await fetch("/api/applications/dare-nigeria", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formData, files }),
  });

  const data = await response.json();

  if (!response.ok) {
    return { success: false, error: data.error || "Submission failed" };
  }

  return { success: true, applicationId: data.applicationId };
}

export async function submitSMEPitchApplication(
  formData: Record<string, unknown>,
  files?: Record<string, UploadedFile>
): Promise<{ success: boolean; applicationId?: string; error?: string }> {
  const response = await fetch("/api/applications/sme-pitch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formData, files }),
  });

  const data = await response.json();

  if (!response.ok) {
    return { success: false, error: data.error || "Submission failed" };
  }

  return { success: true, applicationId: data.applicationId };
}
