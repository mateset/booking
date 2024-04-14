import { useEffect, useState } from 'react';
import { getBookingDataForForm } from '../../service/bookingService';
import Loading from '../../utils/Loading';
import { showToast } from '../../utils/Toast';

const BookingForm = ({
  addDataToBook,
  postToServer,
  open,
  setOpen,
  isAdmin,
  book,
  setBook,
  clicked,
  setClicked,
  setDefaultBook,
  handleApproveBooking,
  handleCancleBooking,
  handleDeleteBooking,
  pendingSeats,
  approvedSeats,
}) => {
  const [loading, setLoading] = useState(false);
  const tempFunc = async () => {
    try {
      if (
        !book.bookingDate ||
        !book.carTime ||
        !book.travelDirection ||
        !book.seatNumber
      ) {
        return showToast('Please select date and direction', 'warning');
      }
      setLoading(true);
      const res = await getBookingDataForForm(
        book.bookingDate,
        book.carTime,
        book.travelDirection,
        book.seatNumber
      );
      if (res.data.length === 0) {
        showToast('No data found', 'warning');
        setLoading(false);
        return;
      }
      setBook(res.data[0]);
      setLoading(false);
      setClicked(false);
    } catch (err) {
      setLoading(false);
      showToast(err.response?.data?.message || 'Something went wrong', 'error');
    }
  };

  useEffect(() => {
    if (
      clicked &&
      isAdmin &&
      open &&
      (pendingSeats.includes(book.seatNumber) ||
        approvedSeats.includes(book.seatNumber))
    ) {
      tempFunc();
    }
  }, [clicked, isAdmin]);

  const handleInputChange = (property, evt) => {
    addDataToBook({ [property]: evt.target.value });
  };
  if (loading) return <Loading />;
  if (open) {
    return (
      <div
        className={`absolute z-50 mb w-[80vw] h-auto border border-gray-100 bg-white shadow-lg rounded-lg flex flex-col justify-center items-center p-5 m-5 ${
          open ? '' : 'hidden'
        } mx-auto my-auto`}
      >
        <button
          onClick={() => {
            setOpen(false);
            setClicked(false);
            setDefaultBook();
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 hover:bg-red-100 rounded-full p-1 absolute right-2 top-2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18 18 6M6 6l12 12'
            />
          </svg>
        </button>
        <h1 className='m-2 text-orange-500 font-bold'>Your Information</h1>
        <div className='m-2'>
          <h1>အမည်:</h1>
          <input
            defaultValue={book?.userName ? book.userName : ''}
            onChange={(evt) => handleInputChange('userName', evt)}
            type='text'
            className='w-[64vw] h-[5vh] bg-gray-200 rounded-lg p-4 focus:outline-orange-300'
          />
        </div>
        <div className='m-2'>
          <h1>ဖုန်းနံပါတ်:</h1>
          <input
            defaultValue={book?.phoneNumber ? book?.phoneNumber : ''}
            onChange={(evt) => handleInputChange('phoneNumber', evt)}
            type='text'
            className='w-[64vw] h-[5vh] bg-gray-200 rounded-lg p-4 focus:outline-orange-300'
          />
        </div>
        <div className='m-2'>
          <h1>လာကြိုရမည့်လိပ်စာ:</h1>
          <input
            defaultValue={book?.pickupLocation ? book?.pickupLocation : ''}
            onChange={(evt) => handleInputChange('pickupLocation', evt)}
            type='text'
            className='w-[64vw] h-[5vh] bg-gray-200 rounded-lg p-4 focus:outline-orange-300'
          />
        </div>
        <div className='m-2'>
          <h1>လိုက်ပို့ရမည့် လိပ်စာ:</h1>
          <input
            defaultValue={book?.deliveryLocation ? book?.deliveryLocation : ''}
            onChange={(evt) => handleInputChange('deliveryLocation', evt)}
            type='text'
            className='w-[64vw] h-[5vh] bg-gray-200 rounded-lg p-4 focus:outline-orange-300'
          />
        </div>
        <div className='m-2'>
          <h1>ထပ်မံအကြောင်းကြားစာ:</h1>
          <input
            defaultValue={book?.message ? book?.message : ''}
            onChange={(evt) => handleInputChange('message', evt)}
            type='text'
            className='w-[64vw] h-[5vh] bg-gray-200 rounded-lg p-4 focus:outline-orange-300'
          />
        </div>
        <button
          onClick={postToServer}
          className='m-2 bg-orange-500 hover:bg-orange-300 hover:border-solid hover:border-2 hover:border-orange-600 active:shadow-md text-white w-[24vw] rounded-full p-2'
        >
          Book
        </button>
        {book._id && (
          <div>
            {isAdmin &&
              (book.isApproved ? (
                <button
                  onClick={() => {
                    handleCancleBooking(book?._id);
                  }}
                  className='m-2 bg-orange-500 hover:bg-orange-300 hover:border-solid hover:border-2 hover:border-orange-600 active:shadow-md text-white w-28 rounded-full p-2'
                >
                  Cancle
                </button>
              ) : (
                <button
                  onClick={() => handleApproveBooking(book?._id)}
                  className='m-2 bg-orange-600 hover:bg-orange-300 text-white w-28 rounded-full p-2'
                >
                  Approve
                </button>
              ))}
            {isAdmin && (
              <button
                className='m-2 bg-orange-600 hover:bg-orange-300 hover:border-solid hover:border-2 hover:border-orange-600 active:shadow-md w-32 text-white rounded-full p-2'
                onClick={() => handleDeleteBooking(book?._id)}
              >
                delete
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default BookingForm;
