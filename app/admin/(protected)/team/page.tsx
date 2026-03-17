"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import type { TeamMemberRecord } from "@/lib/admin-types";
import { firebaseDb } from "@/lib/firebase/client";
import { normalizeExternalUrl } from "@/lib/utils";
import { UploadThingButton, extractUploadUrl } from "@/utils/uploadthing";

const initialForm = {
  name: "",
  role: "",
  linkedin: "",
  researchgate: "",
  orcid: "",
};

export default function AdminTeamPage() {
  const [items, setItems] = useState<TeamMemberRecord[]>([]);
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
      const q = query(collection(firebaseDb, "team_members"), orderBy("createdAt", "asc"));
      const snapshot = await getDocs(q);
      const records = snapshot.docs.map((record) => {
        const data = record.data();
        return {
          id: record.id,
          name: String(data.name ?? ""),
          role: String(data.role ?? ""),
          image: String(data.image ?? ""),
          linkedin: data.linkedin ? String(data.linkedin) : "",
          researchgate: data.researchgate ? String(data.researchgate) : "",
          orcid: data.orcid ? String(data.orcid) : "",
        } satisfies TeamMemberRecord;
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
      if (!uploadedImageUrl && !editingId) {
        throw new Error("Please upload a profile image before saving.");
      }

      const payload = {
        name: form.name.trim(),
        role: form.role.trim(),
        image: uploadedImageUrl,
        linkedin: normalizeExternalUrl(form.linkedin),
        researchgate: normalizeExternalUrl(form.researchgate),
        orcid: normalizeExternalUrl(form.orcid),
      };

      if (editingId) {
        await updateDoc(doc(firebaseDb, "team_members", editingId), payload);
      } else {
        await addDoc(collection(firebaseDb, "team_members"), {
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

  const handleEdit = (item: TeamMemberRecord) => {
    setError("");
    setEditingId(item.id);
    setForm({
      name: item.name,
      role: item.role,
      linkedin: item.linkedin ?? "",
      researchgate: item.researchgate ?? "",
      orcid: item.orcid ?? "",
    });
    setUploadedImageUrl(item.image);
  };

  const handleDelete = async (id: string) => {
    setError("");
    try {
      await deleteDoc(doc(firebaseDb, "team_members", id));
      await loadItems();
    } catch (deleteError) {
      setError((deleteError as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSave} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2">
        <h2 className="text-xl font-semibold text-slate-900 sm:col-span-2">
          {editingId ? "Edit Team Member" : "Add Team Member"}
        </h2>

        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
        <input
          required
          placeholder="Role"
          value={form.role}
          onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
        <input
          placeholder="LinkedIn URL"
          value={form.linkedin}
          onChange={(event) => setForm((prev) => ({ ...prev, linkedin: event.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
        <input
          placeholder="ResearchGate URL"
          value={form.researchgate}
          onChange={(event) => setForm((prev) => ({ ...prev, researchgate: event.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
        <input
          placeholder="ORCID URL"
          value={form.orcid}
          onChange={(event) => setForm((prev) => ({ ...prev, orcid: event.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2 sm:col-span-2"
        />

        <div className="sm:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="mb-2 text-sm font-semibold text-slate-700">Profile image upload</p>
          <UploadThingButton
            endpoint="teamImage"
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
              alt="Uploaded profile preview"
              width={420}
              height={300}
              className="mt-3 h-32 w-full rounded-lg border border-slate-200 object-cover sm:w-64"
            />
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="teal-link inline-flex w-fit rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold hover:bg-teal-800 disabled:opacity-60 sm:col-span-2"
        >
          {isSaving ? "Saving..." : editingId ? "Update Team Member" : "Add Team Member"}
        </button>
        {editingId ? (
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex w-fit rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 sm:col-span-2"
          >
            Cancel Edit
          </button>
        ) : null}
      </form>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="text-xl font-semibold text-slate-900">Existing Team Members</h2>
        {isLoading ? <p className="mt-3 text-sm text-slate-600">Loading...</p> : null}

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={420}
                  height={300}
                  className="mb-3 h-32 w-full rounded-lg border border-slate-200 object-cover"
                />
              ) : null}
              <p className="text-base font-semibold text-slate-900">{item.name}</p>
              <p className="text-sm text-slate-700">{item.role}</p>
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
