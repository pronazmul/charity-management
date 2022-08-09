import React, { useState } from 'react'
import { autoSuggestFilter } from '../utilities/commonMethods'
import { dashBoardDSidebarLinks } from './../data'
import { Link } from 'react-router-dom'

const AutoSuggestBox = () => {
  const [autoSuggestQuery, setAutoSuggestQuery] = useState('')

  const suggestedLinks = autoSuggestFilter(
    dashBoardDSidebarLinks,
    autoSuggestQuery
  )

  return (
    <div className='w-full p-3 relative'>
      <span className=' absolute left-7 text-gray-400  cursor-pointer hover:text-primary top-5'>
        <i className='fas fa-search'></i>
      </span>
      {autoSuggestQuery && (
        <span
          onClick={() => setAutoSuggestQuery('')}
          className=' absolute right-7 text-gray-400 cursor-pointer hover:text-primary top-5'
        >
          <i className='fas fa-times'></i>
        </span>
      )}
      <input
        className='input-box rounded-2xl pl-10 py-2'
        type='text'
        placeholder='Search By Anything....'
        value={autoSuggestQuery}
        onChange={(e) => setAutoSuggestQuery(e.target.value)}
      />

      {autoSuggestQuery && (
        <div
          className={`absolute left-0 top-full bg-white shadow-md w-full p-3 divide-y divide-gray-300 divide-dashed transition duration-300 lg:text-sm text-xs font-semibold z-20 rounded-md opacity-0${
            autoSuggestQuery && `opacity-100`
          }`}
        >
          {suggestedLinks && suggestedLinks.length ? (
            suggestedLinks.map((item) => (
              <Link to={`/?tab=${item.sublink}`}>
                <p
                  onClick={() => setAutoSuggestQuery('')}
                  className='p-2 hover:bg-gray-100 rounded-md text-gray-700'
                >
                  {item.name}
                </p>
              </Link>
            ))
          ) : (
            <p className='text-gray-700 '>No Matched Found!</p>
          )}
        </div>
      )}
    </div>
  )
}

export default AutoSuggestBox
