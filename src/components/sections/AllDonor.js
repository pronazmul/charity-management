import axios from 'axios'
import React from 'react'
import ErrorMessage from './../elements/ErrorMessage'
import Loader from './../elements/Loader'
import { Link } from 'react-router-dom'
import DataTable from '../elements/DataTable'

const AllDonor = () => {
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)
  React.useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get(
          'http://103.107.184.159:5001/api/v1/donors'
        )
        setData(response.data.data)
        setError(null)
      } catch (error) {
        setData(null)
        setError('Unable To Fetch Data!')
      }
    }
    getDetails()
  }, [])
  return (
    <div className='m-2'>
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : data ? (
        <div className='p-2 space-y-2'>
          {/* All Information Title */}
          <div className='flex relative pl-10 py-3 '>
            <div className='absolute -left-1'>
              <span className='bg-primary h-8 w-8 rounded-full text-white flex justify-center items-center'>
                <i className='fas fa-user'></i>
              </span>
            </div>
            <div className=' w-full flex justify-between items-baseline'>
              <h3 className='text-sm lg:text-base font-black text-gray-600 uppercase'>
                Donors List
              </h3>
              <Link
                to='?tab=add_product'
                className='  text-gray-500 font-semibold border bg-white shadow-md rounded-lg px-4 py-2 text-sm hover:bg-primary hover:text-white transition duration-300'
              >
                Add Donor
                <span>
                  <i className='fas fa-plus ml-2'></i>
                </span>
              </Link>
            </div>
          </div>
          <DataTable
            data={data}
            columns={['name', 'email', 'mobile', 'organization', 'amount']}
            searchBy={['name', 'email', 'mobile', 'organization', 'amount']}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default AllDonor
