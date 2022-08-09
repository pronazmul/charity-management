import React from 'react'
import axios from 'axios'
import { Formik } from 'formik'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import Loader from '../elements/Loader'
import ErrorMessage from '../elements/ErrorMessage'
import { truthyValuesFromObject } from '../utilities/commonMethods'
import { updateDonorSchema } from './../validationShemas/YupValidationSchemas'

const UpdateDonor = ({ id, modalHandler, update }) => {
  const [donor, setDonor] = React.useState(null)
  const [error, setError] = React.useState(null)

  // Fetch Current Data
  React.useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get(
          `http://103.107.184.159:5001/api/v1/donors/${id}`
        )
        let result = response?.data?.data
        setDonor(result)
      } catch (error) {
        setDonor(null)
        setError('Unable To Fetch Data!')
      }
    }
    getDetails()
  }, [])

  //   Update Functionalities:
  const updateHandler = async (values) => {
    try {
      let data = truthyValuesFromObject(values)
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.put(
        `http://103.107.184.159:5001/api/v1/donors/${id}`,
        data,
        config
      )
      update()
      toast.success('Updated')
      modalHandler()
    } catch (error) {
      toast.error('Failed To Update!')
      console.log({ error })
    }
  }

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <div className='m-2 bg-white rounded-lg shadow-lg overflow-hidden pb-4'>
        <div className='bg-primary p-4 rounded-b-full rounded-t-2xl'>
          <h1 className='text-white text-2xl font-black'>Donor Update</h1>
        </div>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : donor ? (
          <Formik
            initialValues={{
              name: donor?.name,
              email: donor?.email,
              mobile: donor?.mobile,
              organization: donor?.organization,
            }}
            validationSchema={updateDonorSchema}
            onSubmit={updateHandler}
          >
            {({ handleChange, handleSubmit, errors, values }) => (
              <div className='py-6 px-8'>
                <form
                  onSubmit={handleSubmit}
                  className=' text xs lg:text-sm text text-gray-600 space-y-2'
                >
                  <div className='space-y-2'>
                    <label className='block text-left font-semibold'>
                      Donor Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={values.name}
                      placeholder='Donor Name'
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
                      <label className='block text-left font-semibold'>
                        Donor email
                      </label>
                      <input
                        type='text'
                        name='email'
                        value={values.email}
                        placeholder='Donor email'
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
                      <label className='block text-left font-semibold'>
                        Donor Mobile
                      </label>
                      <input
                        type='text'
                        name='mobile'
                        value={values.mobile}
                        placeholder='Item mobile'
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

                  <div className='space-y-2 w-full'>
                    <label className='block text-left font-semibold'>
                      Organization/Self
                    </label>
                    <input
                      type='text'
                      name='organization'
                      value={values.organization}
                      placeholder='Organization/Self'
                      onChange={handleChange}
                      className={`input-box placeholder-gray-300 ${
                        errors && !errors.organization && 'success'
                      }`}
                      required
                    />
                    {values.organization && errors && errors.organization && (
                      <span className='text-xs text-red-500 font-medium'>
                        {errors.organization}
                      </span>
                    )}
                  </div>

                  <div className='space-x-4'>
                    <button
                      className='bg-primary  text-white  rounded-md w-1/3 mx-auto p-2 text-sm space-x-4 text-center font-black'
                      onClick={modalHandler}
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='bg-red-400  text-white  rounded-md w-1/3 mx-auto p-2 text-sm space-x-4 text-center font-black'
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            )}
          </Formik>
        ) : (
          <Loader />
        )}
      </div>
    </>
  )
}

export default UpdateDonor
