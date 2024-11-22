import React, { useState } from 'react';

// Time options
const carTimes = [
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
];

const BackupPage = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [from, setFrom] = useState('');
  const [type, setType] = useState('pdf');
  // const [archieve, setArchieve] = useState('');
  const [approve, setApprove] = useState('');

  const handleBackup = () => {
    const query = new URLSearchParams();
    if (date) query.append('date', date);
    if (time) query.append('time', time);
    if (from) query.append('from', from);
    // if (archieve) query.append('archieve', archieve);
    if (approve) query.append('approve', approve);
    if (type) query.append('type', type);

    const queryString = query.toString();
    console.log(queryString);
    window.open(
      'https://mateset-server.vercel.app/admin/backup/?' + queryString
    );
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>Backup Data</h1>

        <div className='space-y-4'>
          {/* Date Picker */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Date{' '}
              <p className='text-red-500'>
                If you want data for tomorrow's cars, choose tomorrow.
              </p>
            </label>
            <input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          {/* Time Dropdown */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Car Time
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className='w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            >
              <option value=''>Select Time</option>
              <option value=''>All</option>
              {carTimes.map((carTime) => (
                <option key={carTime} value={carTime}>
                  {carTime}
                </option>
              ))}
            </select>
          </div>

          {/* From Dropdown */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Directions
            </label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className='w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            >
              <option value=''>All</option>
              <option value='yangon'>Yangon → Pyay</option>
              <option value='pyay'>Pyay → Yangon</option>
            </select>
          </div>

          {/* isArchived */}
          {/* <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Deleted Seat tay yaw par chin lar
            </label>
            <select
              value={archieve}
              onChange={(e) => setArchieve(e.target.value)}
              className='w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            >
              <option value='false'>No, does not contain deleted</option>
              <option value='true'>Yes, contains deleted</option>
            </select>
          </div> */}

          {/* isApproved */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Only approved seat?
            </label>
            <select
              value={approve}
              onChange={(e) => setApprove(e.target.value)}
              className='w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            >
              <option value=''>All</option>
              <option value='true'>Yes</option>
              <option value='false'>No, will contain pending</option>
            </select>
          </div>

          {/* Type Dropdown */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              File Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className='w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            >
              <option value='excel'>Excel</option>
              <option value='csv'>CSV</option>
              <option value='json'>JSON</option>
              <option value='pdf'>PDF</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              onClick={handleBackup}
              className='w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Generate Backup
            </button>

            {/* Reset Button */}
            <button
              onClick={() => {
                setDate('');
                setTime('');
                setFrom('');
                setType('csv');
                // setArchieve('true');
                setApprove('');
              }}
              className='w-full bg-gray-600 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-2'
            >
              backup all data{' '}
              {/* <p className='text-yellow-500'>click gernerate button</p> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupPage;
