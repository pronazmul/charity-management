import axios from 'axios'
import React from 'react'
import ErrorMessage from './../elements/ErrorMessage'
import Loader from './../elements/Loader'
import { Link } from 'react-router-dom'
import DataTable from '../elements/DataTable'
import CustomModal from './../elements/CustomModal'
import ViewUser from './ViewUser'
import DeleteUser from './DeleteUser'
import UpdateUser from './UpdateUser'

const AllUser = () => {
  const [users, setUsers] = React.useState(null)
  const [error, setError] = React.useState(null)
  let [updateRequired, setUpdateRequired] = React.useState(false)

  // Modal Functionalities
  const [viewModal, setViewModal] = React.useState(false)
  const [editModal, setEditModal] = React.useState(false)
  const [deleteModal, setDeleteModal] = React.useState(false)
  const [userId, setUserID] = React.useState(null)

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
          'http://103.107.184.159:5001/api/v1/users'
        )
        setUsers(response.data.data)
        setError(null)
      } catch (error) {
        setUsers(null)
        setError('Unable To Fetch Data!')
      }
    }
    getDetails()
  }, [updateRequired])

  return (
    <div className='m-2'>
      {/* Edit/Update/Delete Modal Handlers */}
      {viewModal && (
        <CustomModal open={viewModal} modalHandler={modalCloser}>
          <ViewUser id={userId} modalHandler={modalCloser} />
        </CustomModal>
      )}
      {editModal && (
        <CustomModal open={editModal} modalHandler={modalCloser}>
          <UpdateUser
            id={userId}
            modalHandler={modalCloser}
            update={setUpdateRequired}
          />
        </CustomModal>
      )}
      {deleteModal && (
        <CustomModal open={deleteModal} modalHandler={modalCloser}>
          <DeleteUser
            id={userId}
            modalHandler={modalCloser}
            update={setUpdateRequired}
          />
        </CustomModal>
      )}

      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : users ? (
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
                Users List
              </h3>
              <Link
                to='?tab=add_user'
                className='  text-gray-500 font-semibold border bg-white shadow-md rounded-lg px-4 py-2 text-sm hover:bg-primary hover:text-white transition duration-300'
              >
                Add User
                <span>
                  <i className='fas fa-plus ml-2'></i>
                </span>
              </Link>
            </div>
          </div>
          <DataTable
            data={users}
            columns={['name', 'email', 'mobile', 'roles']}
            searchBy={['name', 'email', 'mobile']}
            setModal={setModal}
            setItem={setUserID}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default AllUser
