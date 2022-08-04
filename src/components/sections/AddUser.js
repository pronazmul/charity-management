import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { addUserSchema } from '../validationShemas/YupValidationSchemas'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'

const AddUser = () => {
  const [passwordViewer, setPasswordViewer] = React.useState('password')
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
    },
    validationSchema: addUserSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        await axios.post(
          'http://103.107.184.159:5001/api/v1/users',
          values,
          config
        )
        resetForm()
        toast.success('User Added Successfully!')
      } catch (error) {
        toast.error('Failed To add User!')
        console.log({ error })
      }
    },
  })
  const { handleChange, handleSubmit, errors, values } = formik

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <div className='m-2'>
        <div className='p-4 space-y-4'>
          <div className='flex space-x-4 items-baseline'>
            <span className='bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center'>
              <i className='fas fas fa-gift' />
            </span>
            <h3 className='text-gray-500 text-sm lg:text-base font-black uppercase'>
              Add User
            </h3>
          </div>
          <div className='bg-white p-4 shadow rounded-lg'>
            <form
              onSubmit={handleSubmit}
              className=' text xs lg:text-sm text text-gray-600 space-y-2'
            >
              <div className='space-y-2'>
                <label className='block font-semibold'>User Name</label>
                <input
                  type='text'
                  name='name'
                  placeholder='User Name'
                  onChange={handleChange}
                  className={`input-box placeholder-gray-300 ${
                    errors && !errors.name && 'success'
                  }`}
                  required
                />
                {values.name && errors && errors.name && (
                  <span className='text-xs text-red-500 font-medium'>
                    {errors.name}
                  </span>
                )}
              </div>
              <div className='lg:flex lg:justify-between lg:space-x-3 lg:items-baseline w-full space-y-2'>
                <div className='space-y-2 w-full'>
                  <label className='block font-semibold'>User Email</label>
                  <input
                    type='email'
                    name='email'
                    placeholder='User Email'
                    onChange={handleChange}
                    className={`input-box placeholder-gray-300 ${
                      errors && !errors.email && 'success'
                    }`}
                    required
                  />
                  {values.email && errors && errors.email && (
                    <span className='text-xs text-red-500 font-medium'>
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className='space-y-2 w-full'>
                  <label className='block font-semibold'>User Mobile</label>
                  <input
                    type='text'
                    name='mobile'
                    placeholder='User Mobile Number'
                    onChange={handleChange}
                    className={`input-box placeholder-gray-300 ${
                      errors && !errors.mobile && 'success'
                    }`}
                    required
                  />
                  {values.mobile && errors && errors.mobile && (
                    <span className='text-xs text-red-500 font-medium'>
                      {errors.mobile}
                    </span>
                  )}
                </div>
              </div>
              <div className='space-y-2 relative'>
                <label className='block text-gray-600 font-semibold'>
                  User Password
                </label>
                <span className='absolute right-3 top-8 text-gray-500 cursor-pointer'>
                  {passwordViewer === 'password' ? (
                    <i
                      onClick={() => setPasswordViewer('text')}
                      className='far fa-eye'
                    ></i>
                  ) : (
                    <i
                      onClick={() => setPasswordViewer('password')}
                      className='far fa-eye-slash'
                    ></i>
                  )}
                </span>
                <input
                  type={passwordViewer}
                  name='password'
                  onChange={handleChange}
                  placeholder='User Password'
                  className={`input-box ${
                    errors && !errors.password && `success`
                  }`}
                />
                {values.password && errors && errors.password && (
                  <span className='text-xs text-primary font-medium'>
                    {errors.password}
                  </span>
                )}
              </div>
              <div className='max-w-xs mx-auto pt-5'>
                <button
                  type='submit'
                  className='border border-primary px-6 rounded bg-primary text-white py-2 hover:bg-transparent hover:text-gray-600 font-semibold transition duration-300 w-full'
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddUser
