import React, { useEffect, useState } from 'react';

const DateDropdown = ({ setChoseDate, choseDate }) => {
  const [dates, setDates] = useState([]);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Yangon',
  };

  const handleChooseDate = (event) => {
    setChoseDate(event.target.value);
    sessionStorage.setItem('selectedDate', event.target.value);
  };

  useEffect(() => {
    const today = new Date();
    const nextDates = [];
    for (let i = 0; i < 5; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const formattedDate = nextDay.toLocaleDateString('en-GB', options);
      nextDates.push(formattedDate);
    }
    setDates(nextDates);
    const storedDate = sessionStorage.getItem('selectedDate');
    if (nextDates.includes(storedDate)) {
      console.log('1first');
      setChoseDate(storedDate);
    } else {
      console.log('1second');
      setChoseDate(nextDates[0]);
    }
  }, []);

  return (
    <div className='mt-5'>
      <label>Select a date:</label>
      <select onChange={handleChooseDate} value={choseDate}>
        {dates.map((date, index) => (
          <option key={index} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(DateDropdown);
