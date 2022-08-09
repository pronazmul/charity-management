import axios from 'axios'
import React from 'react'
import ErrorMessage from './../elements/ErrorMessage'
import Loader from './../elements/Loader'
import { Link } from 'react-router-dom'
import DataTable from '../elements/DataTable'
import CustomModal from '../elements/CustomModal'
import ViewCharity from './ViewCharity'
import DeleteCharity from './DeleteCharity'
import UpdateCharity from './UpdateCharity'

const AllCharity = () => {
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)
  let [updateRequired, setUpdateRequired] = React.useState(false)

  // Modal Functionalities
  const [viewModal, setViewModal] = React.useState(false)
  const [editModal, setEditModal] = React.useState(false)
  const [deleteModal, setDeleteModal] = React.useState(false)
  const [charityId, setCharityId] = React.useState(null)

  const modalCloser = () => {
    setViewModal(false)
    setEditModal(false)
    setDeleteModal(false)
  }
  const setModal = (type) => {
    switch (type) {
      case 'view':
        modalCloser()
        setViewModal(true)
        break
      case 'edit':
        modalCloser()
        setEditModal(true)
        break
      case 'delete':
        modalCloser()
        setDeleteModal(true)
        break
      default:
        return false
    }
  }

  React.useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get(
          'http://103.107.184.159:5001/api/v1/charity'
        )
        setData(response.data.data)
        setError(null)
      } catch (error) {
        setData(null)
        setError('Unable To Fetch Data!')
      }
    }
    getDetails()
  }, [updateRequired])

  return (
    <div className='m-2'>
      {/* Edit/Update/Delete Modal Handler */}
      {viewModal && (
        <CustomModal open={viewModal} modalHandler={modalCloser}>
          <ViewCharity id={charityId} modalHandler={modalCloser} />
        </CustomModal>
      )}
      {editModal && (
        <CustomModal open={editModal} modalHandler={modalCloser}>
          <UpdateCharity
            id={charityId}
            modalHandler={modalCloser}
            update={setUpdateRequired}
          />
        </CustomModal>
      )}
      {deleteModal && (
        <CustomModal open={deleteModal} modalHandler={modalCloser}>
          <DeleteCharity
            id={charityId}
            modalHandler={modalCloser}
            update={setUpdateRequired}
          />
        </CustomModal>
      )}
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : data ? (
        <div className='p-2 space-y-2'>
          {/* All Information Title */}
          <div className='flex relative pl-10 py-3 '>
            <div className='absolute -left-1'>
              <span className='bg-primary h-8 w-8 rounded-full text-white flex justify-center items-center'>
                <i className='fas fas fa-gift'></i>
              </span>
            </div>
            <div className=' w-full flex justify-between items-baseline'>
              <h3 className='text-sm lg:text-base font-black text-gray-600 uppercase'>
                All Charity
              </h3>
              <Link
                to='?tab=add_charity'
                className='  text-gray-500 font-semibold border bg-white shadow-md rounded-lg px-4 py-2 text-sm hover:bg-primary hover:text-white transition duration-300'
              >
                Add Charity
                <span>
                  <i className='fas fa-plus ml-2'></i>
                </span>
              </Link>
            </div>
          </div>
          <DataTable
            data={data}
            columns={[
              'item',
              'charityFor',
              'quantity',
              'unit',
              'total',
              'city',
              'division',
            ]}
            searchBy={['item', 'charityFor', 'unit', 'city', 'division']}
            setModal={setModal}
            setItem={setCharityId}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default AllCharity
