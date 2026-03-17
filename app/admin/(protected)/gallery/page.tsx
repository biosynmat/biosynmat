"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import type { GalleryRecord } from "@/lib/admin-types";
import { firebaseDb } from "@/lib/firebase/client";
import { readGallery } from "@/lib/firebase/public-read";
import { queryKeys } from "@/lib/query-keys";
import { UploadThingButton, extractUploadUrls } from "@/lib/uploadthing";
import { toDateInputValue } from "@/lib/utils";
import { AdminFormWrapper, AdminListWrapper } from "@/components/admin/admin-form-wrapper";
import { AdminItemActions } from "@/components/admin/admin-item-actions";

const initialForm = {
  title: "",
  date: "",
};

export default function AdminGalleryPage() {
  const [form, setForm] = useState(initialForm);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    data: items = [],
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: queryKeys.gallery,
    queryFn: readGallery,
  });

  const resetForm = () => {
    setForm(initialForm);
    setUploadedImageUrls([]);
    setEditingId(null);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      if (uploadedImageUrls.length === 0 && !editingId) {
        throw new Error("Please upload at least one image before saving.");
      }

      const payload = {
        title: form.title.trim(),
        date: form.date.trim(),
        images: uploadedImageUrls,
        image: uploadedImageUrls[0] ?? "",
      };

      if (editingId) {
        await updateDoc(doc(firebaseDb, "gallery_images", editingId), payload);
      } else {
        await addDoc(collection(firebaseDb, "gallery_images"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }

      resetForm();
      await queryClient.invalidateQueries({ queryKey: queryKeys.gallery });
    } catch (saveError) {
      setError((saveError as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (item: GalleryRecord) => {
    setError("");
    setEditingId(item.id);
    setForm({
      title: item.title,
      date: toDateInputValue(item.date),
    });
    setUploadedImageUrls(item.images ?? (item.image ? [item.image] : []));
  };

  const handleDelete = async (id: string) => {
    setError("");
    try {
      await deleteDoc(doc(firebaseDb, "gallery_images", id));
      await queryClient.invalidateQueries({ queryKey: queryKeys.gallery });
    } catch (deleteError) {
      setError((deleteError as Error).message);
    }
  };

  const errorMessage = error || (queryError instanceof Error ? queryError.message : "");

  return (
    <div className="space-y-6">
      <AdminFormWrapper
        title="Showcase"
        entityName="Showcase"
        editingId={editingId}
        isSaving={isSaving}
        errorMessage={errorMessage}
        onSubmit={handleSave}
        onCancelEdit={resetForm}
      >
        <input
          required
          placeholder="Image Title"
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
        <input
          required
          type="date"
          value={form.date}
          onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2"
        />

        <div className="sm:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="mb-2 text-sm font-semibold text-slate-700">Gallery image upload (you can upload multiple images)</p>
          <UploadThingButton
            endpoint="galleryImage"
            onClientUploadComplete={(results) => {
              const urls = extractUploadUrls(results);
              if (urls.length > 0) {
                setUploadedImageUrls((prev) => [...prev, ...urls]);
              }
            }}
            onUploadError={(uploadError) => setError(uploadError.message)}
          />
          {uploadedImageUrls.length > 0 ? (
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {uploadedImageUrls.map((url, index) => (
                <div key={`${url}-${index}`} className="rounded-lg border border-slate-200 bg-white p-2">
                  <Image
                    src={url}
                    alt={`Uploaded gallery preview ${index + 1}`}
                    width={640}
                    height={320}
                    className="h-28 w-full rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setUploadedImageUrls((prev) => prev.filter((_, itemIndex) => itemIndex !== index))
                    }
                    className="mt-2 inline-flex rounded-full border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
                  >
                    Remove photo
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </AdminFormWrapper>

      <AdminListWrapper
        title="Existing Gallery Showcases"
        isLoading={isLoading}
        loadingLabel="Loading gallery items..."
        gridCols="sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            {item.images.length > 0 ? (
              <Image
                src={item.images[0] ?? ""}
                alt={item.title}
                width={640}
                height={320}
                className="mb-3 h-40 w-full rounded-lg border border-slate-200 object-cover"
              />
            ) : null}
            <p className="text-base font-semibold text-slate-900">{item.title}</p>
            <p className="text-sm text-slate-600">{item.date}</p>
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-slate-500">
              {item.images.length} {item.images.length === 1 ? "image" : "images"}
            </p>
            <AdminItemActions
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            />
          </article>
        ))}
      </AdminListWrapper>
    </div>
  );
}
