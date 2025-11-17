import { Button } from '@/components/ui/button'
import { ExternalLinkIcon, MoreVertical, TrashIcon } from 'lucide-react'
import React from 'react'
import { Id } from '../../../convex/_generated/dataModel'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import  {RemoveDialog}  from '@/components/remove-dialog'

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
            <RemoveDialog documentId={documentId}>
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
