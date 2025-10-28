"use client"
import React from 'react'
import Image from "next/image"
import  Link  from 'next/link'
import DocumentInput from './document-input'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from '@/components/ui/menubar'
import { BoldIcon, FileIcon, FileJsonIcon, FilePenIcon, FilePlusIcon, FileTextIcon, GlobeIcon, ItalicIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, StrikethroughIcon, TextIcon, TrashIcon, UnderlineIcon, Undo2Icon } from 'lucide-react'
import { BsFilePdf } from 'react-icons/bs'

function Navbar() {
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
                                        <MenubarItem>
                                            <FileJsonIcon className='size-4 mr-2'/>
                                            JSON
                                        </MenubarItem>    
                                    </MenubarSubContent>   
                                    <MenubarSubContent>
                                        <MenubarItem>
                                            <FileJsonIcon className='size-4 mr-2'/>
                                            JSON
                                        </MenubarItem>  
                                        <MenubarItem>
                                            <GlobeIcon className='size-4 mr-2'/>
                                            HTML
                                        </MenubarItem>   
                                        <MenubarItem>
                                            <BsFilePdf className='size-4 mr-2'/>
                                            PDF
                                        </MenubarItem>  
                                        <MenubarItem>
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
                                <MenubarItem>
                                    <Undo2Icon className='size-4'/>
                                    Undo<MenubarShortcut>Ctrl + Z</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
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
                                    <MenubarSubContent>1 x 1</MenubarSubContent>
                                    
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
                                        <MenubarItem>
                                            <BoldIcon className='size-4'/>
                                                Bold<MenubarShortcut>Ctrl+B</MenubarShortcut>
                                        </MenubarItem>
                                        <MenubarItem>
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