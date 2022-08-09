import React, { useState } from 'react'
import Header from '../common/Header'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Dashboard from './../sections/Dashboard'
import AllUser from './../sections/AllUser'
import AddUser from './../sections/AddUser'
import DextopSidebar from './../common/DextopSidebar'
import MobileSidebar from './../common/MobileSidebar'
import AllCharity from './../sections/AllCharity'
import AddCharity from './../sections/AddCharity'
import useAuth from '../Hooks/useAuth'
import AddDonor from '../sections/AddDonor'
import AllDonor from './../sections/AllDonor'
import UserProfile from '../sections/UserProfile'

const HomeScreen = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  let [searchParams, setSearchParams] = useSearchParams()
  const redirect = searchParams.get('tab') || 'dashboard'
  const [dextopSidebar, setDextopSidebar] = useState(true)
  const [floatingSidebar, setFloatingSidebar] = useState(false)
  const foatingSidebarHandler = () => setFloatingSidebar(!floatingSidebar)

  const renderSection = (params) => {
    switch (params) {
      case 'dashboard':
        return <Dashboard />
      case 'profile':
        return <UserProfile />
      case 'all_donors':
        return <AllDonor />
      case 'add_donor':
        return <AddDonor />
      case 'all_charity':
        return <AllCharity />
      case 'add_charity':
        return <AddCharity />
      case 'all_users':
        return <AllUser />
      case 'add_user':
        return <AddUser />
      case 'logout':
        logout()
        navigate('/login')
        return false
      default:
        return <Dashboard />
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 fixed w-full'>
      {/* Header */}
      <div className='header'>
        <div className={`xs:pl-0 ${dextopSidebar ? 'lg:pl-72' : 'lg:pl-0'}`}>
          <Header
            dextopSidebar={dextopSidebar}
            setDextopSidebar={setDextopSidebar}
            foatingSidebarHandler={foatingSidebarHandler}
          />
        </div>
      </div>
      {/* Mobile Floating Sidebar */}
      <MobileSidebar
        floatingSidebar={floatingSidebar}
        foatingSidebarHandler={foatingSidebarHandler}
        redirect={redirect}
      />
      {/* Dextop fixed Sidebar */}
      <div className='hidden lg:block'>
        <div
          className={`dextop ${
            dextopSidebar
              ? 'w-72 h-full fixed z-10 left-0 top-0 inline-block'
              : ' hidden w-0 h-0'
          }`}
        >
          <DextopSidebar redirect={redirect} />
        </div>
        <div className='mobile'></div>
      </div>
      {/* Contant Section */}
      <div className='content h-screen overflow-y-scroll' id='sidebar-scroll'>
        <div
          className={` xs:pl-0 mb-24  ${
            dextopSidebar ? 'lg:pl-72' : 'lg:pl-0'
          }`}
        >
          <div>{renderSection(redirect)}</div>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
