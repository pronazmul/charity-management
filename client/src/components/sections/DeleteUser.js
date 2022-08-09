import React from 'react'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'

const DeleteUser = ({ id, modalHandler, update }) => {
  const userDeleteHandler = async () => {
    try {
      await axios.delete(`http://103.107.184.159:5001/api/v1/users/${id}`)
      toast.success('User Deleted Successfully!')
      update(true)
    } catch (error) {
      toast.error('Failed To Delete User!')
      console.log(error)
    }
  }

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <div className='m-2 bg-white rounded-lg shadow-lg overflow-hidden pb-4'>
        <div className='bg-primary p-8 rounded-b-full rounded-t-2xl'>
          <span>
            <i className='fa fa-times text-5xl text-red-500'></i>
          </span>
          <h1 className='text-white text-2xl font-black'>Are you sure ? </h1>
        </div>
        <div className='py-6 space-y-4 px-8'>
          <p className='text-sm text-gray-600'>
            Do you really want to delete these records? This process cannot be
            undone.
          </p>
          <div className='space-x-4'>
            <button
              className='bg-primary  text-white  rounded-md w-1/3 mx-auto p-2 text-sm space-x-4 text-center font-black'
              onClick={modalHandler}
            >
              Cancel
            </button>
            <button
              className='bg-red-400  text-white  rounded-md w-1/3 mx-auto p-2 text-sm space-x-4 text-center font-black'
              onClick={() => {
                userDeleteHandler()
                modalHandler()
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteUser
