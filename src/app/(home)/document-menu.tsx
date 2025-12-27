import { Button } from '@/components/ui/button'
import { ExternalLinkIcon, FilePenIcon, MoreVertical, TrashIcon } from 'lucide-react'
import React from 'react'
import { Id } from '../../../convex/_generated/dataModel'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import  {RemoveDialog}  from '@/components/remove-dialog'
import  {RenameDialog}  from '@/components/rename-dialog'

interface DocumentMenuProps{
    documentId:Id<"documents">
    title:string
    onNewTab:(id:Id<"documents">)=>void
}
export const DocumentMenu=({documentId,title,onNewTab}:DocumentMenuProps)=> {
  return (
    <DropdownMenu>

        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="size-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
             <RenameDialog documentId={documentId} initialTitle={title}>
                <DropdownMenuItem onClick={(e)=>e.stopPropagation()}
                   onSelect={(e)=>e.preventDefault()}
                >
                    <FilePenIcon className='size-4'/>
                    Rename
                </DropdownMenuItem>
            </RenameDialog>
            <RemoveDialog documentId={documentId} >
                <DropdownMenuItem onClick={(e)=>e.stopPropagation()}
                   onSelect={(e)=>e.preventDefault()}
                >
                    <TrashIcon className='size-4'/>
                    Delete
                </DropdownMenuItem>
            </RemoveDialog>
            <DropdownMenuItem
            onClick={()=>onNewTab(documentId)}>
                <ExternalLinkIcon className='size-4'/>
                Open in a new tab
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
