'use client'

import { useCompanyStore, useUIStore } from "@/store"
import { titleFont } from '@/config/fonts'
import { useEffect, useState } from "react"



export const NameAndSideToggle = () => {

  const openSideMenu = useUIStore(state => state.openSideMenu)
  const activeCompanyName = useCompanyStore((state) => state.getActiveCompanyName())

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])


  return (


    <div className='flex items-center'>

      <div className="flex items-center justify-start rtl:justify-end">
        <button
          data-drawer-target="logo-sidebar"
          data-drawer-toggle="logo-sidebar"
          aria-controls="logo-sidebar"
          type="button"
          className="inline-flex items-center p-1 text-sm text-sky-600 rounded-md lg:hidden hover:bg-sky-600 hover:text-white focus:outline-none focus:ring-1 focus:ring-sky-600"
          onClick={openSideMenu}
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="false" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
        {
          (loaded) && (
            <a href="/" className="flex ms-2 md:me-24">
              <span className={`text-lg ${titleFont.className} antialiased text-sky-600 `}>{activeCompanyName}</span>
            </a>

          )
        }
      </div>
    </div>


  )
}
