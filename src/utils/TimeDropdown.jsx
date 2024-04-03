import React, { useEffect, useState } from 'react';

const TimeDropdown = ({ setChosenTime, chosenTime, count }) => {
  const [times, setTimes] = useState([
    '6:00',
    '6:05',
    '6:10',
    '6:15',
    '6:20',
    '6:25',
    '6:30',
    '6:35',
    '6:40',
    '6:45',
  ]);

  useEffect(() => {
    const timeFromSession = sessionStorage.getItem('choseTime');
    if (times.slice(0, count).includes(timeFromSession)) {
      setChosenTime(timeFromSession);
    } else {
      setChosenTime(times[0]);
    }
  }, [count]);

  const handleChooseTime = (event) => {
    const chosenValue = event.target.value;
    setChosenTime(chosenValue);
    sessionStorage.setItem('choseTime', chosenValue);
  };

  const options = times.slice(0, count).map((time, index) => (
    <option key={index} value={time}>
      {time}
    </option>
  ));

  return (
    <div className='mt-5'>
      <label>Select a time:</label>
      <select onChange={handleChooseTime} value={chosenTime}>
        {options}
      </select>
    </div>
  );
};

export default React.memo(TimeDropdown);

// import React, { useEffect, useState } from 'react';

// const TimeDropdown = ({ setChosenTime, chosenTime, count }) => {
//   const times = [
//     '6:00',
//     '6:05',
//     '6:10',
//     '6:15',
//     '6:20',
//     '6:25',
//     '6:30',
//     '6:35',
//     '6:40',
//     '6:45',
//   ].slice(0, count);
//   console.log(chosenTime);
//   const [changeTime, setChangeTime] = useState(
//     sessionStorage.getItem('choseDate') || times[0]
//   );
//   const handleChooseTime = (event) => {
//     setChosenTime(event.target?.value);
//     sessionStorage.setItem('choseDate', event.target?.value);
//   };

//   useEffect(() => {
//     if (changeTime && times.includes(changeTime)) {
//       setChosenTime(changeTime);
//       console.log(changeTime);
//     } else {
//       setChosenTime(times[0]);
//       console.log(changeTime);
//     }
//   }, []);
//   console.log(times);
//   const options = times.map((time, index) => (
//     <option key={index} value={time}>
//       {time}
//     </option>
//   ));

//   return (
//     <div className='mt-5'>
//       <label>Select a time:</label>
//       <select
//         onLoad={handleChooseTime}
//         onChange={handleChooseTime}
//         value={changeTime}
//       >
//         {options}
//       </select>
//     </div>
//   );
// };

// export default React.memo(TimeDropdown);
