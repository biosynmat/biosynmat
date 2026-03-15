"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import type { GalleryRecord } from "@/lib/admin-types";
import { firebaseDb } from "@/lib/firebase/client";
import { UploadThingButton, extractUploadUrl } from "@/utils/uploadthing";

const initialForm = {
  title: "",
  date: "",
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryRecord[]>([]);
  const [form, setForm] = useState(initialForm);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadItems = async () => {
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
          image: String(data.image ?? ""),
        } satisfies GalleryRecord;
      });
      setItems(records);
    } catch (loadError) {
      setError((loadError as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setUploadedImageUrl("");
    setEditingId(null);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      if (!uploadedImageUrl) {
        throw new Error("Please upload an image before saving.");
      }

      const payload = {
        title: form.title.trim(),
        date: form.date.trim(),
        image: uploadedImageUrl,
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
      date: item.date,
    });
    setUploadedImageUrl(item.image);
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
          {editingId ? "Edit Image" : "Add Image"}
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
          placeholder="Date (e.g. March 2026)"
          value={form.date}
          onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2"
        />

        <div className="sm:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="mb-2 text-sm font-semibold text-slate-700">Gallery image upload</p>
          <UploadThingButton
            endpoint="galleryImage"
            onClientUploadComplete={(results) => {
              const url = extractUploadUrl(results);
              if (url) setUploadedImageUrl(url);
            }}
            onUploadError={(uploadError) => setError(uploadError.message)}
          />
          {uploadedImageUrl ? (
            <Image
              src={uploadedImageUrl}
              alt="Uploaded gallery preview"
              width={640}
              height={320}
              className="mt-3 h-40 w-full rounded-lg border border-slate-200 object-cover sm:w-96"
            />
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="teal-link sm:col-span-2 inline-flex w-fit rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold hover:bg-teal-800 disabled:opacity-60"
        >
          {isSaving ? "Saving..." : editingId ? "Update Image" : "Add Image"}
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
        <h2 className="text-xl font-semibold text-slate-900">Existing Gallery Images</h2>
        {isLoading ? <p className="mt-3 text-sm text-slate-600">Loading...</p> : null}

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={640}
                  height={320}
                  className="mb-3 h-40 w-full rounded-lg border border-slate-200 object-cover"
                />
              ) : null}
              <p className="text-base font-semibold text-slate-900">{item.title}</p>
              <p className="text-sm text-slate-600">{item.date}</p>
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
