import React, { useEffect, useRef, useState } from "react";
import {
  Award,
  CheckCircle2,
  Eye,
  Loader2,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import API from "../../../api/api";

interface CertificateTemplate {
  id: number;
  name: string;
  fileUrl: string;
  publicId: string;
  createdAt: string;
  updatedAt: string;
}

const Certificates: React.FC = () => {
  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const [templates, setTemplates] = useState<
    CertificateTemplate[]
  >([]);

  const [templateName, setTemplateName] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [previewTemplate, setPreviewTemplate] =
    useState<CertificateTemplate | null>(null);

  // =========================================================
  // FETCH TEMPLATES
  // =========================================================

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get(
        "/certificate/templates",
      );

      setTemplates(response.data);
    } catch (err: any) {
      console.error(
        "Failed to fetch certificate templates:",
        err,
      );

      setError(
        err.response?.data?.message ||
          "Failed to load certificate templates.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // =========================================================
  // FILE SELECTION
  // =========================================================

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setSuccess("");

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setError(
        "Only PNG and JPG/JPEG files are supported.",
      );

      return;
    }

    // Maximum 10 MB
    if (file.size > 10 * 1024 * 1024) {
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setError(
        "Certificate template must be smaller than 10 MB.",
      );

      return;
    }

    setSelectedFile(file);

    if (!templateName.trim()) {
      setTemplateName(
        file.name.replace(/\.[^/.]+$/, ""),
      );
    }
  };

  // =========================================================
  // UPLOAD
  // =========================================================

  const handleUpload = async () => {
    if (!selectedFile) {
      setError(
        "Please select a certificate template.",
      );
      return;
    }

    if (!templateName.trim()) {
      setError("Please enter a template name.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append(
        "name",
        templateName.trim(),
      );

      const response = await API.post(
        "/certificate/templates",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setSuccess(
        response.data?.message ||
          "Certificate template uploaded successfully.",
      );

      setTemplateName("");
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await fetchTemplates();
    } catch (err: any) {
      console.error(
        "Certificate template upload failed:",
        err,
      );

      setError(
        err.response?.data?.message ||
          "Failed to upload certificate template.",
      );
    } finally {
      setUploading(false);
    }
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (
    template: CertificateTemplate,
  ) => {
    const confirmed = window.confirm(
      `Delete "${template.name}"? This will remove the template from Cloudinary and the database.`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(template.id);
      setError("");
      setSuccess("");

      const response = await API.delete(
        `/certificate/templates/${template.id}`,
      );

      setSuccess(
        response.data?.message ||
          "Certificate template deleted successfully.",
      );

      setTemplates((current) =>
        current.filter(
          (item) => item.id !== template.id,
        ),
      );
    } catch (err: any) {
      console.error(
        "Failed to delete certificate template:",
        err,
      );

      setError(
        err.response?.data?.message ||
          "Failed to delete certificate template.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================================================
  // CLEAR FILE
  // =========================================================

  const clearSelection = () => {
    setSelectedFile(null);
    setTemplateName("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setError("");
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-bold themed-text">
          Certificate Templates
        </h1>

        <p className="themed-secondary mt-1">
          Upload and manage reusable certificate
          templates for volunteer drives.
        </p>
      </div>

      {/* SUCCESS MESSAGE */}

      {success && (
        <div className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-600">
          <CheckCircle2 size={18} />

          <span>{success}</span>

          <button
            onClick={() => setSuccess("")}
            className="ml-auto"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* ERROR MESSAGE */}

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600">
          <X size={18} />

          <span>{error}</span>

          <button
            onClick={() => setError("")}
            className="ml-auto"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* UPLOAD CARD */}

      <div className="themed-card rounded-3xl border themed-border p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="accent-bg-soft accent-text flex h-11 w-11 items-center justify-center rounded-xl">
            <Upload size={20} />
          </div>

          <div>
            <h2 className="themed-text text-lg font-bold">
              Upload Template
            </h2>

            <p className="themed-secondary text-sm">
              PNG or JPG/JPEG · Maximum 10 MB
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          {/* TEMPLATE NAME */}

          <input
            type="text"
            value={templateName}
            onChange={(e) =>
              setTemplateName(e.target.value)
            }
            placeholder="Template name"
            disabled={uploading}
            className="themed-input rounded-xl border themed-border px-4 py-3 text-sm outline-none"
          />

          {/* FILE SELECT */}

          <button
            type="button"
            onClick={() =>
              fileInputRef.current?.click()
            }
            disabled={uploading}
            className="themed-input flex items-center gap-3 rounded-xl border themed-border px-4 py-3 text-left text-sm"
          >
            <Upload
              size={18}
              className="accent-text"
            />

            <span className="min-w-0 flex-1 truncate">
              {selectedFile
                ? selectedFile.name
                : "Choose certificate template"}
            </span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* UPLOAD */}

          <button
            type="button"
            onClick={handleUpload}
            disabled={
              uploading ||
              !selectedFile ||
              !templateName.trim()
            }
            className="accent-bg flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={17} />
                Upload
              </>
            )}
          </button>
        </div>

        {selectedFile && !uploading && (
          <button
            type="button"
            onClick={clearSelection}
            className="themed-secondary mt-3 text-xs hover:underline"
          >
            Remove selected file
          </button>
        )}
      </div>

      {/* UPLOADED TEMPLATES */}

      <div className="themed-card overflow-hidden rounded-3xl border themed-border">
        <div className="flex items-center justify-between border-b themed-border px-6 py-5">
          <div>
            <h2 className="themed-text text-lg font-bold">
              Uploaded Templates
            </h2>

            <p className="themed-secondary text-sm">
              {templates.length} template
              {templates.length !== 1
                ? "s"
                : ""}
            </p>
          </div>

          <Award
            size={24}
            className="accent-text"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2
              size={28}
              className="accent-text animate-spin"
            />
          </div>
        ) : templates.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Award
              size={48}
              className="accent-text mx-auto mb-4 opacity-70"
            />

            <h3 className="themed-text text-lg font-bold">
              No certificate templates yet
            </h3>

            <p className="themed-secondary mt-1 text-sm">
              Upload your first certificate
              template above.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className="overflow-hidden rounded-2xl border themed-border"
              >
                {/* IMAGE */}

                <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                  <img
                    src={template.fileUrl}
                    alt={template.name}
                    className="h-full w-full object-contain"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setPreviewTemplate(template)
                    }
                    className="absolute right-3 top-3 flex items-center gap-2 rounded-lg bg-black/70 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm"
                  >
                    <Eye size={14} />
                    Preview
                  </button>
                </div>

                {/* DETAILS */}

                <div className="p-4">
                  <h3 className="themed-text truncate font-bold">
                    {template.name}
                  </h3>

                  <p className="themed-secondary mt-1 text-xs">
                    Uploaded{" "}
                    {new Date(
                      template.createdAt,
                    ).toLocaleDateString()}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(template)
                    }
                    disabled={
                      deletingId ===
                      template.id
                    }
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-500/10 disabled:opacity-50"
                  >
                    {deletingId ===
                    template.id ? (
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={16} />
                    )}

                    {deletingId ===
                    template.id
                      ? "Deleting..."
                      : "Delete Template"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PREVIEW MODAL */}

      {previewTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() =>
            setPreviewTemplate(null)
          }
        >
          <div
            className="themed-card relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl border themed-border p-4"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              type="button"
              onClick={() =>
                setPreviewTemplate(null)
              }
              className="themed-card absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border themed-border shadow-lg"
            >
              <X size={18} />
            </button>

            <div className="mb-4 px-2">
              <h2 className="themed-text text-xl font-bold">
                {previewTemplate.name}
              </h2>
            </div>

            <div className="max-h-[75vh] overflow-auto rounded-2xl bg-black/5 p-4">
              <img
                src={previewTemplate.fileUrl}
                alt={previewTemplate.name}
                className="mx-auto max-h-[70vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;