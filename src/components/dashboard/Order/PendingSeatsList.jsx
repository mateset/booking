import React from 'react';

const PendingSeatsList = ({ seat, handleApprove, handleDelete }) => {
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
      <p>
        <strong>User Name:</strong> {seat.userName}
      </p>
      <p>
        <strong>Booking Date:</strong> {seat.bookingDate}
      </p>
      <p>
        <strong>Travel Direction:</strong> {seat.travelDirection}
      </p>
      <p>
        <strong>Car Time:</strong> {seat.carTime}
      </p>
      <p>
        <strong>Confirm at:</strong> {formattedTime}
      </p>
      <p>
        <strong>Phone Number:</strong> {seat.phoneNumber}
      </p>
      <p>
        <strong>Delivery Location:</strong> {seat.deliveryLocation}
      </p>
      <p>
        <strong>Pickup Location:</strong> {seat.pickupLocation}
      </p>
      <p>
        <strong>Message:</strong> {seat.message}
      </p>
      <p>
        <strong>Seat Number:</strong> {seat.seatNumber}
      </p>

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
