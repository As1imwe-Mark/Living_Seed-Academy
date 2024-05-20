import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion, AnimatePresence } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import client from '../../client';
import './calender.css'

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    client.fetch('*[_type == "event"] | order(date asc)').then((data) => {
      setEvents(data);
      const todayEvent = data.find(event => new Date(event.date).toDateString() === new Date().toDateString());
      setSelectedEvent(todayEvent || null);
    });
  }, []);

  const onDateChange = (date) => {
    setDate(date);
    const event = events.find((event) => new Date(event.date).toDateString() === date.toDateString());
    setSelectedEvent(event || null);
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="head-text mb-5">School <span>Event</span> Calendar</h1>
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
                const event = events.find(event => new Date(event.date).toDateString() === date.toDateString());
                return event ? <p className="text-red-500 font-bold text-xs mt-1">{event.title}</p> : null;
              }}
              className="h-full w-full border-0"
            />
          </div>
        </motion.div>
        <div className="mt-6 lg:mt-0 p-6 bg-white shadow-lg rounded-lg h-64 lg:h-96 overflow-auto">
          <AnimatePresence mode="wait">
            {selectedEvent ? (
              <motion.div
                key={selectedEvent.date}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold text-blue-800 mb-2">{selectedEvent.title}</h2>
                <p className="text-gray-700 mb-2">{selectedEvent.description}</p>
                <p className="text-gray-500 italic">{new Date(selectedEvent.date).toLocaleString()}</p>
              </motion.div>
            ) : (
              <motion.div
                key="no-event"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-500 italic">Select a date to see event details.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(EventCalendar, 'app__testimonial'),
  'calender',
  'app__primarybg',
);
