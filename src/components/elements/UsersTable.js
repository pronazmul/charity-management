import { useState } from 'react'
import { entitiesData } from '../data'
import DropDownMenu from '../elements/DropDownMenu'
import BadgeIcon from './../elements/BadgeIcon'
import CustomSelectList from './../elements/CustomSelectList'
import { productListDropdown } from './../data'
import { usersFilter } from './../utilities/commonMethods'
import NothingFound from './../elements/NothingFound'
import CustomPagination from './../elements/CustomPagination'

const UsersTable = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [entities, setEntities] = useState(entitiesData[0])

  const { filteredData, pages, totalData, startAt } = usersFilter(
    searchQuery,
    currentPage,
    entities,
    data
  )

  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <div className='px-2 flex justify-between bg-white items-baseline'>
              <div className='max-w-2xl p-3 w-full relative'>
                <span className=' absolute left-7 text-gray-400  cursor-pointer hover:text-primary top-5'>
                  <i className='fas fa-search'></i>
                </span>
                {searchQuery && (
                  <span
                    onClick={() => setSearchQuery('')}
                    className=' absolute right-7 text-gray-400 cursor-pointer hover:text-primary top-5'
                  >
                    <i className='fas fa-times'></i>
                  </span>
                )}
                <input
                  className='input-box rounded-2xl pl-10 py-2'
                  type='text'
                  placeholder='Search users by name, email'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className=''>
                <CustomSelectList
                  data={entitiesData}
                  selected={entities}
                  setSelected={setEntities}
                />
              </div>
            </div>
            {filteredData && filteredData.length ? (
              <>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50 font-black'>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider'
                      >
                        Name
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider'
                      >
                        Email
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider'
                      >
                        Mobile
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider'
                      >
                        Roles
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider'
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {filteredData.map((item) => (
                      <tr key={item._id}>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div className='flex-shrink-0 h-10 w-10'>
                              <img
                                className='h-10 w-10 rounded-full'
                                src={
                                  item?.image ||
                                  '/public/images/logo/avatar.png'
                                }
                                alt=''
                              />
                            </div>
                            <div className='ml-4'>
                              <div className='text-sm font-medium text-gray-900'>
                                {item.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm text-gray-900'>
                            {item.email}
                          </div>
                        </td>
                        <td className='text-sm text-gray-900 px-6 py-4 whitespace-nowrap'>
                          {item.mobile}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {item.roles[0]}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                          <DropDownMenu data={productListDropdown}>
                            <BadgeIcon icon='fas fa-hand-pointer' />
                          </DropDownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className=''>
                  <CustomPagination
                    pages={pages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalData={totalData}
                    startAt={startAt}
                    endAt={filteredData.length + startAt}
                  />
                </div>
              </>
            ) : (
              <NothingFound></NothingFound>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersTable
