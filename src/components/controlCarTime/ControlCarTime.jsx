import React from 'react';
import {
  addCarTime,
  removeCarTime,
  getCount,
} from '../../service/bookingService';
import { checkAdmin, logout, logoutAll } from '../../service/adminService';
import DateDropdown from '../../utils/DateDropdown';
import TravelDirectionDropdown from '../../utils/TravelDirectionDropdown';
import { showToast } from '../../utils/Toast';

const ControlCarTime = () => {
  const [choseDate, setChoseDate] = React.useState('');
  const [chosenDirection, setChosenDirection] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const checkAdm = async () => {
      try {
        const response = await checkAdmin();
        setIsAdmin(Boolean(response.isAdmin));
      } catch (error) {
        setIsAdmin(false);
      }
    };
    checkAdm();
  }, []);

  React.useEffect(() => {
    const getCounts = async () => {
      try {
        if (!choseDate || !chosenDirection)
          return showToast('Please select date and direction', 'warning');
        const response = await getCount(choseDate, chosenDirection);
        setCount(response.count);
      } catch (error) {
        sessionStorage.setItem('isAdmin', false);
      }
    };
    if (choseDate && chosenDirection) getCounts();
  }, [choseDate, chosenDirection]);

  const handleAddCarTime = async () => {
    if (window.confirm('Are you sure you want to add the car time?')) {
      try {
        if (!choseDate || !chosenDirection)
          return showToast('Please select date and direction', 'warning');
        const response = await addCarTime({
          bookingDate: choseDate,
          travelDirection: chosenDirection,
        });
        setCount(response.data.count);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 429) {
            showToast(error?.response?.data || 'Too many requests', 'error');
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
    }
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        const response = await logout();
        showToast(response?.data?.message || 'logout successfully', 'success');
        sessionStorage.removeItem('isAdmin');
        window.location.href = '/';
      } catch (error) {
        if (error.response) {
          if (error.response.status === 429) {
            showToast(error?.response?.data || 'Too many requests', 'error');
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
    }
  };

  const handleLogoutAllDevices = async () => {
    if (window.confirm('Are you sure you want to logout all devices?')) {
      try {
        const response = await logoutAll();
        showToast(
          response?.data?.message || 'logout all successfully',
          'success'
        );
        sessionStorage.removeItem('isAdmin');
        window.location.href = '/';
      } catch (error) {
        if (error.response) {
          if (error.response.status === 429) {
            showToast(error?.response?.data || 'Too many requests', 'error');
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
    }
  };

  const handleRemoveCarTime = async () => {
    if (window.confirm('Are you sure you want to remove the car time?')) {
      try {
        const response = await removeCarTime({
          bookingDate: choseDate,
          travelDirection: chosenDirection,
        });
        setCount(response.data?.count);
      } catch (error) {}
    }
  };

  if (!isAdmin) {
    return <div>You are not authorized to view this page.</div>;
  }
  return (
    <div className='flex flex-col justify-center items-center w-full h-auto'>
      <div className='flex flex-col items-start justify-center'>
        <DateDropdown setChoseDate={setChoseDate} />
        <TravelDirectionDropdown setChosenDirection={setChosenDirection} />
      </div>
      <div className='bg-gray-100 text-gray-800 px-4 py-2 mt-2 rounded-md flex items-center justify-center'>
        count: <b> {count}</b>
      </div>
      <div className='flex flex-col items-start justify-center box-border'>
        <button
          className='my-2 bg-green-500 text-white w-32 p-2 h-14 rounded-md active:shadow-md hover:bg-green-400  hover:border-2 hover:border-green-500'
          onClick={handleAddCarTime}
        >
          Add Car Time
        </button>

        <button
          className='bg-red-500 text-white w-32 p-1 rounded-md active:shadow-md hover:bg-red-400  hover:border-2 hover:border-red-500'
          onClick={handleRemoveCarTime}
        >
          Remove Car Time
        </button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <button
        className='bg-blue-500 text-white w-24 p-2 mt-4 rounded-md active:shadow-md hover:bg-blue-400 hover:border-2 hover:border-blue-500'
        onClick={handleLogout}
      >
        Logout
      </button>
      <button
        className='bg-blue-500 text-white w-24 p-2 mt-4 rounded-md active:shadow-md hover:bg-blue-400 hover:border-2 hover:border-blue-500'
        onClick={handleLogoutAllDevices}
      >
        Logout all devices
      </button>
    </div>
  );
};

export default ControlCarTime;
