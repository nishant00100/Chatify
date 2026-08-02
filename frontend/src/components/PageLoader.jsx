import { LoaderIcon } from 'lucide-react'
import React from 'react'

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <LoaderIcon className='animate-spin' size={20} color='white' />
    </div>
  )
}

export default PageLoader
