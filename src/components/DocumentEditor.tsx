// components/DocumentEditor.tsx
"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

import { Room } from "@/app/documents/[documentId]/room"; // keep your existing Room
import Editor from "@/app/documents/[documentId]/editor";
import { useParams } from "next/navigation";

export default function DocumentEditor() {
  // Get documentId from params (same as in Room)
  const params = useParams();
  const documentId = params.documentId as string;

  const document = useQuery(api.documents.getById, {
    id: documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading document...</p>
      </div>
    );
  }

  if (document === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Document not found</p>
      </div>
    );
  }

  // Now safe: document exists → render full Liveblocks tree
  return <Room>{/* children is Editor */}<Editor /></Room>;
}