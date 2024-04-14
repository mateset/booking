import React, { useCallback, useEffect, useState } from 'react';
import {
  checkSeatAvailability,
  createBook,
  cancelBooking,
  approveBooking,
  deleteBooking,
} from '../../service/bookingService';
import CarSeatIcon from '../../utils/CarSeatIcon';
import BookingForm from './BookingForm';
import { showToast } from '../../utils/Toast';

const defaultBook = {
  _id: null,
  userName: '',
  phoneNumber: '',
  pickupLocation: '',
  deliveryLocation: '',
  seatNumber: null,
  message: '',
};

const CarInterface = ({
  data: { chosenDirection, choseDate, chosenTime },
  isAdmin,
}) => {
  const [availableSeats, setAvailableSeats] = useState([1, 2, 3, 4]);
  const [pendingSeats, setPendingSeats] = useState([]); // [1, 2, 3, 4]
  const [approvedSeats, setApprovedSeats] = useState([]);
  const [open, setOpen] = useState(false);
  //clicked is used to check if the button is clicked and not if clicked then run the tempFunc for admin
  //to get the seats data and show as default
  const [clicked, setClicked] = useState(false);
  const [book, setBook] = useState({
    ...defaultBook,
    travelDirection: '',
    carTime: '',
    bookingDate: '',
  });
  useEffect(() => {
    const tempFunc = async () => {
      try {
        if (choseDate && chosenTime && chosenDirection) {
          const { pendingSeats, availableSeats, approvedSeats } =
            await checkSeatAvailability(choseDate, chosenTime, chosenDirection);
          setApprovedSeats(approvedSeats);
          setAvailableSeats(availableSeats);
          setPendingSeats(pendingSeats);
        } else {
          showToast('Please select date and direction', 'warning');
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 429) {
            showToast('Too many requests', 'error');
          } else {
            showToast(
              error.response?.data?.message || 'Something went wrong',
              'error'
            );
          }
        } else {
          showToast('Something went wrong', 'error');
        }
      }
    };
    if (!open) {
      tempFunc();
      setBook({
        ...book,
        travelDirection: chosenDirection,
        carTime: chosenTime,
        bookingDate: choseDate,
      });
    }
  }, [choseDate, chosenDirection, chosenTime]);

  const isSeatBooked = (seatNum) => availableSeats.includes(seatNum);
  const isSeatPending = (seatNum) => pendingSeats.includes(seatNum);
  const isSeatApproved = (seatNum) => approvedSeats.includes(seatNum);

  const handleApproveBooking = async (id) => {
    try {
      if (!id) return showToast('booking is empty', 'warning');
      const res = await approveBooking(id);
      showToast('Booking Approved', 'success');
      setApprovedSeats([...approvedSeats, res.seatNumber]);
      setDefaultBook();
      setOpen(false);
    } catch (err) {
      showToast(
        err.response?.data?.message || 'you are not admin. please login',
        'error'
      );
    }
  };

  const handleCancleBooking = async (id) => {
    try {
      if (!id) return showToast('booking is empty', 'warning');
      const res = await cancelBooking(id);
      // toast.success('Booking Canceled');
      showToast('Booking Canceled', 'success');
      setApprovedSeats(approvedSeats.filter((seat) => seat !== res.seatNumber));
      setPendingSeats([...pendingSeats, res.seatNumber]);
      setDefaultBook();
      setOpen(false);
    } catch (err) {
      showToast(
        err.response?.data?.message || 'you are not admin. please login'
      );
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      if (!id) return showToast('booking is empty', 'warning');
      const res = await deleteBooking(id);
      showToast('Booking Deleted', 'success');
      setPendingSeats(pendingSeats.filter((seat) => seat !== res.seatNumber));
      setApprovedSeats(approvedSeats.filter((seat) => seat !== res.seatNumber));
      setAvailableSeats([...availableSeats, res.seatNumber]);
      setDefaultBook();
      setOpen(false);
    } catch (err) {
      showToast(
        err.response?.data?.message || "you can't delete this",
        'error'
      );
    }
  };
  const addDataToBook = (data) => {
    setBook({ ...book, ...data });
  };

  const postToServer = async () => {
    try {
      if (
        !book.userName &&
        book.userName.length > 3 &&
        book.userName.length < 30
      ) {
        return showToast('Please enter a valid name', 'warning');
      }
      if (
        !book.phoneNumber &&
        book.phoneNumber.length > 8 &&
        book.phoneNumber.length < 15 &&
        !isNaN(book.phoneNumber)
      ) {
        return showToast('Please enter a valid phone number', 'warning');
      }
      if (
        !book.userName ||
        !book.phoneNumber ||
        !book.pickupLocation ||
        !book.deliveryLocation
      ) {
        return showToast('Please fill all required fields', 'warning');
      }
      if (book.message.length > 100) {
        return showToast('Message is too long', 'warning');
      }
      const existingBookingsJSON = localStorage.getItem('bookings');
      let existingBookings = existingBookingsJSON
        ? JSON.parse(existingBookingsJSON)
        : [];
      // filter out expired bookings
      existingBookings = removeExpiredBookings(existingBookings);
      // Get current date in Myanmar time
      if (existingBookings.length < 3 || isAdmin) {
        const currentMyanmarTime = new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Yangon',
        });

        // Calculate expiry time (Tomorrow at 12:00 AM Myanmar time)
        const expiryTime = new Date(currentMyanmarTime);
        expiryTime.setDate(expiryTime.getDate() + 1); // Tomorrow
        expiryTime.setHours(0, 0, 0, 0); // Set time to midnight

        const bookingWithExpiry = { ...book, expiryTime: expiryTime.getTime() };

        const res = await createBook(bookingWithExpiry);
        setPendingSeats([...pendingSeats, res.seatNumber]);
        setOpen(false);
        if (!isAdmin) {
          existingBookings.push(bookingWithExpiry);
          localStorage.setItem('bookings', JSON.stringify(existingBookings));
        }
        setDefaultBook();
        showToast('Booking successful', 'success');
        // Check for and remove expired bookings
      } else {
        showToast('cannot book more than 3, call the admin', 'warning');
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Booking failed', 'error');
    }
  };

  const removeExpiredBookings = (bookings) => {
    const currentTime = new Date().getTime();
    const updatedBookings = bookings.filter(
      (booking) => booking.expiryTime > currentTime
    );
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    return updatedBookings;
  };

  const setDefaultBook = () => {
    setBook({ ...book, ...defaultBook });
  };

  const handleSeat = useCallback(
    (seatNum) => {
      setBook({ ...book, seatNumber: seatNum });
      setOpen(true);
      setClicked(true);
    },
    [book, setBook, setOpen]
  );

  return (
    <div className='flex flex-col justify-center items-center m-5'>
      <h1 className='m-4 text-xl font-bold'>{chosenDirection}</h1>
      <BookingForm
        addDataToBook={addDataToBook}
        postToServer={postToServer}
        open={open}
        setOpen={setOpen}
        isAdmin={isAdmin}
        book={book}
        setBook={setBook}
        clicked={clicked}
        setClicked={setClicked}
        setDefaultBook={setDefaultBook}
        handleApproveBooking={handleApproveBooking}
        handleCancleBooking={handleCancleBooking}
        pendingSeats={pendingSeats}
        approvedSeats={approvedSeats}
        handleDeleteBooking={handleDeleteBooking}
      />
      <div className='border border-red-600 p-2 rounded-xl shadow-lg flex flex-col items-start justify-center gap-2'>
        <CarSeatIcon
          isApproved={isSeatApproved(1)}
          isAvailable={isSeatBooked(1)}
          isPending={isSeatPending(1)}
          handleSeat={handleSeat}
          isAdmin={isAdmin}
          Number={1}
        />
        <div>You cant choose the seats for back</div>
        <div className='flex justify-center items-center'>
          <CarSeatIcon
            isApproved={isSeatApproved(2)}
            isAvailable={isSeatBooked(2)}
            isPending={isSeatPending(2)}
            handleSeat={handleSeat}
            isAdmin={isAdmin}
            Number={2}
          />
          <CarSeatIcon
            isApproved={isSeatApproved(3)}
            isAvailable={isSeatBooked(3)}
            isPending={isSeatPending(3)}
            handleSeat={handleSeat}
            isAdmin={isAdmin}
            Number={3}
          />
          <CarSeatIcon
            isApproved={isSeatApproved(4)}
            isAvailable={isSeatBooked(4)}
            isPending={isSeatPending(4)}
            handleSeat={handleSeat}
            isAdmin={isAdmin}
            Number={4}
          />
        </div>
      </div>
    </div>
  );
};

export default CarInterface;
