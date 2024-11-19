import React from 'react';
import myImage from '../assets/human.png';

const CarSeatIcon = ({
  isAvailable,
  isPending,
  isApproved,
  handleSeat,
  isAdmin,
  Number,
}) => {
  // console.log(`${Number} isAvailable: ${isAvailable}`);
  // console.log(`${Number} isPending: ${isPending}`);
  // console.log(`${Number} isApproved: ${isApproved}`);
  return (
    <button
      onClick={() => {
        handleSeat(Number);
      }}
      name='seat'
      disabled={!isAvailable && !isAdmin}
      aria-label={`Seat number ${Number}`}
    >
      {isAdmin ? <p>{Number}</p> : <br />}

      {!isApproved ? (
        <svg
          className={`w-20 h-20 ${
            isPending
              ? 'fill-gray-400'
              : isAvailable
              ? 'fill-blue-600'
              : 'fill-black'
          } `}
          xmlns='http://www.w3.org/2000/svg'
          x='0'
          y='0'
          enableBackground='new 0 0 95.42 122.88'
          version='1.1'
          viewBox='0 0 95.42 122.88'
          xmlSpace='preserve'
        >
          <path d='M35.99 0h23.13c1.22 0 2.39.25 3.46.69 1.11.46 2.11 1.14 2.94 1.97a9.047 9.047 0 012.66 6.4v10.12c0 1.05-.18 2.07-.52 3.01-.29.8-.68 1.56-1.17 2.24 1.91.29 3.72.87 5.4 1.7 1.89.93 3.6 2.16 5.07 3.63 3.42 3.42 5.54 8.14 5.54 13.33v40.2c.74-.25 1.48-.43 2.21-.52.87-.11 1.74-.1 2.59.04 1.13.18 2.21.57 3.18 1.18.93.59 1.78 1.38 2.51 2.4 1.45 2.03 2.38 4.99 2.43 8.99.04 3.49-.59 7.77-2.13 12.92l-2.09 6.98c-.16.53-.28.97-.38 1.35-.11.4-.19.73-.26 1.03-.19.77-.33 1.37-.54 1.88-.22.54-.5.97-.94 1.39-1.14 1.05-2.29 1.05-4.93 1.05h-.54c-18.6 2.24-52.15-.28-72.62.01-2.43.02-3.58.03-4.71-.96l-.07-.05c-.96-.87-1.16-1.85-1.54-3.66-.07-.32-.14-.68-.23-1.08s-.2-.87-.34-1.44l-1.74-6.89c-.18-.73-.33-1.28-.48-1.83l-.02-.09C1.04 102.88.14 99.48 0 96.11c-.14-3.4.51-6.76 2.8-9.7.55-.7 1.16-1.3 1.83-1.8a8.144 8.144 0 014.45-1.59c.77-.04 1.56.03 2.36.21.16.04.32.08.47.12l.05.01V43.08c0-2.54.51-4.98 1.43-7.2a18.99 18.99 0 014.11-6.13c1.54-1.54 3.34-2.82 5.34-3.76 1.77-.83 3.69-1.4 5.71-1.65a9.15 9.15 0 01-1.13-2.2 8.91 8.91 0 01-.51-2.97V9.06c0-1.22.25-2.39.69-3.46a9.099 9.099 0 011.97-2.94l.02-.02c.83-.83 1.82-1.5 2.92-1.95C33.6.25 34.77 0 35.99 0zm26.62 47.01c.34-.52.86-.85 1.42-.96.56-.12 1.16-.02 1.67.31l.03.02c.51.34.84.85.95 1.41.11.56.02 1.16-.31 1.67l-.02.02a58.53 58.53 0 00-4.03 7.15 57.13 57.13 0 00-3.06 7.91c-.84 2.78-1.5 5.7-1.95 8.79-.45 3.09-.69 6.34-.71 9.77 0 .62-.25 1.18-.66 1.58-.41.41-.97.66-1.59.66-.62 0-1.18-.25-1.59-.66l-.02-.02c-.39-.4-.64-.96-.64-1.57.01-3.66.27-7.14.76-10.44.48-3.3 1.19-6.44 2.09-9.42.91-2.99 2.01-5.83 3.29-8.52 1.3-2.69 2.76-5.25 4.37-7.7zM28.88 49.5l-.04-.06c-.32-.51-.42-1.1-.3-1.65.11-.55.43-1.06.93-1.4l.06-.04c.51-.32 1.1-.42 1.65-.3.56.12 1.08.45 1.42.96 1.61 2.45 3.07 5.01 4.35 7.7 1.28 2.7 2.39 5.53 3.3 8.52a63.81 63.81 0 012.09 9.42c.48 3.3.74 6.77.75 10.44 0 .62-.25 1.18-.66 1.58-.4.41-.97.66-1.58.66-.62 0-1.18-.25-1.58-.66-.41-.41-.66-.97-.66-1.59-.01-3.43-.25-6.68-.7-9.77-.45-3.09-1.11-6.01-1.95-8.79a57.13 57.13 0 00-3.06-7.91 58.879 58.879 0 00-4.02-7.11zM78 85.94V43.08c0-1.94-.39-3.79-1.09-5.48-.73-1.76-1.8-3.34-3.13-4.67-1.33-1.33-2.91-2.4-4.67-3.13-1.69-.7-3.54-1.09-5.48-1.09H30.85c-1.94 0-3.79.39-5.48 1.09-1.76.73-3.34 1.8-4.67 3.13-1.33 1.33-2.4 2.91-3.13 4.67-.7 1.69-1.09 3.54-1.09 5.48v42.73c1.31 1.11 2.61 2.56 3.83 4.39 1.12 1.67 2.17 3.66 3.13 5.97 3.56-1.8 7.24-3.13 11.03-4.01 3.9-.91 7.92-1.34 12.06-1.32 4.12.02 8.35.51 12.68 1.43 4.22.9 8.54 2.21 12.95 3.93.45-2.08 1.18-3.97 2.11-5.62 1.03-1.85 2.32-3.41 3.73-4.64zm-64.56 3.19a2.36 2.36 0 01-.52-.28c-.16-.12-.31-.26-.44-.41-.34-.21-.67-.39-1-.53-.34-.15-.68-.26-1.01-.34-.39-.09-.77-.12-1.13-.11-.36.01-.71.08-1.04.19-.36.12-.7.31-1.03.56-.33.25-.63.55-.92.92-1.59 2.05-1.98 4.63-1.8 7.35.18 2.76.96 5.68 1.66 8.34l.03.13c.18.7.36 1.37.48 1.83l1.74 6.89c.25 1.01.45 1.94.61 2.7l.01.03c.1.51.16.87.2 1.1 0 .03 0 .04-.01.06.02-.01.06-.02.11-.02.3-.02.81-.06 1.6-.07l1.42-.02h71.13l.08.01h.53c.86 0 1.41.03 1.73.05.05 0 .09.01.13.03v-.04c.04-.19.09-.5.2-.93l.01-.02c.17-.71.39-1.6.69-2.59l2.09-6.98c1.34-4.47 1.94-8.11 1.98-11.01.05-3.25-.58-5.55-1.63-7.02-.36-.5-.77-.89-1.22-1.18-.47-.3-.97-.49-1.5-.57-.56-.09-1.17-.07-1.79.06a7.4 7.4 0 00-1.93.7c-1.73.89-3.37 2.46-4.6 4.58-1.11 1.9-1.88 4.25-2.08 6.96l-.01.06c-.01.1-.03.2-.05.3v.01c-.03.11-.06.22-.11.33-.24.57-.69.99-1.22 1.21-.53.22-1.14.23-1.71-.01-4.69-1.98-9.26-3.49-13.7-4.52-4.43-1.02-8.73-1.55-12.89-1.58-4.12-.02-8.12.45-11.98 1.44-3.86.99-7.59 2.5-11.18 4.54l-.18.09c-.06.03-.13.06-.19.08l-.02.01c-.58.19-1.18.14-1.69-.11-.52-.25-.94-.7-1.14-1.28-.92-2.64-1.95-4.83-3.05-6.62-1.19-1.88-2.42-3.32-3.66-4.32zm72.61 28.44l.01.01c0-.01 0-.01-.01-.01zM59.12 4.5H35.99c-.61 0-1.2.12-1.74.35-.56.23-1.06.57-1.48.99l-.02.02c-.41.42-.75.92-.98 1.47a4.54 4.54 0 00-.35 1.74v10.12c0 1.25.51 2.39 1.34 3.22l.02.02c.82.82 1.96 1.32 3.2 1.32h23.13c1.25 0 2.39-.51 3.22-1.34l.02-.02c.82-.83 1.32-1.96 1.32-3.2V9.06c0-.61-.12-1.2-.35-1.74-.23-.56-.57-1.06-1-1.48-.42-.42-.93-.76-1.48-.99a4.23 4.23 0 00-1.72-.35z'></path>
        </svg>
      ) : (
        <img className='w-20 h-20' src={myImage}></img>
      )}
    </button>
  );
};

export default React.memo(CarSeatIcon);
