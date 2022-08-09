import React from 'react'
import useAuth from './../Hooks/useAuth'
import { Link } from 'react-router-dom'

const UserProfile = () => {
  const { user } = useAuth()
  return (
    <>
      <div className='m-2'>
        <div className='p-4 space-y-4'>
          <div className='flex space-x-4 items-baseline'>
            <span className='bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center'>
              <i className='fas fas fa-user' />
            </span>
            <h3 className='text-gray-500 text-sm lg:text-base font-black uppercase'>
              Welcome <span className='text-primary'>{user?.name}</span>
            </h3>
          </div>
          <div className='p-4 shadow rounded-lg bg-white relative h-screen'>
            <div className='bg-primary p-20 rounded-xl'></div>
            <div className='bg-white max max-w-md mx-auto rounded-xl absolute top-24 left-0 right-0 shadow-md'>
              <div className='p-12 rounded-lg relative'>
                <div className='absolute -top-12 left-0 right-0 w-full'>
                  <img
                    className='w-24 h-24 rounded-full shadow-md mx-auto'
                    src={user?.avatar}
                    alt='Avatar'
                  />
                </div>
                <div className='text-md text-gray-600 divide-y-2 divide-gray-100 my-8'>
                  <p>
                    <span className='text-primary font-black'>Name:</span>{' '}
                    {user?.name}
                  </p>
                  <p>
                    <span className='text-primary font-black'>Email:</span>{' '}
                    {user?.email}
                  </p>
                  <p>
                    <span className='text-primary font-black'>Phone:</span>{' '}
                    {user?.mobile}
                  </p>
                  <p>
                    <span className='text-primary font-black'>Role:</span>{' '}
                    {user?.roles}
                  </p>
                </div>
                <Link
                  to='?tab=logout'
                  className='bg-primary  text-white flex rounded-md items-center w-1/3 mx-auto p-2 text-sm space-x-4 '
                >
                  <span>
                    <i className='fas fa-power-off' />
                  </span>
                  <span>Logout</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile
