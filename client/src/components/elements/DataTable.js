import { useState } from 'react'
import { entitiesData } from '../data'
import BadgeIcon from './BadgeIcon'
import CustomSelectList from './CustomSelectList'
import { dataTableFilter } from '../utilities/commonMethods'
import NothingFound from './NothingFound'
import CustomPagination from './CustomPagination'
import { dataTableDropdown } from './../data'
import DataTableDropdown from './DataTableDropDown'

const DataTable = ({ data, searchBy, columns, setModal, setItem }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [entities, setEntities] = useState(entitiesData[0])

  const { filteredData, pages, totalData, startAt } = dataTableFilter(
    searchQuery,
    currentPage,
    entities,
    data,
    searchBy
  )

  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            {/* Table Header */}
            <div className='px-2 flex justify-between bg-white items-baseline'>
              {/* Search Input */}
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
                  placeholder={`Search By ${searchBy.join(' ')}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {/* Entities Input */}
              <div className=''>
                <CustomSelectList
                  data={entitiesData}
                  selected={entities}
                  setSelected={setEntities}
                />
              </div>
            </div>
            {/* Table Body */}
            {filteredData && filteredData.length ? (
              <>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50 font-black'>
                    <tr>
                      {columns.map((v, i) => (
                        <th
                          key={i}
                          scope='col'
                          className='px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider'
                        >
                          {v}
                        </th>
                      ))}
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
                        {columns.map((v) => (
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm font-medium text-gray-900'>
                              {item[v]}
                            </div>
                          </td>
                        ))}
                        <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                          <DataTableDropdown
                            data={dataTableDropdown}
                            setModal={setModal}
                            setItem={setItem}
                            object={item}
                          >
                            <BadgeIcon icon='fas fa-hand-pointer' />
                          </DataTableDropdown>
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

export default DataTable
