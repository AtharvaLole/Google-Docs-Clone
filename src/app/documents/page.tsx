import React from 'react'
import Link from 'next/link'
function Documents() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 animate-fade-in">
      click <Link href="/documents/123" className='text-blue-600'>here</Link> to go to document 123
    </div>
  )
}

export default Documents