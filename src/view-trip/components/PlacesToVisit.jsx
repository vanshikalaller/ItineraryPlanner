import React from 'react';
import { FaHandPointRight } from "react-icons/fa";
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
    if (!trip || !trip.tripData || !trip.tripData.itinerary) {
        return <div>No trip data available</div>;
    }

    // Convert keys to an array, sort them, then map over the sorted keys
    const sortedDays = Object.keys(trip.tripData.itinerary)
        .sort((a, b) => {
            // Extract numeric part from dayKey (assuming dayKey is in format "day1", "day2", etc.)
            const numA = parseInt(a.replace('day', ''));
            const numB = parseInt(b.replace('day', ''));
            return numA - numB; // Sort in ascending order
        });

    return (
        <div>
            <h2 className='font-bold text-lg '>Places To Visit</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-5 mt-4'>
                {sortedDays.map((dayKey, index) => (
                    <div key={index} className="day-section mt-3 gap-5">
                        <h2 className='font-bold text-lg'>{dayKey.toUpperCase()}</h2>
                        <div className='grid md:grid-cols-2 gap-5'>
                            <div className="places">
                                {trip.tripData.itinerary[dayKey].plan.map((place, idx) => (
                                    <div key={idx} className="place-section my-1 flex">
                                        <PlaceCardItem place={place} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlacesToVisit;

