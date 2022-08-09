import React from 'react'
import axios from 'axios'
import ErrorMessage from '../elements/ErrorMessage'
import Loader from './../elements/Loader'

const ViewCharity = ({ id, modalHandler }) => {
  const [charity, setCharity] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get(
          `http://103.107.184.159:5001/api/v1/charity/${id}`
        )
        setCharity(response.data.data)
      } catch (error) {
        setCharity(null)
        setError('Unable To Fetch Data!')
      }
    }
    getDetails()
  }, [])

  return (
    <>
      <div className='m-2 bg-white rounded-lg shadow-lg overflow-hidden pb-4'>
        <div className='bg-primary p-4 rounded-b-full rounded-t-2xl'>
          <h1 className='text-white text-2xl font-black'>Charity Details</h1>
        </div>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : charity ? (
          <div className='text-md text-gray-600 px-16 py-6 space-y-3'>
            <div className='flex justify-between text-left'>
              <div className='text-left'>
                <p className='text-primary font-black'>Charity Item</p>
                <p>{charity?.item}</p>
              </div>
              <div className='text-left'>
                <p className='text-primary font-black'>Cahrity For</p>
                <p>{charity?.charityFor}</p>
              </div>
            </div>

            <div className='flex justify-between text-left'>
              <div className='text-left'>
                <p className='text-primary font-black'>Quantity</p>
                <p>{charity?.quantity}</p>
              </div>
              <div className='block text-left'>
                <p className='text-primary font-black'>Unit:</p>
                <p>{charity?.unit}</p>
              </div>
            </div>

            <div className='flex justify-between text-left'>
              <div>
                <p className='text-primary font-black'>Total Coast</p>
                <p>{charity?.total}</p>
              </div>
              <div>
                <p className='text-primary font-black'>City:</p>
                <p>{charity?.city}</p>
              </div>
            </div>

            <div className='flex justify-between text-left'>
              <div>
                <p className='text-primary font-black'>Division</p>
                <p>{charity?.division}</p>
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

export default ViewCharity
