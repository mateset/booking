import React from 'react';

const Context = ({
  userName,
  phoneNumber,
  formattedTime,
  pickupLocation,
  deliveryLocation,
  seatNumber,
  travelDirection,
  isApproved,
}) => {
  return (
    <div>
      <div className='flex items-center mb-2'>
        <span className='text-black-500 font-bold mr-2'>အမည်: </span>
        <span>{userName}</span>
      </div>
      <div className='flex items-center mb-2'>
        <span className='text-black-500 font-bold mr-2'>ဖုန်း: </span>
        <span>{phoneNumber}</span>
      </div>
      <div className='flex items-center mb-2'>
        <span className='text-black-500 font-bold mr-2'>Time: </span>
        <span>{formattedTime}</span>
      </div>
      <div className='flex items-center mb-2'>
        <span className='text-black-500 font-bold mr-2'>ကြိုရမည့်လိပ်စာ:</span>
        <span>{pickupLocation}</span>
      </div>
      <div className='flex items-center mb-2'>
        <span className='text-black-500 font-bold mr-2'>ပို့ရမည့်လိပ်စာ</span>
        <span>{deliveryLocation}</span>
      </div>
      <div className='flex items-center mb-2'>
        <span className='text-black-500 font-bold mr-2'>Seat Number: </span>
        <span>{seatNumber}</span>
      </div>
      <div className='flex items-center mb-2'>
        <span className='text-black-500 font-semibold mr-2'>Direction: </span>
        <span>{travelDirection}</span>
      </div>
      {isApproved && (
        <div className='flex items-center mb-2'>
          <span className='text-black-500 font-semibold mr-2'>Approved: </span>
          <span>Yes</span>
        </div>
      )}
    </div>
  );
};

export default Context;
