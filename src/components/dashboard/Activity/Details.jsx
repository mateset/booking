import React from 'react';
import Context from '../components/Context';

const Details = ({ data }) => {
  const {
    userName,
    phoneNumber,
    pickupLocation,
    deliveryLocation,
    carTime,
    seatNumber,
    travelDirection,
    message,
    bookingDate,
  } = data.booking_id;
  const { createdAt } = data;
  const createdAtDate = new Date(createdAt);

  // Format options for toLocaleString
  const options = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Yangon',
  };

  // Format the time in Myanmar time
  const formattedTime = createdAtDate.toLocaleString('en-US', options);
  return (
    <div className='flex items-center justify-center'>
      <div className='rounded-lg box-border shadow-md w-auto p-4 mt-4 '>
        <div className='bg-transparent flex items-center justify-between mb-2'>
          {data.status === 'approved' ? (
            <span className='text-lg text-blue-500 font-bold mr-2'>
              {data.status}
            </span>
          ) : (
            <span className='text-lg text-red-500 font-bold mr-2'>
              {data.status}
            </span>
          )}
          <span className='text-black-500 text-lg font-bold'>
            Time: {carTime}
          </span>
        </div>
        <Context
          userName={userName}
          phoneNumber={phoneNumber}
          formattedTime={formattedTime}
          pickupLocation={pickupLocation}
          deliveryLocation={deliveryLocation}
          seatNumber={seatNumber}
          travelDirection={travelDirection}
          carTime={carTime}
          bookingDate={bookingDate}
        />
        {message && (
          <div className='flex items-center mb-2'>
            <span className='text-black-500 font-semibold mr-2'>Message: </span>
            <span>{message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
