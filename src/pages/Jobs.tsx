import React, { useState } from 'react';
import { jobs } from '@/data/mockData';
import JobCard from '@/components/jobs/JobCard';
import { ChevronDown, ChevronRight, Plus, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">Jobs</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs..."
              className="w-full bg-dokkabi-cardBg text-white rounded-lg py-2 pl-10 pr-4 outline-none focus:ring-1 focus:ring-white/20"
            />
          </div>
          
          <button 
            onClick={() => navigate('/jobs/create')}
            className="flex items-center gap-2 bg-dokkabi-blue text-white px-4 py-2 rounded-lg"
          >
            <Plus size={18} />
            <span>Create Job</span>
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-dokkabi-cardBg rounded-lg">
          <span>Status: All</span>
          <ChevronDown size={16} />
        </button>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-dokkabi-cardBg rounded-lg">
          <span>Experience: Any</span>
          <ChevronDown size={16} />
        </button>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-dokkabi-cardBg rounded-lg">
          <span>Location: Any</span>
          <ChevronDown size={16} />
        </button>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Open Positions ({filteredJobs.length})</h2>
          <div className="flex items-center text-sm text-gray-400">
            <span className="mr-2">Sort By: Latest</span>
            <ChevronRight size={16} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
          
          {filteredJobs.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-12 text-gray-400">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 21H14C18.4183 21 22 17.4183 22 13C22 8.58172 18.4183 5 14 5H10C5.58172 5 2 8.58172 2 13C2 17.4183 5.58172 21 10 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13C12 14.6569 10.6569 16 9 16C7.34315 16 6 14.6569 6 13C6 11.3431 7.34315 10 9 10C10.6569 10 12 11.3431 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 13H18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 10H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 16H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="mt-4 text-lg">No jobs found matching your search</p>
              <p className="mt-2">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Closed Positions</h2>
        </div>
        
        <div className="bg-dokkabi-cardBg rounded-xl p-6 text-center text-gray-400">
          <p>No closed positions at the moment</p>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
