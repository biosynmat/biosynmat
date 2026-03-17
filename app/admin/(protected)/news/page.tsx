"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { TiptapEditor } from "@/components/admin/tiptap-editor";
import type { NewsRecord } from "@/lib/admin-types";
import { firebaseDb } from "@/lib/firebase/client";
import { readNews } from "@/lib/firebase/public-read";
import { queryKeys } from "@/lib/query-keys";
import { UploadThingButton, extractUploadUrl } from "@/lib/uploadthing";
import { toDateInputValue } from "@/lib/utils";

const initialForm = {
  title: "",
  date: "",
  summary: "",
  contentHtml: "<p>Write the news content here...</p>",
};


export default function AdminNewsPage() {
  const [form, setForm] = useState(initialForm);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    data: items = [],
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: queryKeys.news(),
    queryFn: () => readNews(),
  });

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
      const payload = {
        title: form.title.trim(),
        date: form.date.trim(),
        summary: form.summary.trim(),
        contentHtml: form.contentHtml,
        image: uploadedImageUrl,
      };

      if (editingId) {
        await updateDoc(doc(firebaseDb, "news", editingId), payload);
      } else {
        await addDoc(collection(firebaseDb, "news"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }

      resetForm();
      await queryClient.invalidateQueries({ queryKey: queryKeys.news() });
    } catch (saveError) {
      setError((saveError as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (item: NewsRecord) => {
    setError("");
    setEditingId(item.id);
    setForm({
      title: item.title,
      date: toDateInputValue(item.date),
      summary: item.summary,
      contentHtml: item.contentHtml,
    });
    setUploadedImageUrl(item.image ?? "");
  };

  const handleDelete = async (id: string) => {
    setError("");
    try {
      await deleteDoc(doc(firebaseDb, "news", id));
      await queryClient.invalidateQueries({ queryKey: queryKeys.news() });
    } catch (deleteError) {
      setError((deleteError as Error).message);
    }
  };

  const errorMessage = error || (queryError instanceof Error ? queryError.message : "");

  return (
    <div className="space-y-6">
      <form onSubmit={handleSave} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="text-xl font-semibold text-slate-900">
          {editingId ? "Edit News Item" : "Create News Item"}
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            required
            placeholder="Title"
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
        </div>

        <textarea
          required
          placeholder="Summary"
          value={form.summary}
          onChange={(event) => setForm((prev) => ({ ...prev, summary: event.target.value }))}
          rows={3}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="mb-2 text-sm font-semibold text-slate-700">News image upload (optional)</p>
          <UploadThingButton
            endpoint="newsImage"
            onClientUploadComplete={(results) => {
              const url = extractUploadUrl(results);
              if (url) setUploadedImageUrl(url);
            }}
            onUploadError={(uploadError) => setError(uploadError.message)}
          />
          {editingId && uploadedImageUrl ? (
            <button
              type="button"
              onClick={() => setUploadedImageUrl("")}
              className="mt-2 inline-flex rounded-full border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
            >
              Remove photo
            </button>
          ) : null}
          {uploadedImageUrl ? (
            <Image
              src={uploadedImageUrl}
              alt="Uploaded news preview"
              width={640}
              height={320}
              className="mt-3 h-32 w-full rounded-lg border border-slate-200 object-cover sm:w-80"
            />
          ) : null}
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-slate-700">News Content (TipTap Editor)</p>
          <TiptapEditor value={form.contentHtml} onChange={(value) => setForm((prev) => ({ ...prev, contentHtml: value }))} />
        </div>

        <button type="submit" disabled={isSaving} className="teal-link inline-flex rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold hover:bg-teal-800 disabled:opacity-60">
          {isSaving ? "Saving..." : editingId ? "Update News" : "Create News"}
        </button>
        {editingId ? (
          <button
            type="button"
            onClick={resetForm}
            className="ml-2 inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancel Edit
          </button>
        ) : null}
      </form>

      {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="text-xl font-semibold text-slate-900">Existing News</h2>
        {isLoading ? <LoadingIndicator label="Loading news..." className="mt-2 py-4" /> : null}

        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              {item.image ? (
                <Image src={item.image} alt={item.title} width={640} height={320} className="mb-3 h-40 w-full rounded-lg border border-slate-200 object-cover" />
              ) : null}
              <p className="text-base font-semibold text-slate-900">{item.title}</p>
              <p className="text-xs uppercase tracking-[0.1em] text-slate-500">{item.date}</p>
              <p className="mt-2 text-sm text-slate-700">{item.summary}</p>
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
