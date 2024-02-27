'use client';

import Link from 'next/link'
import { IoSearchOutline } from 'react-icons/io5'
import { Avatar } from './Avatar';
import { useSession } from 'next-auth/react';
import { getCompanyNameByActiveUser, logout } from '@/actions';
import { NameAndSideToggle } from './NameAndSideToggle';
import { useEffect } from 'react';
import { useCompanyStore } from '@/store';

export const TopMenu = () => {

  const { data: session } = useSession();
  const activeCompany = useCompanyStore((state) => state.activeCompany)
  const setActiveCompany = useCompanyStore((state) => state.setActiveCompany)

  useEffect(() => {
    const fetchData = async () => {
      if (!activeCompany) {
        const data = await getCompanyNameByActiveUser();
        setActiveCompany({
          id: data.company?.id,
          name: data.company?.name
        });
      }
    };
    fetchData();
  }, []);


  return (

    <nav className='flex px-2 h-12 justify-between items-center w-full border-b border-gray-200 bg-white'>

      <NameAndSideToggle />

      <div className='flex items-center'>
        <Link href='/' className="mx-2">
          <IoSearchOutline className="w-5 h-5 text-sky-600" />
        </Link>

        <Avatar
          initials={session?.user.name[0]! + session?.user.lastName[0]! || ''}
          id={session?.user.id || ''}
          image={session?.user.image}
          logout={logout} />

      </div>
    </nav>

  )
}
