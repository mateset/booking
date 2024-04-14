import React from 'react';
import Context from '../components/Context';

const PendingSeatsList = ({ seat, handleApprove, handleDelete }) => {
  const {
    userName,
    phoneNumber,
    pickupLocation,
    deliveryLocation,
    seatNumber,
    travelDirection,
  } = seat;
  const createdAtDate = new Date(seat.createdAt);
  const options = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Yangon',
  };
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
          />
        </div>
      </div>
      <div className='flex mt-2'>
        <button
          onClick={() => handleApprove(seat._id)}
          className='bg-green-500 text-white px-4 py-2 mr-2 hover:bg-green-400 hover:border-2  hover:border-green-500 active:drop-shadow-md rounded'
        >
          Approve
        </button>
        <button
          onClick={() => handleDelete(seat._id)}
          className='bg-red-500 text-white px-4 py-2 hover:bg-red-400 hover:border-2 hover:border-red-500 active:drop-shadow-md rounded'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PendingSeatsList;
