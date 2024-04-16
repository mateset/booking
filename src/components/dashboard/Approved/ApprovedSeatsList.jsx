import React from 'react';
import Context from '../components/Context';

const ApprovedSeatsList = ({ seat, handleCancel, handleDelete }) => {
  const createdAtDate = new Date(seat.updatedAt);
  const {
    userName,
    phoneNumber,
    pickupLocation,
    deliveryLocation,
    seatNumber,
    travelDirection,
    carTime,
    bookingDate,
  } = seat;
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
    <div className='border p-4 my-2 flex flex-col justify-center items-center'>
      <div className='flex items-center justify-center'>
        <div className='rounded-lg box-border shadow-md w-auto p-4 mt-4 '>
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
        </div>
      </div>
      <div className='flex mt-2'>
        <button
          onClick={() => handleCancel(seat._id)}
          className='bg-blue-500 text-white hover:bg-blue-400 hover:border-blue-500 hover:border-2 active:drop-shadow-md px-4 py-2 mr-2 rounded' // Change the background color to blue
        >
          Cancel
        </button>
        <button
          onClick={() => handleDelete(seat._id)}
          className='bg-red-500 text-white hover:bg-red-400 hover:border-red-500 hover:border-2 active:drop-shadow-md px-4 py-2 rounded' // Change the background color to red
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ApprovedSeatsList;
