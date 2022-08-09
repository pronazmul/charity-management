import React from 'react'
import axios from 'axios'
import { Formik } from 'formik'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import Loader from '../elements/Loader'
import ErrorMessage from '../elements/ErrorMessage'
import { truthyValuesFromObject } from '../utilities/commonMethods'

const UpdateCharity = ({ id, modalHandler, update }) => {
  const [charity, setCharity] = React.useState(null)
  const [error, setError] = React.useState(null)

  // Fetch Current Data
  React.useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get(
          `http://103.107.184.159:5001/api/v1/charity/${id}`
        )
        let result = response?.data?.data
        setCharity(result)
      } catch (error) {
        setCharity(null)
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
        `http://103.107.184.159:5001/api/v1/charity/${id}`,
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
          <h1 className='text-white text-2xl font-black'>Charity Update</h1>
        </div>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : charity ? (
          <Formik
            initialValues={{
              item: charity?.item,
              charityFor: charity?.charityFor,
              unit: charity?.unit,
              city: charity?.city,
              division: charity?.division,
            }}
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
                      Charity Item
                    </label>
                    <input
                      type='text'
                      name='item'
                      value={values.item}
                      placeholder='Charity Item'
                      onChange={handleChange}
                      className={`input-box placeholder-gray-300 ${
                        errors && !errors.item && 'success'
                      }`}
                      required
                    />
                    {values.item && errors && errors.item && (
                      <span className='text-xs text-red-500 font-medium'>
                        {errors.item}
                      </span>
                    )}
                  </div>
                  <div className='lg:flex lg:justify-between lg:space-x-3 lg:items-baseline w-full space-y-2'>
                    <div className='space-y-2 w-full'>
                      <label className='block text-left font-semibold'>
                        Charity For
                      </label>
                      <input
                        type='text'
                        name='charityFor'
                        value={values.charityFor}
                        placeholder='Charity For'
                        onChange={handleChange}
                        className={`input-box placeholder-gray-300 ${
                          errors && !errors.charityFor && 'success'
                        }`}
                        required
                      />
                      {values.charityFor && errors && errors.charityFor && (
                        <span className='text-xs text-red-500 font-medium'>
                          {errors.charityFor}
                        </span>
                      )}
                    </div>
                    <div className='space-y-2 w-full'>
                      <label className='block text-left font-semibold'>
                        Item Unit
                      </label>
                      <input
                        type='text'
                        name='unit'
                        value={values.unit}
                        placeholder='Item Unit'
                        onChange={handleChange}
                        className={`input-box placeholder-gray-300 ${
                          errors && !errors.unit && 'success'
                        }`}
                        required
                      />
                      {values.unit && errors && errors.unit && (
                        <span className='text-xs text-red-500 font-medium'>
                          {errors.unit}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='lg:flex lg:justify-between lg:space-x-3 lg:items-baseline w-full space-y-2'>
                    <div className='space-y-2 w-full'>
                      <label className='block text-left font-semibold'>
                        Charity City
                      </label>
                      <input
                        type='text'
                        name='city'
                        value={values.city}
                        placeholder='Charity City'
                        onChange={handleChange}
                        className={`input-box placeholder-gray-300 ${
                          errors && !errors.city && 'success'
                        }`}
                        required
                      />
                      {values.city && errors && errors.city && (
                        <span className='text-xs text-red-500 font-medium'>
                          {errors.city}
                        </span>
                      )}
                    </div>
                    <div className='space-y-2 w-full'>
                      <label className='block text-left font-semibold'>
                        Charity Division
                      </label>
                      <input
                        type='text'
                        name='division'
                        value={values.division}
                        placeholder='Charity Division'
                        onChange={handleChange}
                        className={`input-box placeholder-gray-300 ${
                          errors && !errors.division && 'success'
                        }`}
                        required
                      />
                      {values.division && errors && errors.division && (
                        <span className='text-xs text-red-500 font-medium'>
                          {errors.division}
                        </span>
                      )}
                    </div>
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

export default UpdateCharity
