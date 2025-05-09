import React from 'react';
import { MessageCircle, Search, User, Plus, Filter } from 'lucide-react';

const Messages = () => {
  return (
    <div className="animate-fade-in h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search messages..."
              className="w-full bg-black/40 border border-white/10 text-white rounded-lg py-2 pl-10 pr-4 outline-none focus:ring-1 focus:ring-white/20"
            />
          </div>
          
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg">
            <Plus size={18} />
            <span>New Message</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        {/* Conversations sidebar */}
        <div className="lg:col-span-1 bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl overflow-hidden h-full flex flex-col">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-medium">Recent Messages</h2>
            <Filter size={16} className="text-gray-400" />
          </div>
          
          <div className="overflow-y-auto flex-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <div 
                key={index}
                className={`p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer ${index === 0 ? 'bg-white/10' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-purple-500/30">
                    <img 
                      src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 1}.jpg`}
                      alt="User avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-white">{`User ${index + 1}`}</span>
                      <span className="text-xs text-gray-400">2m ago</span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">
                      {index === 0 ? 'Hey there! I wanted to follow up about the frontend position.' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Active conversation */}
        <div className="lg:col-span-3 bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl overflow-hidden h-full flex flex-col">
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-purple-500/30">
              <img 
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium text-white">User 1</div>
              <div className="text-xs text-gray-400">Frontend Developer • Last active: 2m ago</div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Message bubbles */}
            <div className="flex items-end gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-purple-500/30">
                <img 
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="User avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="bg-gray-800 rounded-t-lg rounded-r-lg px-4 py-2 max-w-[80%]">
                <p className="text-white">Hey! I wanted to follow up about the frontend position. Do you have any updates?</p>
                <span className="text-xs text-gray-400 mt-1 block">10:30 AM</span>
              </div>
            </div>
            
            <div className="flex items-end justify-end gap-2">
              <div className="bg-blue-600 rounded-t-lg rounded-l-lg px-4 py-2 max-w-[80%]">
                <p className="text-white">Hi there! Thanks for checking in. We're still reviewing applications and should have an update by the end of the week.</p>
                <span className="text-xs text-gray-300 mt-1 block">10:45 AM</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            </div>
            
            <div className="flex items-end gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-purple-500/30">
                <img 
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="User avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="bg-gray-800 rounded-t-lg rounded-r-lg px-4 py-2 max-w-[80%]">
                <p className="text-white">Sounds good! I'll wait for your update. Thanks for letting me know.</p>
                <span className="text-xs text-gray-400 mt-1 block">10:47 AM</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <input 
                type="text"
                placeholder="Type a message..."
                className="w-full bg-black/40 border border-white/10 text-white rounded-lg py-3 px-4 outline-none focus:ring-1 focus:ring-white/20"
              />
              <button className="bg-blue-600 text-white p-3 rounded-lg">
                <MessageCircle size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;