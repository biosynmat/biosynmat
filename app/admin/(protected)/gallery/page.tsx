"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import type { GalleryRecord } from "@/lib/admin-types";
import { firebaseDb } from "@/lib/firebase/client";
import { sortByDisplayDateDesc } from "@/lib/utils";
import { UploadThingButton, extractUploadUrls } from "@/utils/uploadthing";

const initialForm = {
  title: "",
  date: "",
};

function toDateInputValue(value: string): string {
  const raw = value.trim();
  if (!raw) {
    return "";
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return raw;
  }

  const parsed = Date.parse(raw);
  if (!Number.isNaN(parsed)) {
    return new Date(parsed).toISOString().slice(0, 10);
  }

  return "";
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryRecord[]>([]);
  const [form, setForm] = useState(initialForm);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const normalizeImages = useCallback((data: Record<string, unknown>) => {
    const images = Array.isArray(data.images)
      ? data.images.map((item) => String(item)).filter(Boolean)
      : [];
    const legacyImage = String(data.image ?? "");
    return images.length > 0 ? images : legacyImage ? [legacyImage] : [];
  }, []);

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const q = query(collection(firebaseDb, "gallery_images"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const records = snapshot.docs.map((record) => {
        const data = record.data();
        return {
          id: record.id,
          title: String(data.title ?? ""),
          date: String(data.date ?? ""),
          images: normalizeImages(data),
        } satisfies GalleryRecord;
      });
      setItems(sortByDisplayDateDesc(records));
    } catch (loadError) {
      setError((loadError as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [normalizeImages]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

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
      await loadItems();
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
      await loadItems();
    } catch (deleteError) {
      setError((deleteError as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSave} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2">
        <h2 className="text-xl font-semibold text-slate-900 sm:col-span-2">
          {editingId ? "Edit Showcase" : "Add Showcase"}
        </h2>

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

        <button
          type="submit"
          disabled={isSaving}
          className="teal-link sm:col-span-2 inline-flex w-fit rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold hover:bg-teal-800 disabled:opacity-60"
        >
          {isSaving ? "Saving..." : editingId ? "Update Showcase" : "Add Showcase"}
        </button>
        {editingId ? (
          <button
            type="button"
            onClick={resetForm}
            className="sm:col-span-2 inline-flex w-fit rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancel Edit
          </button>
        ) : null}
      </form>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="text-xl font-semibold text-slate-900">Existing Gallery Showcases</h2>
        {isLoading ? <p className="mt-3 text-sm text-slate-600">Loading...</p> : null}

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="rounded-full border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
