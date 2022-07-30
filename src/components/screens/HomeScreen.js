import React, { useState } from 'react'
import Header from '../common/Header'
import { useLocation } from 'react-router-dom'
import Dashboard from './../sections/Dashboard'
import AllProducts from './../sections/AllProducts'
import AddProducts from './../sections/AddProducts'
import AllUser from './../sections/AllUser'
import AddUser from './../sections/AddUser'
import SuspandedUser from './../sections/SuspandedUser'
import PendingRequest from './../sections/PendingRequest'
import DextopSidebar from './../common/DextopSidebar'
import MobileSidebar from './../common/MobileSidebar'

const HomeScreen = () => {
  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : 'dashboard'
  const [dextopSidebar, setDextopSidebar] = useState(true)
  const [floatingSidebar, setFloatingSidebar] = useState(false)
  const foatingSidebarHandler = () => setFloatingSidebar(!floatingSidebar)

  const renderSection = (params) => {
    switch (params) {
      case 'dashboard':
        return <Dashboard />
      case 'all_donors':
        return <AllProducts />
      case 'add_donor':
        return <AddProducts />
      case 'all_charity':
        return <AllUser />
      case 'add_charity':
        return <AddUser />
      case 'all_users':
        return <SuspandedUser />
      case 'add_user':
        return <PendingRequest />
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