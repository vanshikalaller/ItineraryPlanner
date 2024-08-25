import { Button } from '@/components/ui/button';
import React from 'react'
import { FaRegClock } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
    return (
        <Link to= {'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank'>
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover: scale-105 transition-all hover: shadow-md cursor-pointer'>
        
        <div className='hover:scale-105 transition-all shadow-md cursor-pointer'>
          <h2 className='font-bold text-md mt-2 '>{place.placeName}</h2>
          <p className='text-sm text-gray-500 my-2'>{place.placeDetails}</p>
          <div className='mt-2 flex items-center'>
            <FaRegClock className='mr-2' />
            <span>{place.timeTravel}</span>
          </div>
          <Button size= "sm"><FaLocationArrow /></Button>
        </div>
      </div>
      </Link>
    )
  }

export default PlaceCardItem
