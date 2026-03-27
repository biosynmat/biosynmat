"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

type TiptapEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function TiptapEditor({ value, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const incoming = value || "";
    if (editor.getHTML() !== incoming) {
      editor.commands.setContent(incoming, false);
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 p-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded px-2 py-1 text-xs font-semibold ${editor.isActive("bold") ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded px-2 py-1 text-xs font-semibold ${editor.isActive("italic") ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded px-2 py-1 text-xs font-semibold ${editor.isActive("bulletList") ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
        >
          Bullet List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded px-2 py-1 text-xs font-semibold ${editor.isActive("orderedList") ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
        >
          Numbered List
        </button>
      </div>

      <EditorContent editor={editor} className="min-h-[180px] p-4 text-sm text-slate-800 [&_.ProseMirror]:min-h-[140px] [&_.ProseMirror]:outline-none" />
    </div>
  );
}
