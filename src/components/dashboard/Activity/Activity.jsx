import React, { useState, useEffect } from 'react';
import Details from './Details';
import { getActivities } from '../../../service/bookingService';

const Activity = () => {
  const tomorrow = new Date(); // i will set later
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState(tomorrowDate);
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    // Function to fetch data based on the selected date
    const fetchData = async () => {
      try {
        const formattedDate = bookingDate
          ? formatDate(new Date(bookingDate))
          : null;
        // Assuming activities function returns data based on the date
        const data = await getActivities(formattedDate);
        setActivityData(data.data);
      } catch (error) {
        //get session and isAdmin to false
        sessionStorage.setItem('isAdmin', false);
      }
    };

    if (bookingDate) {
      fetchData();
    }
  }, [bookingDate]);

  const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Yangon',
    };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div>
      <div className='flex justify-center mt-4'>
        <input
          type='date'
          defaultValue={tomorrowDate}
          name='ActivityDate'
          onChange={(e) => setBookingDate(e.target.value)}
          style={{ border: '2px solid black', fontSize: '1.5rem' }}
        />
      </div>
      {activityData.length === 0 ? (
        <div className='flex justify-center mt-4 text-4xl text-red-500 '>
          No activity found.
        </div>
      ) : (
        activityData.map((activity, index) => (
          <Details data={activity} key={index} />
        ))
      )}
    </div>
  );
};

export default Activity;
