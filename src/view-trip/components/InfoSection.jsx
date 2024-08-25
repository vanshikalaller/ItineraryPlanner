import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { FaShareAlt } from "react-icons/fa";

const PHOTO_REF_URL = 'https://maps.googleapis.com/maps/api/place/photo?maxHeight=600&maxWidth=600&photoreference={NAME}&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip }) {

    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        if (trip) {
            GetPlacePhoto();
        }
    }, [trip]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        };
        const result = await GetPlaceDetails(data);
        console.log(result);
        const photoRef = result.data.places[0]?.photos[3]?.name;
        if(photoRef){
            const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
            console.log(photoUrl);
            setPhotoUrl(photoUrl);
        }
        else{
            console.error('Photo reference not found');
        }
    };

    return (
        <div>
            {/* <img src={photoUrl} className='h-[340px] w-full object-cover rounded-xl' alt='Place' /> */}
            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅{trip.userSelection?.noOfDays} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💵{trip.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 No. of Traveler: {trip.userSelection?.traveler} </h2>
                    </div>
                </div>
                <Button><FaShareAlt /></Button>
            </div>
        </div>
    );
}

export default InfoSection;

