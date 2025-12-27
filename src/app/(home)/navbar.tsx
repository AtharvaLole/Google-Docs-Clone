import Image from "next/image";
import Link from "next/link";
import React from 'react'
import Navbar from "../documents/[documentId]/navbar";
import SearchInput from "./search-input";
import {UserButton,OrganizationSwitcher} from "@clerk/nextjs";
function Home() {
  
  return (
    <nav className="flex items-center justify-between h-full w-full">
        <div className="flex gap-3 items-center shrink-0 pr-6">
            <Link href="/">
            <Image src="./logo.svg" alt="logo" width={36} height={36}/>
            </Link>
            <h3 className="text-xl">Docs</h3>
        </div>

        <SearchInput/>
        <div className="flex gap-3 items-center pl-6">
          <OrganizationSwitcher
            afterCreateOrganizationUrl="/"
            afterLeaveOrganizationUrl="/"
            afterSelectOrganizationUrl="/"  // ← Redirect to doc list after switch
            afterSelectPersonalUrl="/"
          />
          <UserButton/>
        </div>
        <div/>
    </nav>
  )
}

export default Home