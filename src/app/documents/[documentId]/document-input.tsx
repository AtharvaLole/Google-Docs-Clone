import { OrganizationSwitcher, UserButton } from '@clerk/clerk-react'
import React from 'react'
import {BsCloudCheck} from "react-icons/bs"
function DocumentInput() {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-1'>
          <span className='text-lg px-1.5 cursor-pointer truncate'>Untitled Document</span>
          <BsCloudCheck/>

      </div>
      <div
        className="flex items-center gap-1 sm:gap-1 absolute 
              top-2 right-3            /* default (phones like Samsung) */
              sm:top-2 sm:right-3      /* small devices (≥640px) */
              md:top-3 md:right-8      /* tablets (≥768px) */
              lg:top-5 lg:right-10"    /* large screens (≥1024px) */
      >
          <OrganizationSwitcher afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"/>
          <UserButton/>
      </div>
    </div>
  )
}

export default DocumentInput