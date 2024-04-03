import React from 'react';

const ApprovedSeatsList = ({ seat, handleCancel, handleDelete }) => {
  const createdAtDate = new Date(seat.updatedAt);

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
        <strong>Approved At:</strong> {formattedTime}
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
