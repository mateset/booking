import React, { useEffect } from 'react';
import useAdminCheck from '../../hooks/useAdminCheck';
import DateDropdown from '../../utils/DateDropdown';
import TimeDropdown from '../../utils/TimeDropdown';
import Loading from '../../utils/Loading';
import TravelDirectionDropdown from '../../utils/TravelDirectionDropdown';
import CarInterface from './CarInterface';
import { getCount } from '../../service/bookingService';
import { Link } from 'react-router-dom';
import { showToast } from '../../utils/Toast';
// import { showToast } from '../../utils/Toast';

// i need to use memo not to execute the function again and again
// when i change only date or time or direction only want to render the necessary part
const Cars = () => {
  const [choseDate, setChoseDate] = React.useState('');
  const [chosenTime, setChosenTime] = React.useState('6:00');
  const [chosenDirection, setChosenDirection] = React.useState('');
  const [count, setCount] = React.useState(0);
  const data = {
    choseDate,
    chosenTime,
    chosenDirection,
  };
  const { isAdmin, loading, setLoading } = useAdminCheck();
  useEffect(() => {
    const getCounts = async () => {
      try {
        setLoading(true);
        if (choseDate && chosenDirection) {
          const response = await getCount(choseDate, chosenDirection);
          setCount(response.count);
          setLoading(false);
        } else {
          showToast('Please select date and direction');
          setLoading(true);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 429) {
            showToast(error?.response?.data || 'Too many requests');
          } else {
            showToast(error.response?.data?.message || 'Something went wrong');
          }
        } else {
          showToast('Something went wrong');
        }
      }
    };
    if (choseDate && chosenDirection) getCounts();
  }, [choseDate, chosenDirection]);
  // if (loading) return <Loading />;
  return (
    <div className='flex flex-col justify-center items-center w-full h-auto'>
      {/* Car img */}
      <h1 className='text-4xl font-bold'>မိတ်ဆက်</h1>
      <h3 className='text-4xl font-bold'>ကားသေးဝန်ဆောင်မှု</h3>
      <br />
      <div className='flex flex-col items-start justify-center'>
        <DateDropdown choseDate={choseDate} setChoseDate={setChoseDate} />
        <TimeDropdown
          setChosenTime={setChosenTime}
          chosenTime={chosenTime}
          count={count}
        />
        <TravelDirectionDropdown
          setChosenDirection={setChosenDirection}
          chosenDirection={chosenDirection}
        />
      </div>
      {loading ? <Loading /> : <CarInterface data={data} isAdmin={isAdmin} />}
      {isAdmin && (
        <div className='flex flex-col'>
          <Link
            to='dashboard/order'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 inline-flex items-center justify-center'
          >
            to dashboard
          </Link>
          <Link
            to='dashboard/control-car-time'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center'
          >
            to add or remove car time
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cars;
