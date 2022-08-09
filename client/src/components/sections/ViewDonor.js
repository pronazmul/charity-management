import React from 'react'
import axios from 'axios'
import ErrorMessage from '../elements/ErrorMessage'
import Loader from './../elements/Loader'

const ViewDonor = ({ id, modalHandler }) => {
  const [donor, setDonor] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get(
          `http://103.107.184.159:5001/api/v1/donors/${id}`
        )
        setDonor(response.data.data)
      } catch (error) {
        setDonor(null)
        setError('Unable To Fetch Data!')
      }
    }
    getDetails()
  }, [])

  return (
    <>
      <div className='m-2 bg-white rounded-lg shadow-lg overflow-hidden pb-4'>
        <div className='bg-primary p-4 rounded-b-full rounded-t-2xl'>
          <h1 className='text-white text-2xl font-black'>Donor Details</h1>
        </div>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : donor ? (
          <div className='text-md text-gray-600 px-16 py-6 space-y-3'>
            <div className='flex justify-between text-left'>
              <div className='text-left'>
                <p className='text-primary font-black'>Donor Name</p>
                <p>{donor?.name}</p>
              </div>
              <div className='text-left'>
                <p className='text-primary font-black'>Donor Email</p>
                <p>{donor?.email}</p>
              </div>
            </div>

            <div className='flex justify-between text-left'>
              <div className='text-left'>
                <p className='text-primary font-black'>Donor Phone</p>
                <p>{donor?.mobile}</p>
              </div>
              <div className='block text-left'>
                <p className='text-primary font-black'>Organization/Self</p>
                <p>{donor?.organization}</p>
              </div>
            </div>

            <div className='flex justify-between text-left'>
              <div>
                <p className='text-primary font-black'>Total Amount</p>
                <p>{donor?.amount}</p>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
        <button
          className='bg-primary  text-white  rounded-md w-1/3 mx-auto p-2 text-sm space-x-4 text-center font-black'
          onClick={modalHandler}
        >
          Close
        </button>
      </div>
    </>
  )
}

export default ViewDonor
