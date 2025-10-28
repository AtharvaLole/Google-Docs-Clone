"use client"
import React, { useState } from 'react'
import { AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronDownIcon, DotIcon, DotSquareIcon, HighlighterIcon, ImageIcon, ItalicIcon, LineSquiggleIcon, Link2Icon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, MinusIcon, PlusIcon, Printer, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SearchIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon, UploadIcon} from 'lucide-react';
import { cn } from '@/lib/utils';
import  useEditorStore  from '@/store/use-editor-store';
import { Separator } from '@radix-ui/react-separator';
import {  TextStyle} from '@tiptap/extension-text-style'
import {type ColorResult,CirclePicker} from 'react-color';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import Link from '@tiptap/extension-link'
import {type Level} from '@tiptap/extension-heading'
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog,DialogContent,DialogFooter,DialogHeader,DialogTitle } from '@/components/ui/dialog';
import { BulletList } from '@tiptap/extension-list';

interface toolbarbuttonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon:LucideIcon;
}

const LineHeightButton=()=>{
    return(
        <button className={cn(
                    "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
        )}> <LineSquiggleIcon/>
        </button>
    )
}
const Linkbutton=()=>{
    const {editor}=useEditorStore();
    const [value,setValue]=useState(editor?.getAttributes("link").href || "")
    const onChange=(href: string)=>{
        editor?.chain().focus().extendMarkRange('link').setLink({href}).run();
        setValue("")
    }
    const [currlink,setCurrlink]=useState("");

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(
                    "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                )}>
                    <span className='text-xs'><Link2Icon className='size-4'/></span>
                    <div className='h-0.5 w-full' style={{backgroundColor:value}}/>

                </button>
            </DropdownMenuTrigger>
        <DropdownMenuContent className='p-2.5 flex flex-col items-center' >
            <Input placeholder='https://example.com' value={value} onChange={(e)=>{setValue(e.target.value), setCurrlink(value)}}/>
            <Button onClick={()=>onChange(value)}>Apply</Button>
            <span>Curr Link:{currlink}</span>
            
        </DropdownMenuContent>
        </DropdownMenu>
    )
}

const ImageButton=()=>{
    const {editor}=useEditorStore();
    const [isDialogOpen,setisDialogOpen]=useState(false)
    const [imgurl,setImgUrl]=useState("")

    const onChange=(src: string)=>{
       editor?.chain().focus().setImage({src}).run();
    }

    const onUpload=()=>{
        const input=document.createElement("input");
        input.type="file";
        input.accept="image/*";
        input.onchange=(e)=>{ 
            const file=(e.target as HTMLInputElement).files?.[0];
            if(file){
                const imgurl=URL.createObjectURL(file);
                onChange(imgurl);  
            }
            input.click()
        }
    }
        const handleImageURLSubmit=()=>{
            if(imgurl){
                onChange(imgurl)
                setImgUrl("")
                setisDialogOpen(false)
            }
        }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(
                    "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                )}>
                    <span className='text-xs'><ImageIcon className='size-4'/></span>
                    <div className='h-0.5 w-full'/>

                </button>
            </DropdownMenuTrigger>
        <DropdownMenuContent className='p-2.5 flex flex-col items-center' >
            <DropdownMenuItem onClick={()=>setisDialogOpen(true)}>
                <SearchIcon className='size-4'/>
                Paste img URL
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onUpload}>
                <UploadIcon className='size-4'/>
                Upload img
            </DropdownMenuItem>
            
        </DropdownMenuContent>
        <Dialog>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Insert Image URL</DialogTitle>
                </DialogHeader>
                <Input 
                    placeholder='Insert url img'
                    value={imgurl}
                    onChange={(e)=>setImgUrl(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key==="Enter"){
                            handleImageURLSubmit();
                        }
                    }}/>
            </DialogContent>
            <DialogFooter>
                <Button onClick={handleImageURLSubmit}>Insert Image</Button>
            </DialogFooter>
        </Dialog>
        </DropdownMenu>
        
    
    )
}

const ListButton=()=>{
    const {editor}= useEditorStore();

    const lists=[
        {
            label:"Bulleted list",
            value:"bulletList",
            icon:DotIcon
        }
    ]
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(
                    "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                )}>
                    <span className='text-xs'><DotSquareIcon className='size-4'/></span>
                    <div className='h-0.5 w-full'/>

                </button>
            </DropdownMenuTrigger>
        <DropdownMenuContent className='p-2.5'>
            {lists.map(({label,value,icon:Icon})=>(
                <button key={value}
                className={cn(
                    "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                    editor?.isActive(value)&& "bg-neutral-200/80"
                )}
                onClick={()=>editor?.chain().focus().toggleBulletList().run()}>
                    <Icon className='size-4'/>
                    <span>{label}</span>
                </button>
            ))}
        </DropdownMenuContent>
        </DropdownMenu>
    )
}


const AlignButton=()=>{
    const {editor}= useEditorStore();

    const alignments=[
        {
            label:"Align left",
            value:"left",
            icon:AlignLeftIcon
        },
        {
            label:"Align Right",
            value:"right",
            icon:AlignRightIcon
        },
        {
            label:"Align center",
            value:"center",
            icon:AlignJustifyIcon
        }
    ]
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(
                    "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                )}>
                    <span className='text-xs'><AlignLeftIcon className='size-4'/></span>
                    <div className='h-0.5 w-full'/>

                </button>
            </DropdownMenuTrigger>
        <DropdownMenuContent className='p-2.5'>
            {alignments.map(({label,value,icon:Icon})=>(
                <button key={value} 
                className={cn(
                    "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                    editor?.isActive({textAlign:value})&& "bg-neutral-200/80"
                )}
                onClick={()=>editor?.chain().focus().setTextAlign(value).run()}>

                    <Icon className='size-4'/>
                    <span className='text-sm'>{label}</span>
                </button>
            ))}
        </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HighlightButton=()=>{
    const {editor}= useEditorStore();
    const value=editor?.getAttributes("highlight").color||"#FFFF00";
    const onChange=(color:ColorResult)=>{
        editor?.chain().focus().setHighlight({color:color.hex}).run();
    }
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(
                    "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                )}>
                    <span className='text-xs'><HighlighterIcon className='size-4'/></span>
                    <div className='h-0.5 w-full' style={{backgroundColor:value}}/>

                </button>
            </DropdownMenuTrigger>
        <DropdownMenuContent className='p-2.5'>
            <CirclePicker color={value} onChange={onChange}/>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}
const TextcolorButton=()=>{
    const {editor}= useEditorStore();
    const value=editor?.getAttributes("textStyle").color||"#000000";
    const onChange=(color:ColorResult)=>{
        editor?.chain().focus().setColor(color.hex).run();
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(
                    "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                )}>
                    <span className='text-xs'>A</span>
                    <div className='h-0.5 w-full' style={{backgroundColor:value}}/>

                </button>
            </DropdownMenuTrigger>
        <DropdownMenuContent className='p-2.5'>
            <CirclePicker color={value} onChange={onChange}/>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}

const FontSizeButton=()=>{
    const {editor}= useEditorStore();

    const currentFontsize=editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px","") : "16";

    const [fontSize,setFontSize]=useState(currentFontsize);
    const [inputValue,setInputValue]=useState(fontSize);
    const [isEditing,setIsEditing]=useState(false)

    const updateFontSize=(newSize:string)=>{
        const size=parseInt(newSize);
        if(!isNaN(size)&&size>0){
            editor?.chain().focus().setFontSize(`${size}px`).run()
            setFontSize(newSize)
            setInputValue(newSize)
            setIsEditing(false)
        }
    }

    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputValue(e.target.value)
    }

    const handleInputBlur=()=>{
        updateFontSize(inputValue)
    }

    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==="Enter"){
            e.preventDefault()
            updateFontSize(inputValue)
            editor?.commands.focus()
        }
    }

    const increment=()=>{
        const newSize=parseInt(fontSize)+1
        updateFontSize(newSize.toString())
    }

    const decrement=()=>{
        const newSize=parseInt(fontSize)-1
        if(newSize>0){
            updateFontSize(newSize.toString())
        }
    }
    
    return(
        <div className='flex items-center gap-x-0.5'>
            <button
                className={cn(
                    "h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5"
                )}
                onClick={decrement}
            >
                <MinusIcon className='size-4'/> 
            </button>

            {isEditing ?(
                <input
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                className='h-7 w-10 shrink-0 rounded-sm text-sm border border-neutral-400 focus:outline-none focus:ring-0 cursor-text bg-transparent px-1.5'/>
            ):
            <button
                className={cn(
                        "h-7 w-10 shrink-0 rounded-sm text-sm border border-neutral-400 hover:bg-neutral-200/80 px-1.5"
                    )}
                onClick={()=>{setIsEditing(true)
                    setFontSize(currentFontsize)}
                }
            >
                {currentFontsize}
                </button>
            }
            <button
                className={cn(
                    "h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5"
                )}
                onClick={increment}
            >
                <PlusIcon className='size-4'/> 
            </button>
        </div>
    )
}

const HeadingLevelButton=()=>{
    const {editor}= useEditorStore();
    const headings = [
        {label:"Normal text", value:0,fontSize:"16px"},
        {label:"Heading 1", value:1,fontSize:"32px"},
        {label:"Heading 2", value:2,fontSize:"24px"},
        {label:"Heading 3", value:3,fontSize:"20px"},
        {Label:"Heading 4", value:4,fontSize:"16px"},
    ];

    const getCurrentHeading=()=>{
        for(let level=1;level<=4;level++){
            if(editor?.isActive("heading",{level})){
                return `Heading ${level}`
        }
    }
        return "Normal text";
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                className={cn(
                    "h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                )}
                >
                    <span className='truncate'>
                        {getCurrentHeading()}
                    </span>
                    <ChevronDownIcon className='ml-2 size-4 shrink-0'/>
                </button>

            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {headings.map(({label,value,fontSize})=>
                <button
                    key={value}
                    style={{fontSize}}
                    className={cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        (value===0 && !editor?.isActive("heading")) || editor?.isActive("heading",{level:value})&&"bg-neutral-200/80")}
                    onClick={()=>{
                        if (value===0){
                            editor?.chain().focus().setParagraph().run()
                        }else{
                            editor?.chain().focus().toggleHeading({level:value as Level}).run()
                        }
                    }}
                >
                    <span className='text-sm'>{label}</span>
                </button>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const Fontfamilybutton=()=>{
    const {editor}= useEditorStore();
    const fonts = [
        {label:"Arial", value:"Arial"},
        {label:"Courier New", value:"Courier New"},
        {label:"Georgia", value:"Georgia"},
        {label:"Times New Roman", value:"Times New Roman"},
        {label:"Verdana", value:"Verdana"},
    ];

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                className={cn(
                    "h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                )}
                >
                    <span className='truncate'>
                        {editor?.getAttributes(TextStyle.name).fontFamily||"Arial"}
                    </span>
                    <ChevronDownIcon className='ml-2 size-4 shrink-0'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {fonts.map(({label,value})=>(
                    <button key={value} className={cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        editor?.getAttributes("textStyle").fontFamily===value && "bg-neutral-200/80")}
                        onClick={()=>editor?.chain().focus().setFontFamily(value).run()}
                        style={{fontFamily:value}}
                    >
                        <span className='text-sm'>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


const Toolbarbutton=({onClick,isActive,icon:Icon}:toolbarbuttonProps)=> {
    return(
        <button onClick={onClick}
        className={cn(
            "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
            isActive && "bg-neutral-200/80"
        )}
        >
            <Icon className='w-4 h-4 text-gray-700'/>
        </button>
    )
}

function Toolbar() {
    const {editor} = useEditorStore();
    console.log(editor)
    const sections:{
        label:string
        icon:LucideIcon
        onClick:()=>void
        isActive?:boolean
    }[][] = [
        [{
            label:"Undo",
            icon:Undo2Icon,
            onClick:()=>editor?.chain().focus().undo().run(),
        },
        {
            label:"Redo",
            icon:Redo2Icon,
            onClick:()=>editor?.chain().focus().redo().run(),
        },
        {
            label:"Print",
            icon:PrinterIcon,
            onClick:()=>window.print(),
        },
        {
            label:"Spellcheck",
            icon:SpellCheckIcon,
            onClick:()=>{
                const current = editor?.view.dom.getAttribute("spellcheck");
                editor?.view.dom.setAttribute("spellcheck", current==="true"?"false":"true");
            },
        }
    ],
    [
        {
            label:"Bold",
            icon:BoldIcon,
            onClick:()=>editor?.chain().focus().toggleBold().run(),
            isActive:editor?.isActive("bold")||false,
        },
        {
            label:"Italic",
            icon:ItalicIcon,
            onClick:()=>editor?.chain().focus().toggleItalic().run(),
            isActive:editor?.isActive("italic")||false,
        },
        {
            label:"Underline",
            icon:UnderlineIcon,
            onClick:()=>editor?.chain().focus().toggleUnderline().run(),
            isActive:editor?.isActive("underline")||false,
        }
    ],[
        {
            label:"Comment",
            icon:MessageSquarePlusIcon,
            onClick:()=>void(0),
            isActive:false,
        },
        {
            label:"Todo List",
            icon:ListTodoIcon,
            onClick:()=>editor?.chain().focus().toggleTaskList().run(),
            isActive:editor?.isActive("taskList")||false,
        },
        {
            label:"Remove formatting",
            icon:RemoveFormattingIcon,
            onClick:()=>editor?.chain().focus().unsetAllMarks().run(),
        
        }
    ]
    ]
  return (
    <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
        {sections[0].map((item)=>(
            <Toolbarbutton key={item.label} {...item}/>
        ))}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        {/*TODO FONT FAMILY*/}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        <Fontfamilybutton/>
        {/*TODO HEADING*/}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        <HeadingLevelButton/>
        {/*TODO FONT SIZE*/}      
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        <FontSizeButton/>

        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        {sections[1].map((item)=>(
            <Toolbarbutton key={item.label} {...item}/>
        ))}

        {/* text color*/}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        <TextcolorButton/>
        {/* highlight color*/}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        <HighlightButton/>
        {/* Link*/}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        <Linkbutton/>
        {/*Image*/}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        <ImageButton/>
        {/* Align*/}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        <AlignButton/>
        {/* Line height*/}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        <LineHeightButton/>
        {/* List*/}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        <ListButton/>
        {sections[2].map((item)=>(
            <Toolbarbutton key={item.label} {...item}/>
        ))}
    </div>
  )
}

export default Toolbar