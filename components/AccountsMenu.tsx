import React from 'react';
import { signOut } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';

interface AccountsMenuProps{
    visible?: boolean
}

const AccountsMenu: React.FC<AccountsMenuProps> = ({ visible }) => {
  const { data } = useCurrentUser();
  const router = useRouter()
  if(!visible){
    return null;
}
  return (
    <div className='bg-black w-56 absolute top-14 right-0 py-5 flex-col'>
      <div className='flex flex-col gap-3'>
        <div className='px-3 group/item flex flex-row gap-3 items-center w-full' onClick={()=> router.push('/profiles')}>
          <img className='w-8 rounded-md' src="/images/default-blue.png" alt="username" />
          <p className='text-white text-sm group-hover/item:underline'>
            {data?.name}
          </p>
        </div>
        <hr className='bg-gray-600 border-0 h-px my-4' />
        <div onClick={()=> signOut()} className='px-3 text-center text-white text-sm hover:underline'>
          Sign out of Netflix
        </div>
      </div>
    </div>
  )
}

export default AccountsMenu;
