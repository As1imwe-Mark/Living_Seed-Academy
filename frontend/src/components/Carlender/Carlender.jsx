import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion';
import client from '../../client';
import './calender.css';

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    client.fetch('*[_type == "event"] | order(date asc)').then((data) => {
      const upcomingEvents = data.filter(event => new Date(event.date) >= new Date());
      setEvents(upcomingEvents);
    });
  }, []);

  const onDateChange = (date) => {
    setDate(date);
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h2 className="head-text text-md mb-5"><span>Events</span> Calendar</h2>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white shadow-lg rounded-lg p-4 h-96 w-full">
            <Calendar
              onChange={onDateChange}
              value={date}
              tileContent={({ date, view }) => {
                const eventsOnDate = events.filter(event => new Date(event.date).toDateString() === date.toDateString());
                return eventsOnDate.length > 0 ? <p className="text-red-500 font-bold text-xs mt-1">{eventsOnDate[0].title}</p> : null;
              }}
              className="h-full w-full border-0"
            />
          </div>
        </motion.div>
      </motion.div>
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg overflow-auto">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">Upcoming Events</h2>
        {events.map(event => (
          <div key={event._id} className="mb-4">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p>{event.description}</p>
            <p className="text-gray-500 italic">{new Date(event.date).toLocaleString()}</p>
            <hr className="my-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
