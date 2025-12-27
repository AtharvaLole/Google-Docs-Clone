"use client";

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import DocumentInput from './document-input';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
  ImageIcon, // ← Add this
} from 'lucide-react';
import { BsFilePdf } from 'react-icons/bs';
import useEditorStore from '@/store/use-editor-store';

function Navbar() {
  const { editor } = useEditorStore();

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url); // Clean up
  };

  const onSaveJSON = () => {
    if (!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    onDownload(blob, `document.json`);
  };

  const onSaveHTML = () => {
    if (!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], { type: "text/html" });
    onDownload(blob, `document.html`);
  };

  const onSaveText = () => {
    if (!editor) return;
    const content = editor.getText();
    const blob = new Blob([content], { type: "text/plain" });
    onDownload(blob, `document.txt`);
  };

  // NEW: Insert Image Handler
  const insertImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // Optional: File upload version (better UX)
  const insertImageFromUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file || !editor) return;

      // For real apps: upload to your server or Cloudinary and get URL
      // Here we use a temporary object URL (works locally but not collaborative)
      const tempUrl = URL.createObjectURL(file);
      editor.chain().focus().setImage({ src: tempUrl }).run();
    };
    input.click();
  };

  return (
    <nav className="flex items-center justify-between py-2 px-4 border-b">
      <div className="flex gap-4 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={36} height={36} />
        </Link>

        <div className="flex flex-col gap-1">
          <DocumentInput />

          <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
            {/* File Menu */}
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted">
                File
              </MenubarTrigger>
              <MenubarContent className="print:hidden">
                {/* Save submenu */}
                <MenubarSub>
                  <MenubarSubTrigger>
                    <FileIcon className="size-4 mr-2" />
                    Save
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem onClick={onSaveJSON}>
                      <FileJsonIcon className="size-4 mr-2" />
                      JSON
                    </MenubarItem>
                    <MenubarItem onClick={onSaveHTML}>
                      <GlobeIcon className="size-4 mr-2" />
                      HTML
                    </MenubarItem>
                    <MenubarItem disabled>
                      <BsFilePdf className="size-4 mr-2" />
                      PDF (coming soon)
                    </MenubarItem>
                    <MenubarItem onClick={onSaveText}>
                      <FileTextIcon className="size-4 mr-2" />
                      Text
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>

                <MenubarItem>
                  <FilePlusIcon className="size-4 mr-2" />
                  New Document
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <FilePenIcon className="size-4 mr-2" />
                  Rename
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <TrashIcon className="size-4 mr-2" />
                  Remove
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={() => window.print()}>
                  <PrinterIcon className="size-4 mr-2" />
                  Print <MenubarShortcut>Ctrl+P</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            {/* Edit Menu */}
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted">
                Edit
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                  <Undo2Icon className="size-4 mr-2" />
                  Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                  <Redo2Icon className="size-4 mr-2" />
                  Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            {/* Insert Menu - NOW WITH IMAGE! */}
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted">
                Insert
              </MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>Table</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem onClick={() => insertTable({ rows: 2, cols: 3 })}>2 × 3</MenubarItem>
                    <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>3 × 3</MenubarItem>
                    <MenubarItem onClick={() => insertTable({ rows: 4, cols: 6 })}>4 × 6</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>

                <MenubarSeparator />

                {/* Insert Image by URL */}
                <MenubarItem onClick={insertImage}>
                  <ImageIcon className="size-4 mr-2" />
                  Image from URL
                </MenubarItem>

                {/* Optional: Upload from computer */}
                {/* <MenubarItem onClick={insertImageFromUpload}>
                  <ImageIcon className="size-4 mr-2" />
                  Upload Image
                </MenubarItem> */}
              </MenubarContent>
            </MenubarMenu>

            {/* Format Menu */}
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted">
                Format
              </MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>
                    <TextIcon className="size-4 mr-2" />
                    Text
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                      <BoldIcon className="size-4 mr-2" />
                      Bold <MenubarShortcut>Ctrl+B</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                      <ItalicIcon className="size-4 mr-2" />
                      Italic <MenubarShortcut>Ctrl+I</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                      <StrikethroughIcon className="size-4 mr-2" />
                      Strikethrough
                    </MenubarItem>
                    <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                      <UnderlineIcon className="size-4 mr-2" />
                      Underline <MenubarShortcut>Ctrl+U</MenubarShortcut>
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarItem onClick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()}>
                  <RemoveFormattingIcon className="size-4 mr-2" />
                  Clear Formatting
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>

      {/* Optional: Right side - Org Switcher + User Button */}
      <div className="flex items-center gap-4">
        {/* <OrganizationSwitcher />
        <UserButton /> */}
      </div>
    </nav>
  );
}

export default Navbar;