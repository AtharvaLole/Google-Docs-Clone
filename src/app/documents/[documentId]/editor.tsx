"use client";
import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ResizeImage from 'tiptap-extension-resize-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import TextAlign from '@tiptap/extension-text-align'
import { Table, TableCell, TableHeader, TableKit } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table/row';
import { ListKit } from '@tiptap/extension-list'
import {Image} from '@tiptap/extension-image'
import useEditorStore  from '@/store/use-editor-store';
import  Color  from '@tiptap/extension-color';
import Highlight from "@tiptap/extension-highlight";
import {TextStyle} from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link';
import { FontSizeExtension } from '@/extensions/font-size';
import { Ruler } from './ruler';
function Editor() {
  
  const Tiptap = () => {
    const { setEditor } = useEditorStore();
    const editor = useEditor({
      onCreate:({editor})=>{
          setEditor(editor);
      },
      onDestroy(){
          setEditor(null);
      },
      onSelectionUpdate({editor}){
          setEditor(editor);
      },
      onTransaction({editor}){
          setEditor(editor);
      },
      onFocus({editor}){
          setEditor(editor);
      },
      onBlur({editor}){
          setEditor(editor);
      },
      editorProps: {
        attributes: {
          style:" padding-left:56px; padding-right:56px; padding-top:40px; padding-bottom:40px; max-width:704px; margin:auto; box-sizing:border-box; ",
          class:"focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
        }
      },
      
      
      extensions: [StarterKit,
          TaskList,ListKit,FontSizeExtension,
          TaskItem.configure({
              nested: true,
          }),
      Table,TableRow,TableCell,TableHeader,TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),Image,ResizeImage,TextStyle,Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),Highlight.configure({multicolor:true}),Color.configure({ types: ['textStyle'] })],
      
      
      content: `<table>
            <tbody>
              <tr>
                <th>Name</th>
                <th colspan="3">Description</th>
              </tr>
              <tr>
                <td>Cyndi Lauper</td>
                <td>Singer</td>
                <td>Songwriter</td>
                <td>Actress</td>
              </tr>
            </tbody>
          </table>`,
      // Don't render immediately on the server to avoid SSR issues
      immediatelyRender: false,
    })

    return <EditorContent editor={editor} />
  }

  return (
    <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-x-visible'>
      <Ruler/>
        <div className='min-w-max justify-center w-[816px] py-4 mx-auto print:py-0 print:min-w-0 print:w-full'>
            <Tiptap/>
        </div>
    </div>
  )
}

export default Editor;