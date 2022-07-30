import React from 'react'

const Loader = () => {
  return (
    <div class=' flex justify-center items-center w-full h-full my-12'>
      <div class='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary'></div>
    </div>
  )
}

export default Loader
