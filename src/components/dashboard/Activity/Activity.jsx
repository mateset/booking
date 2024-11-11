import React, { useState, useEffect } from 'react';
import Details from './Details';
import { getActivities } from '../../../service/bookingService';

const Activity = () => {
  const today = new Date().toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState(today);
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
      } catch (error) {}
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
          defaultValue={today}
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
