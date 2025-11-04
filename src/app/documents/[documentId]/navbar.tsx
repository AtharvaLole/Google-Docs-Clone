"use client"
import React from 'react'
import Image from "next/image"
import  Link  from 'next/link'
import DocumentInput from './document-input'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from '@/components/ui/menubar'
import { BoldIcon, FileIcon, FileJsonIcon, FilePenIcon, FilePlusIcon, FileTextIcon, GlobeIcon, ItalicIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, StrikethroughIcon, TextIcon, TrashIcon, UnderlineIcon, Undo2Icon } from 'lucide-react'
import { BsFilePdf } from 'react-icons/bs'
import useEditorStore from '@/store/use-editor-store'

function Navbar() {
    const {editor}=useEditorStore();

    const insertTable=({rows,cols}:{rows:number,cols:number})=>{
        editor?.chain().focus().insertTable({rows,cols,withHeaderRow:false}).run()
    }

    const onDownload=(blob:Blob,filename:string)=>{
        const url=URL.createObjectURL(blob);
        const a=document.createElement("a")
        a.href=url
        a.download=filename
        a.click()
    }

    const onSaveJSON=()=>{
        if(!editor) return

        const content=editor.getJSON()
        const blob=new Blob([JSON.stringify(content)],{
            type:"application/json",
        })
        onDownload(blob,`document.json`)
    }
    const onSaveHTML=()=>{
        if(!editor) return

        const content=editor.getHTML()
        const blob=new Blob([content],{
            type:"text/html",
        })
        onDownload(blob,`document.html`)
    }
    const onSaveText=()=>{
        if(!editor) return

        const content=editor.getText()
        const blob=new Blob([content],{
            type:"text/plain",
        })
        onDownload(blob,`document.txt`)
    }
    
  return (
    
    <nav className='flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
            <Link href='/'>
                <Image src="/logo.svg" alt="logo" width={36} height={36}/>
            </Link>
            <div className='flex flex-col'>
                {/*doc input*/}
                <DocumentInput/>
                {/*menubar*/}
                <div className='flex'>
                    <Menubar className='border-none bg-transparent shadow-none h-auto p-0'>
                        <MenubarMenu>
                            <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                                File
                            </MenubarTrigger>
                            <MenubarContent className='print:hidden'>
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                        <FileIcon className='size-4 mr-2'/>
                                        Save
                                    </MenubarSubTrigger> 
                                    <MenubarSubContent>
                                        <MenubarItem onClick={onSaveJSON}>
                                            <FileJsonIcon className='size-4 mr-2'/>
                                            JSON
                                        </MenubarItem>  
                                        <MenubarItem onClick={onSaveHTML}>
                                            <GlobeIcon className='size-4 mr-2'/>
                                            HTML
                                        </MenubarItem>   
                                        <MenubarItem>
                                            <BsFilePdf className='size-4 mr-2'/>
                                            PDF
                                        </MenubarItem>  
                                        <MenubarItem onClick={onSaveText}>
                                            <FileTextIcon className='size-4 mr-2'/>
                                            Text
                                        </MenubarItem>  
                                    </MenubarSubContent>                   
                                </MenubarSub>
                                <MenubarItem>
                                    <FilePlusIcon className='size-4'/>
                                    New Document
                                </MenubarItem>
                                <MenubarSeparator/>
                                <MenubarItem>
                                    <FilePenIcon className='size-4'/>
                                    Rename
                                </MenubarItem>
                                <MenubarSeparator/>
                                <MenubarItem>
                                    <TrashIcon className='size-4'/>
                                    Remove
                                </MenubarItem>
                                <MenubarSeparator/>
                                <MenubarItem onClick={()=>window.print()}>
                                    <PrinterIcon className='size-4'/>
                                    Print <MenubarShortcut>Ctrl+P</MenubarShortcut>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                                Edit
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem onClick={()=>editor?.chain().focus().undo().run()}>
                                    <Undo2Icon className='size-4'/>
                                    Undo<MenubarShortcut>Ctrl + Z</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem onClick={()=>editor?.chain().focus().redo().run()}>
                                    <Redo2Icon className='size-4'/>
                                    Redo<MenubarShortcut>Ctrl + Y</MenubarShortcut>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                                Insert
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                        Table
                                    </MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem onClick={()=>insertTable({rows:1,cols:1})}>
                                            1x1
                                        </MenubarItem>
                                        
                                        <MenubarItem onClick={()=>insertTable({rows:2,cols:2})}>
                                            2x2
                                        </MenubarItem>
                                        </MenubarSubContent>
                                    
                                </MenubarSub>
                            </MenubarContent>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                                Format
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                        <TextIcon className='size-4 mr-2'>Text</TextIcon>
                                    </MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem onClick={()=>editor?.chain().focus().toggleBold().run()}>
                                            <BoldIcon className='size-4'/>
                                                Bold<MenubarShortcut>Ctrl+B</MenubarShortcut>
                                        </MenubarItem>
                                        <MenubarItem onClick={()=>editor?.chain().focus().toggleItalic().run()}>
                                            <ItalicIcon className='size-4'/>
                                                Italic<MenubarShortcut>Ctrl+I</MenubarShortcut>
                                        </MenubarItem>
                                        <MenubarItem>
                                            <StrikethroughIcon className='size-4'/>
                                                Strikethrough<MenubarShortcut>Ctrl+S</MenubarShortcut>
                                        </MenubarItem>
                                        <MenubarItem>
                                            <UnderlineIcon className='size-4'/>
                                                Underline<MenubarShortcut>Ctrl+U</MenubarShortcut>
                                        </MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarItem>
                                    <RemoveFormattingIcon className='size-4'/>Clear Formatting
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar