import React from 'react'
import { Link } from 'react-router-dom'
import BadgeIcon from './../elements/BadgeIcon'
import DropDownMenu from './../elements/DropDownMenu'
import { userDropDownData } from './../data'
import useAuth from '../Hooks/useAuth'
import AutoSuggestBox from '../elements/AutoSuggestBox'

const Header = ({ dextopSidebar, setDextopSidebar, foatingSidebarHandler }) => {
  const { user } = useAuth()

  return (
    <div className='bg-white shadow-sm'>
      <div className='py-2 px-3'>
        <div className='flex items-center justify-between '>
          <div className='flex items-center w-full '>
            {/* Manu Show/Hide toggler Icon */}
            <div className='dextopMenuIcon hidden lg:block'>
              <button
                onClick={() => setDextopSidebar(!dextopSidebar)}
                className=''
              >
                {dextopSidebar ? (
                  <BadgeIcon icon='fas fa-angle-double-left' />
                ) : (
                  <BadgeIcon icon='fas fa-angle-double-right' />
                )}
              </button>
            </div>
            <div className='mobileMenuIcon lg:hidden'>
              <button onClick={foatingSidebarHandler} className=''>
                <BadgeIcon icon='fas fa-angle-double-right' />
              </button>
            </div>
            {/* AutoSuggest Box */}
            <div className='max-w-2xl  w-full'>
              <AutoSuggestBox />
            </div>
          </div>
          <div className='flex items-center w-full justify-end'>
            {/* Icons */}
            <div className='flex items-center space-x-4 pr-4'>
              <Link to=''>
                <BadgeIcon icon='far fa-envelope' badge='1' />
              </Link>
              <Link to=''>
                <BadgeIcon icon='far fa-bell' badge='1' />
              </Link>
              <div className=''>
                <DropDownMenu data={userDropDownData}>
                  <img
                    className='w-10 h-10 rounded-full shadow-sm'
                    src={user.avatar}
                    alt='Avatar'
                  />
                </DropDownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
