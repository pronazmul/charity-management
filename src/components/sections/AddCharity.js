import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import { addCharitySchema } from './../validationShemas/YupValidationSchemas'

const AddCharity = () => {
  const formik = useFormik({
    initialValues: {
      item: '',
      category: '',
      charityFor: '',
      quantity: '',
      unit: '',
      netPrice: '',
      city: '',
      division: '',
    },
    validationSchema: addCharitySchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        await axios.post(
          'http://103.107.184.159:5001/api/v1/charity',
          values,
          config
        )
        resetForm()
        toast.success('Charity Added Successfully!')
      } catch (error) {
        toast.error('Failed To add Charity!')
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
              Add Charity
            </h3>
          </div>
          <div className='bg-white p-4 shadow rounded-lg'>
            <form
              onSubmit={handleSubmit}
              className=' text xs lg:text-sm text text-gray-600 space-y-2'
            >
              <div className='space-y-2'>
                <label className='block font-semibold'>Charity Item</label>
                <input
                  type='text'
                  name='item'
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
                  <label className='block font-semibold'>
                    Charity Category
                  </label>
                  <input
                    type='text'
                    name='category'
                    placeholder='Charity Category'
                    onChange={handleChange}
                    className={`input-box placeholder-gray-300 ${
                      errors && !errors.category && 'success'
                    }`}
                    required
                  />
                  {values.category && errors && errors.category && (
                    <span className='text-xs text-red-500 font-medium'>
                      {errors.category}
                    </span>
                  )}
                </div>
                <div className='space-y-2 w-full'>
                  <label className='block font-semibold'>Charity For</label>
                  <input
                    type='text'
                    name='charityFor'
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
              </div>
              <div className='lg:flex lg:justify-between lg:space-x-3 lg:items-baseline w-full space-y-2'>
                <div className='space-y-2 w-full'>
                  <label className='block font-semibold'>Item Quantity</label>
                  <input
                    type='text'
                    name='quantity'
                    placeholder='Item Quantity'
                    onChange={handleChange}
                    className={`input-box placeholder-gray-300 ${
                      errors && !errors.quantity && 'success'
                    }`}
                    required
                  />
                  {values.quantity && errors && errors.quantity && (
                    <span className='text-xs text-red-500 font-medium'>
                      {errors.quantity}
                    </span>
                  )}
                </div>
                <div className='space-y-2 w-full'>
                  <label className='block font-semibold'>Item Unit</label>
                  <input
                    type='text'
                    name='unit'
                    placeholder='like kg, pcs ...etc'
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
                  <label className='block font-semibold'>Net Price</label>
                  <input
                    type='text'
                    name='netPrice'
                    placeholder='Net Price Each Item'
                    onChange={handleChange}
                    className={`input-box placeholder-gray-300 ${
                      errors && !errors.netPrice && 'success'
                    }`}
                    required
                  />
                  {values.netPrice && errors && errors.netPrice && (
                    <span className='text-xs text-red-500 font-medium'>
                      {errors.netPrice}
                    </span>
                  )}
                </div>
                <div className='space-y-2 w-full'>
                  <label className='block font-semibold'>Charity City</label>
                  <input
                    type='text'
                    name='city'
                    placeholder='Enter city to charity'
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
              </div>
              <div className='space-y-2'>
                <label className='block font-semibold'>Charity Division</label>
                <input
                  type='text'
                  name='division'
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
              <div className='max-w-xs mx-auto pt-5'>
                <button
                  type='submit'
                  className='border border-primary px-6 rounded bg-primary text-white py-2 hover:bg-transparent hover:text-gray-600 font-semibold transition duration-300 w-full'
                >
                  Add Charity
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCharity
