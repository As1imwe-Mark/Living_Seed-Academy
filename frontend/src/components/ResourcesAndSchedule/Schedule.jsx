import React from 'react';

const SchoolSchedule = () => {
  const schedule = [
    { time: '5:05 am', activity: 'Rising up and personal administration' },
    { time: '5:30 am', activity: 'House cleaning' },
    { time: '5:30 am', activity: 'Morning preps' },
    { time: '6:30 am', activity: 'Breakfast' },
    { time: '7:00 am', activity: 'School Assembly' },
    { time: '7:45 am', activity: 'Lessons' },
    { time: '10:35 pm', activity: 'Break' },
    { time: '11:00 pm', activity: 'Lessons' },
    { time: '1:15 pm', activity: 'Lunch' },
    { time: '5:00 pm', activity: 'Cocurricular' },
    { time: '6:00 pm', activity: 'Clean up' },
    { time: '6:40 pm', activity: 'Prep' },
    { time: '7:00 pm', activity: 'Supper' },
    { time: '7:40 pm', activity: 'Night Prep' },
    { time: '7:40 pm - 9:50 pm', activity: 'End of the Day' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center p-text">School Schedule</h1>
      <table className="w-full table-auto border-collapse p-text">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Time</th>
            <th className="px-4 py-2 text-left">Activity</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="border px-4 py-2">{item.time}</td>
              <td className="border px-4 py-2">{item.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolSchedule;
