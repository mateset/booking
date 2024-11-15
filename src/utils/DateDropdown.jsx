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

    // Checking if the current time is greater than 7:30 AM or 7:00 AM
    if (
      today.getHours() > 7 ||
      (today.getHours() === 7 && today.getMinutes() > 30)
    ) {
      today.setDate(today.getDate() + 1); // Move to the next day
    }
    // console.log(today.getHours(), today.getMinutes());
    const nextDates = [];
    for (let i = 0; i < 10; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);

      // Check if the time is greater than 6:10, if yes, increment the date

      const formattedDate = nextDay.toLocaleDateString('en-GB', options);
      nextDates.push(formattedDate);
    }
    setDates(nextDates);
    const storedDate = sessionStorage.getItem('selectedDate');
    if (nextDates.includes(storedDate)) {
      setChoseDate(storedDate);
    } else {
      setChoseDate(nextDates[0]);
    }
  }, []);

  return (
    <div className='mt-5'>
      <label>
        Select a date:
        <select onChange={handleChooseDate} value={choseDate}>
          {dates.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default React.memo(DateDropdown);
