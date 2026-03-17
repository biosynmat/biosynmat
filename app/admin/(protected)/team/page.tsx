"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import type { TeamMemberRecord } from "@/lib/admin-types";
import { firebaseDb } from "@/lib/firebase/client";
import { readTeamMembers } from "@/lib/firebase/public-read";
import { queryKeys } from "@/lib/query-keys";
import { normalizeExternalUrl } from "@/lib/utils";
import { UploadThingButton, extractUploadUrl } from "@/lib/uploadthing";
import { AdminFormWrapper, AdminListWrapper } from "@/components/admin/admin-form-wrapper";
import { AdminItemActions } from "@/components/admin/admin-item-actions";

const initialForm = {
  name: "",
  role: "",
  linkedin: "",
  researchgate: "",
  orcid: "",
};

export default function AdminTeamPage() {
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
    queryKey: queryKeys.teamMembers,
    queryFn: readTeamMembers,
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
      await queryClient.invalidateQueries({ queryKey: queryKeys.teamMembers });
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
      await queryClient.invalidateQueries({ queryKey: queryKeys.teamMembers });
    } catch (deleteError) {
      setError((deleteError as Error).message);
    }
  };

  const errorMessage = error || (queryError instanceof Error ? queryError.message : "");

  return (
    <div className="space-y-6">
      <AdminFormWrapper
        title="Team Member"
        entityName="Team Member"
        editingId={editingId}
        isSaving={isSaving}
        errorMessage={errorMessage}
        onSubmit={handleSave}
        onCancelEdit={resetForm}
      >
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
      </AdminFormWrapper>

      <AdminListWrapper
        title="Existing Team Members"
        isLoading={isLoading}
        loadingLabel="Loading team members..."
        gridCols="sm:grid-cols-2 lg:grid-cols-3"
      >
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
