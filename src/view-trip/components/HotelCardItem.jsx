import React from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({hotel}) {
  return (
      <div>
      <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotelName+","+hotel?.hotelAddress} target='_blank'>
                <div className='hover: scale-110 transition-all'>
                    <img src= "" className='rounded-xl'/>
                    <div className='my-2 flex flex-col gap-2 cursor-pointer'>
                        <h2 className='font-medium'>{hotel?.hotelName}</h2>
                        <h2 className='text-xs text-gray-500'>📍{hotel?.hotelAddress}</h2>
                        <h2 className='text-sm '>💰 {hotel?.price}</h2>
                        <h2 className='text-sm '>⭐ {hotel?.rating}</h2>                    
                    </div>
                </div>
                </Link>
    
    </div>
  )
}

export default HotelCardItem
