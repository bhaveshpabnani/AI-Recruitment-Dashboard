import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Users } from 'lucide-react';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Sample events
  const events = [
    { day: 10, title: 'Interview with Alex Johnson', time: '10:00 AM', type: 'interview' },
    { day: 12, title: 'Team Sync Meeting', time: '2:00 PM', type: 'meeting' },
    { day: 15, title: 'Review Candidate Profiles', time: '11:30 AM', type: 'review' },
    { day: 18, title: 'Interview with Charlie Kristen', time: '9:00 AM', type: 'interview' },
    { day: 22, title: 'Onboarding Session', time: '3:00 PM', type: 'onboarding' },
    { day: 25, title: 'Hiring Committee Meeting', time: '1:00 PM', type: 'meeting' },
  ];
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const getEventTypeStyle = (type) => {
    switch (type) {
      case 'interview':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      case 'meeting':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'review':
        return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'onboarding':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Calendar</h1>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg">
            <Plus size={18} />
            <span>Add Event</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Upcoming Events Sidebar */}
        <div className="lg:col-span-1 bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h2 className="font-medium">Upcoming Events</h2>
          </div>
          
          <div className="p-4 space-y-3">
            {events.sort((a, b) => a.day - b.day).map((event, index) => (
              <div 
                key={index}
                className="bg-black/40 rounded-lg p-3 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getEventTypeStyle(event.type)}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {monthNames[currentMonth.getMonth()].substring(0, 3)} {event.day}
                  </span>
                </div>
                <h3 className="font-medium text-white mb-1">{event.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <CalendarIcon size={12} />
                  <span>{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Calendar */}
        <div className="lg:col-span-3 bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={prevMonth} className="p-1.5 hover:bg-white/10 rounded-full">
                <ChevronLeft size={16} />
              </button>
              <h2 className="font-medium">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <button onClick={nextMonth} className="p-1.5 hover:bg-white/10 rounded-full">
                <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="bg-blue-500/10 text-blue-400 text-xs px-2.5 py-1 rounded-full">
                Today
              </button>
            </div>
          </div>
          
          <div className="p-2">
            {/* Day labels */}
            <div className="grid grid-cols-7 mb-2">
              {dayNames.map((day, index) => (
                <div 
                  key={index} 
                  className="text-center text-xs font-medium text-gray-400 py-2"
                >
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before the first day of the month */}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square p-1">
                  <div className="h-full rounded-lg bg-black/20 border border-white/5"></div>
                </div>
              ))}
              
              {/* Actual days in the month */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const isToday = 
                  day === new Date().getDate() && 
                  currentMonth.getMonth() === new Date().getMonth() &&
                  currentMonth.getFullYear() === new Date().getFullYear();
                
                const dayEvents = events.filter(event => event.day === day);
                
                return (
                  <div key={`day-${day}`} className="aspect-square p-1">
                    <div className={`h-full rounded-lg p-1 flex flex-col ${
                      isToday ? 'bg-blue-900/30 border border-blue-500/50' : 'bg-black/40 border border-white/5 hover:border-white/10'
                    }`}>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm font-medium ${isToday ? 'text-blue-300' : 'text-white'}`}>
                          {day}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="text-xs bg-blue-500 text-white w-5 h-5 flex items-center justify-center rounded-full">
                            {dayEvents.length}
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-1 space-y-1 overflow-hidden">
                        {dayEvents.map((event, i) => (
                          <div 
                            key={i}
                            className={`text-xs p-1 rounded truncate ${getEventTypeStyle(event.type)}`}
                          >
                            {event.time}: {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-black/80 to-purple-900/20 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Users size={20} className="text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium">Upcoming Interviews</h3>
              <p className="text-xs text-gray-400">This week</p>
            </div>
          </div>
          <div className="text-3xl font-bold">8</div>
        </div>
        
        <div className="bg-gradient-to-br from-black/80 to-blue-900/20 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <CalendarIcon size={20} className="text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium">Team Meetings</h3>
              <p className="text-xs text-gray-400">This week</p>
            </div>
          </div>
          <div className="text-3xl font-bold">5</div>
        </div>
        
        <div className="bg-gradient-to-br from-black/80 to-pink-900/20 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-pink-400">
                <path d="M21 11.5C21 16.1944 17.1944 20 12.5 20C11.1381 20 9.85671 19.6588 8.73006 19.0587C8.58216 19.0215 8.4242 19.0039 8.26658 19.0072C8.10897 19.0105 7.95219 19.0347 7.80313 19.0786L4.57918 19.9289C4.25202 20.0151 3.90535 19.9332 3.65414 19.7068C3.40294 19.4804 3.28568 19.1444 3.34306 18.8126L3.94336 15.7639C4.01383 15.4291 3.93757 15.0789 3.73913 14.8082C3.26166 14.1663 2.9531 13.4224 2.84856 12.6385C2.74401 11.8547 2.84679 11.0589 3.14935 10.3252C3.45191 9.59154 3.94391 8.94647 4.57594 8.45353C5.20797 7.96059 5.95582 7.63658 6.74556 7.51521C7.5353 7.39384 8.34228 7.48011 9.08988 7.76449C9.83747 8.04886 10.5002 8.5223 11.0249 9.14205C11.5496 9.76181 11.9193 10.5052 12.101 11.3043" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Onboarding Sessions</h3>
              <p className="text-xs text-gray-400">This week</p>
            </div>
          </div>
          <div className="text-3xl font-bold">2</div>
        </div>
        
        <div className="bg-gradient-to-br from-black/80 to-green-900/20 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-400">
                <path d="M9 12H15M12 9V15M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">New Events</h3>
              <p className="text-xs text-gray-400">Added this month</p>
            </div>
          </div>
          <div className="text-3xl font-bold">15</div>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 