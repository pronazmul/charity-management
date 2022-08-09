import React from 'react'
import axios from 'axios'
import Loader from '../elements/Loader'
import ErrorMessage from '../elements/ErrorMessage'

const ViewUser = ({ id, modalHandler }) => {
  const [user, setUser] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get(
          `http://103.107.184.159:5001/api/v1/users/${id}`
        )
        setUser(response.data.data)
      } catch (error) {
        setUser(null)
        setError('Unable To Fetch Data!')
      }
    }
    getDetails()
  }, [])

  return (
    <>
      <div className='m-2'>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : user ? (
          <div className='p-4 space-y-4 h-96 bg-transparent'>
            <div className='shadow rounded-xl relative h-auto '>
              <div className='bg-primary p-20 rounded-xl'></div>
              <div className='bg-white max max-w-md mx-auto rounded-xl absolute top-24 left-0 right-0 shadow-md'>
                <div className='p-12 rounded-lg relative'>
                  <div className='absolute -top-12 left-0 right-0 w-full'>
                    <img
                      className='w-24 h-24 rounded-full shadow-md mx-auto'
                      src='http://103.107.184.159:5001/uploads/users/avatar.jpg'
                      alt='Avatar'
                    />
                  </div>
                  <div className='text-md text-gray-600 divide-y-2 divide-gray-100 my-4'>
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
                  <button
                    className='bg-primary  text-white  rounded-md w-1/3 mx-auto p-2 text-sm space-x-4 text-center font-black'
                    onClick={modalHandler}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  )
}

export default ViewUser
