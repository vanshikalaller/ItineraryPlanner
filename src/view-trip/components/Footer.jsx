import React from 'react'
import { FaRegCopyright } from "react-icons/fa";

function Footer({trip}) {
  return (
    <div className='flex justify-center items-center mt-7'>
      <h2 className='flex items-center'>
        <FaRegCopyright className='mr-2' /> Created by Vanshika
      </h2>
    </div>
  )
}

export default Footer;
