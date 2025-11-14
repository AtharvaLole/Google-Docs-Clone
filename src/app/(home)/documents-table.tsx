import { PaginationStatus } from 'convex/react';
import React from 'react'
import { Doc } from '../../../convex/_generated/dataModel';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
interface DocumentsTableProps{
    documents:Doc<"documents">[] | undefined;
    loadMore:(numItems:number)=>void;
    status:PaginationStatus
}

export const DocumentsTable=({
    documents,
    loadMore,
    status}:DocumentsTableProps)=>{
  return (
    <div>DocumentsTable</div>
  )
}
