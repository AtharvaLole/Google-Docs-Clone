"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSearchParam } from '@/hooks/use-search-param'
import { SearchIcon, XCircle, XIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'

function SearchInput() {

    const [value,setValue]=useState("")
    const inputref=useRef<HTMLInputElement>(null)
    const [search,setSearch]=useSearchParam()
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setValue(e.target.value)
        setSearch(e.target.value)
    }

    const handleClear=()=>{
        setValue("")
        setSearch("")
    }
  return (
    <div className='flex flex-1 items-center justify-center'>
        <form className='relative max-w-[720px] w-full'>
            <Input value={value} onChange={handleChange} placeholder='Search' className='md:text-base placeholder:text-neutral-800 px-15 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15 bg-[#F0F4F8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white'/>
            <Button type="submit" variant="ghost" size="icon" className='absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full'>
                <SearchIcon/>
            </Button>
            {value&&(
                <Button
                onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
                    type='button'
                    variant="ghost"
                    size="icon"
                >
                    <XIcon/>
                </Button>
            )}
        </form>
    </div>
  )
}

export default SearchInput