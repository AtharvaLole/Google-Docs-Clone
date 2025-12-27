"use client";
import React from "react";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { useEditor, EditorContent } from "@tiptap/react";

// Core & Starter
import StarterKit from "@tiptap/starter-kit";

// Named imports (correct way)
import { TextAlign } from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table/row";
import { TableCell } from "@tiptap/extension-table/cell";
import { TableHeader } from "@tiptap/extension-table/header";
import { Image } from "@tiptap/extension-image"; // ← Named import
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { Link } from "@tiptap/extension-link";

// Your custom extensions
import { FontSizeExtension } from "@/extensions/font-size";

// Components
import { Ruler } from "./ruler";
import { Threads } from "./threads";

// Store
import useEditorStore from "@/store/use-editor-store";
import { TaskItem, TaskList } from "@tiptap/extension-list";

// ---------------------------
//   TipTap Editor Component
// ---------------------------
function TiptapEditor() {
  const liveblocks = useLiveblocksExtension();
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },

    editorProps: {
      attributes: {
        style:
          "padding-left:56px; padding-right:56px; padding-top:40px; padding-bottom:40px; max-width:704px; margin:auto; box-sizing:border-box;",
        class:
          "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },

    extensions: [
      StarterKit.configure({
        // Optional: disable conflicting defaults if needed
        // heading: false,
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,

      // IMAGE - NOW WORKING WITH NAMED IMPORT
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg border border-gray-200 shadow-sm max-w-full h-auto",
        },
      }),

      TextStyle,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Highlight.configure({ multicolor: true }),
      Color,
      FontSizeExtension,
      liveblocks,
    ],

    content: "",
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} />;
}

// ---------------------------
//   Main Editor
// ---------------------------
export default function Editor() {
  const { editor } = useEditorStore();

  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-x-visible">
      <Ruler />
      <div className="min-w-max justify-center w-[816px] py-4 mx-auto print:py-0 print:min-w-0 print:w-full">
        <TiptapEditor />

        {editor && <Threads editor={editor} />}
      </div>
    </div>
  );
}