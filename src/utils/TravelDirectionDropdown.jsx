import React, { useEffect } from 'react';

const TravelDirectionDropdown = ({ setChosenDirection, chosenDirection }) => {
  const directions = ['Pyay → Yangon', 'Yangon → Pyay'];

  const handleChooseDirection = (event) => {
    setChosenDirection(event.target.value);
    sessionStorage.setItem('chosenDirection', event.target?.value);
  };

  useEffect(() => {
    const storedDirection = sessionStorage.getItem('chosenDirection');
    if (storedDirection) {
      setChosenDirection(storedDirection);
    } else {
      setChosenDirection(directions[0]);
    }
  }, []);

  return (
    <div className='mt-3'>
      <label>
        Select a direction:
        <select onChange={handleChooseDirection} value={chosenDirection}>
          {directions.map((direction, index) => (
            <option key={index} value={direction}>
              {direction}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default React.memo(TravelDirectionDropdown);
