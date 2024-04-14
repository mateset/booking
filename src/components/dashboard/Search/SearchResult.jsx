import React from 'react';
import Context from '../components/Context';

const SearchResult = ({ data }) => {
  return (
    <div className='mt-4'>
      {data.map((seat, index) => (
        <div
          key={index}
          className='border p-4 my-2 flex flex-col justify-center items-center'
        >
          {/* <p>
            <strong>Booking Date:</strong> {seat.bookingDate}
          </p>
          <p>
            <strong>Car Time:</strong> {seat.carTime}
          </p>
          <p>
            <strong>Delivery Location:</strong> {seat.deliveryLocation}
          </p>
          <p>
            <strong>Is Approved:</strong> {seat.isApproved ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Message:</strong> {seat.message}
          </p>
          <p>
            <strong>Phone Number:</strong> {seat.phoneNumber}
          </p>
          <p>
            <strong>Pickup Location:</strong> {seat.pickupLocation}
          </p>
          <p>
            <strong>Seat Number:</strong> {seat.seatNumber}
          </p>
          <p>
            <strong>Travel Direction:</strong> {seat.travelDirection}
          </p>
          <p>
            <strong>User Name:</strong> {seat.userName}
          </p> */}
          <div className='flex items-center justify-center'>
            <div className='rounded-lg box-border shadow-md w-auto p-4 mt-4 '>
              <Context
                userName={seat.userName}
                phoneNumber={seat.phoneNumber}
                formattedTime={seat.formattedTime}
                pickupLocation={seat.pickupLocation}
                deliveryLocation={seat.deliveryLocation}
                seatNumber={seat.seatNumber}
                travelDirection={seat.travelDirection}
                isApproved={seat.isApproved}
              />
            </div>
          </div>
          <div className='flex mt-2'></div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
