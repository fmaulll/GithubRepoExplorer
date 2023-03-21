import React from 'react'
import {AiOutlineLoading3Quarters} from "react-icons/ai"

const ModalLoader = () => {
  return (
    <div className='fixed h-screen justify-center items-center'>
        <div className='flex flex-column justify-center items-center'>
            Loading...
        <AiOutlineLoading3Quarters className='animate-spin' />
        </div>
    </div>
  )
}

export default ModalLoader