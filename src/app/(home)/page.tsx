"use client"

import Navbar from "./navbar";
import TemplateGallery from "./template-gallery";
import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DocumentsTable } from "./documents-table";
export default function Home() {
  const {results,status,loadMore}=usePaginatedQuery(api.documents.get,{},{initialNumItems:5})
  return (
    <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 right-0 left-0 z-10 p-4 h-16 bg-white">
            <Navbar/>
        </div>
        <div className="mt-16">   
          <TemplateGallery/>
          <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
          />
        
        </div> 

    </div>
  );
}
