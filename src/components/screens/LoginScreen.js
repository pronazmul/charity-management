import React, { useState } from 'react'
import { useFormik } from 'formik'
import { loginSchema } from '../validationShemas/YupValidationSchemas'
import useAuth from '../Hooks/useAuth'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const LoginScreen = () => {
  const navigate = useNavigate()
  //Login Redirect
  const { message, user, login } = useAuth()

  // Handle Login
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password)
        if (message.status === 1) {
          toast.success('login Success!')
        } else {
          toast.error('Authentication failed')
        }
      } catch (error) {
        toast.error('Authentication failed')
      }
    },
  })

  React.useEffect(() => {
    if (user?.email) {
      navigate('/')
    } else {
      return false
    }
  }, [user, navigate])

  const { handleChange, handleSubmit, errors, values } = formik
  const [passwordViewer, setPasswordViewer] = useState('password')

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <div className='container w-full h-full my-20 relative'>
        <div className='max-w-sm mx-auto shadow rounded px-6 py-8 overflow-hidden text-xs lg:text-sm'>
          <h3 className='text-lg lg:text-xl capitalize font-bold mb-2 text-primary text-center'>
            Shuvosangho Charity
          </h3>
          <form onSubmit={handleSubmit} className=' space-y-3'>
            <div className='space-y-2'>
              <label className='block text-gray-600 font-semibold'>Email</label>
              <input
                type='text'
                name='email'
                onChange={handleChange}
                placeholder='Enter your email address'
                className={`input-box ${errors && !errors.email && `success`}`}
              />
              {values.email && errors && errors.email && (
                <span className='text-xs text-primary font-medium'>
                  {errors.email}
                </span>
              )}
            </div>
            <div className='space-y-2 relative'>
              <label className='block text-gray-600 font-semibold'>
                Password
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
                placeholder='Enter your password'
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
            <button
              type='submit'
              className='border border-primary w-full rounded bg-primary text-white py-2 hover:bg-transparent hover:text-gray-800 font-bold transition duration-300'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginScreen
