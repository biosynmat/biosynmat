"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FormEvent, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import type { PublicationRecord } from "@/lib/admin-types";
import { firebaseDb } from "@/lib/firebase/client";
import { readGroupPublications } from "@/lib/firebase/public-read";
import { queryKeys } from "@/lib/query-keys";
import { UploadThingButton, extractUploadUrl } from "@/lib/uploadthing";
import {
  AdminFormWrapper,
  AdminListWrapper,
} from "@/components/admin/admin-form-wrapper";
import { AdminItemActions } from "@/components/admin/admin-item-actions";

const coverToneOptions = [
  "from-cyan-100 to-cyan-50",
  "from-sky-100 to-sky-50",
  "from-emerald-100 to-emerald-50",
  "from-teal-100 to-teal-50",
  "from-amber-100 to-amber-50",
  "from-indigo-100 to-indigo-50",
];

const initialForm = {
  title: "",
  authors: "",
  year: new Date().getFullYear(),
  abstract: "",
  url: "",
};

function getRandomCoverTone() {
  const idx = Math.floor(Math.random() * coverToneOptions.length);
  return coverToneOptions[idx] ?? "from-slate-100 to-slate-50";
}

export default function AdminGroupPublicationsPage() {
  const [form, setForm] = useState(initialForm);
  const [uploadedCoverImageUrl, setUploadedCoverImageUrl] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingCoverTone, setEditingCoverTone] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    data: items = [],
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: queryKeys.groupPublications,
    queryFn: readGroupPublications,
  });

  const resetForm = () => {
    setForm(initialForm);
    setUploadedCoverImageUrl("");
    setEditingId(null);
    setEditingCoverTone(null);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      const payload = {
        title: form.title.trim(),
        authors: form.authors.trim(),
        venue: "",
        year: Number(form.year),
        abstract: form.abstract.trim(),
        url: form.url.trim(),
        coverTone: editingCoverTone ?? getRandomCoverTone(),
        coverImage: uploadedCoverImageUrl,
      };

      if (editingId) {
        await updateDoc(
          doc(firebaseDb, "group_publications", editingId),
          payload,
        );
      } else {
        await addDoc(collection(firebaseDb, "group_publications"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }

      resetForm();
      await queryClient.invalidateQueries({
        queryKey: queryKeys.groupPublications,
      });
    } catch (saveError) {
      setError((saveError as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (item: PublicationRecord) => {
    setError("");
    setEditingId(item.id);
    setForm({
      title: item.title,
      authors: item.authors,
      year: item.year,
      abstract: item.abstract,
      url: item.url,
    });
    setEditingCoverTone(item.coverTone);
    setUploadedCoverImageUrl(item.coverImage ?? "");
  };

  const handleDelete = async (id: string) => {
    setError("");
    try {
      await deleteDoc(doc(firebaseDb, "group_publications", id));
      await queryClient.invalidateQueries({
        queryKey: queryKeys.groupPublications,
      });
    } catch (deleteError) {
      setError((deleteError as Error).message);
    }
  };

  const errorMessage =
    error || (queryError instanceof Error ? queryError.message : "");

  return (
    <div className="space-y-6">
      <AdminFormWrapper
        title="Group Publication"
        entityName="Group Publication"
        editingId={editingId}
        isSaving={isSaving}
        errorMessage={errorMessage}
        onSubmit={handleSave}
        onCancelEdit={resetForm}
      >
        <input
          required
          placeholder="Title"
          value={form.title}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, title: event.target.value }))
          }
          className="rounded-lg border border-slate-300 px-3 py-2 sm:col-span-2"
        />
        <input
          required
          placeholder="Authors"
          value={form.authors}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, authors: event.target.value }))
          }
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
        <input
          required
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, year: Number(event.target.value) }))
          }
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
        <input
          required
          placeholder="Publication URL"
          value={form.url}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, url: event.target.value }))
          }
          className="rounded-lg border border-slate-300 px-3 py-2"
        />

        <div className="sm:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="mb-2 text-sm font-semibold text-slate-700">
            Cover image upload (optional)
          </p>
          <UploadThingButton
            endpoint="publicationImage"
            onClientUploadComplete={(results) => {
              const url = extractUploadUrl(results);
              if (url) setUploadedCoverImageUrl(url);
            }}
            onUploadError={(uploadError) => setError(uploadError.message)}
          />
          {editingId && uploadedCoverImageUrl ? (
            <button
              type="button"
              onClick={() => setUploadedCoverImageUrl("")}
              className="mt-2 inline-flex rounded-full border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
            >
              Remove photo
            </button>
          ) : null}
          {uploadedCoverImageUrl ? (
            <Image
              src={uploadedCoverImageUrl}
              alt="Uploaded publication cover preview"
              width={640}
              height={320}
              className="mt-3 h-32 w-full rounded-lg border border-slate-200 bg-white object-contain sm:w-80"
            />
          ) : null}
        </div>

        <textarea
          required
          placeholder="Abstract"
          value={form.abstract}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, abstract: event.target.value }))
          }
          rows={4}
          className="rounded-lg border border-slate-300 px-3 py-2 sm:col-span-2"
        />
      </AdminFormWrapper>

      <AdminListWrapper
        title="Existing Group Publications"
        isLoading={isLoading}
        loadingLabel="Loading group publications..."
      >
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-slate-200 bg-slate-50 p-3"
          >
            {item.coverImage ? (
              <Image
                src={item.coverImage}
                alt={item.title}
                width={640}
                height={320}
                className="mb-3 h-32 w-full rounded-lg border border-slate-200 bg-white object-contain"
              />
            ) : null}
            <p className="text-base font-semibold text-slate-900">
              {item.title}
            </p>
            <p className="text-sm text-slate-700">{item.authors}</p>
            <p className="text-sm text-slate-600">
              {item.venue ? `${item.venue} • ${item.year}` : String(item.year)}
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
