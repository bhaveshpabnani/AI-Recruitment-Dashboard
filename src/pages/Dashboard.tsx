import React, { useEffect, useState } from 'react';
import { jobs } from '@/data/mockData';
import JobCard from '@/components/jobs/JobCard';
import { ChevronRight, ChevronDown, FileText, Sparkles, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Dummy avatar images
const dummyAvatars = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
  'https://randomuser.me/api/portraits/women/4.jpg',
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        navigate('/login');
        return;
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, [navigate]);

  return (
    <div className="animate-fade-in relative">
      {/* Background design elements */}
      <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-80 right-20 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Dashboard</span>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">Current Openings</h2>
          </div>
          <div className="flex items-center">
            <span className="text-sm mr-2">Sort By: Latest</span>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {jobs.slice(0, 4).map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </div>
      
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Hiring Pipeline</span>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white">Candidates</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 text-sm flex items-center gap-2 shadow-lg shadow-black/20">
              <span>March 2023</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl overflow-hidden shadow-lg shadow-purple-900/5">
          <div className="flex border-b border-white/10 bg-black/40 backdrop-blur-sm">
            <button className="px-6 py-3 text-sm font-medium border-b-2 border-purple-600 text-white">
              All
            </button>
            <button className="px-6 py-3 text-sm font-medium text-gray-400 hover:text-gray-300 transition-colors">
              Accepted
            </button>
            <button className="px-6 py-3 text-sm font-medium text-gray-400 hover:text-gray-300 transition-colors">
              Rejected
            </button>
          </div>
          
          <table className="w-full">
            <thead className="text-left text-gray-400 text-xs uppercase border-b border-white/10 bg-black/20">
              <tr>
                <th className="px-4 py-3">Candidate Name</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Stages</th>
                <th className="px-4 py-3">Applied Role</th>
                <th className="px-4 py-3">Application Date</th>
                <th className="px-4 py-3">Attachments</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10 hover:bg-white/5 cursor-pointer group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-purple-500/30 group-hover:ring-purple-500/50 transition-all">
                      <img 
                        src={dummyAvatars[0]} 
                        alt="Charlie Kristen"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="font-medium text-white group-hover:text-purple-300 transition-colors">Charlie Kristen</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span>4.0</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-full">Design Challenge</span>
                </td>
                <td className="px-4 py-3 text-blue-300">Sr. UX Designer</td>
                <td className="px-4 py-3 text-gray-400">12/02/23</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <FileText size={16} className="text-gray-400" />
                    <span>3 files</span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-white/10 hover:bg-white/5 cursor-pointer group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-purple-500/30 group-hover:ring-purple-500/50 transition-all">
                      <img 
                        src={dummyAvatars[1]} 
                        alt="Alex Johnson"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="font-medium text-white group-hover:text-purple-300 transition-colors">Alex Johnson</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span>4.5</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">Interview</span>
                </td>
                <td className="px-4 py-3 text-blue-300">Frontend Developer</td>
                <td className="px-4 py-3 text-gray-400">15/02/23</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <FileText size={16} className="text-gray-400" />
                    <span>2 files</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Link to="/candidates" className="text-blue-400 flex items-center gap-1 hover:underline group">
            View all candidates 
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs text-pink-400 font-semibold uppercase tracking-wider">Tools</span>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-white">Quick Actions</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/jobs/create" className="block">
            <div className="bg-gradient-to-br from-black/80 to-blue-950/30 border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-all cursor-pointer group hover:shadow-lg hover:shadow-blue-900/10">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600/30 to-blue-400/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="#0A84FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-1 group-hover:text-blue-300 transition-colors">Post New Job</h3>
              <p className="text-gray-400 text-sm">Create a new job posting to attract candidates</p>
            </div>
          </Link>
          
          <Link to="/candidates/add" className="block">
            <div className="bg-gradient-to-br from-black/80 to-green-950/30 border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-all cursor-pointer group hover:shadow-lg hover:shadow-green-900/10">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-600/30 to-green-400/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M20 9V16M17 12H23M12.5 7C12.5 9.20914 10.7091 11 8.5 11C6.29086 11 4.5 9.20914 4.5 7C4.5 4.79086 6.29086 3 8.5 3C10.7091 3 12.5 4.79086 12.5 7Z" stroke="#32D74B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-1 group-hover:text-green-300 transition-colors">Add Candidate</h3>
              <p className="text-gray-400 text-sm">Add candidates directly to your pipeline</p>
            </div>
          </Link>
          
          <Link to="/chatbot" className="block">
            <div className="bg-gradient-to-br from-black/80 to-pink-950/30 border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-all cursor-pointer h-full group hover:shadow-lg hover:shadow-pink-900/10">
              <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-pink-600/30 to-pink-400/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11.5C21 16.1944 17.1944 20 12.5 20C11.1381 20 9.85671 19.6588 8.73006 19.0587C8.58216 19.0215 8.4242 19.0039 8.26658 19.0072C8.10897 19.0105 7.95219 19.0347 7.80313 19.0786L4.57918 19.9289C4.25202 20.0151 3.90535 19.9332 3.65414 19.7068C3.40294 19.4804 3.28568 19.1444 3.34306 18.8126L3.94336 15.7639C4.01383 15.4291 3.93757 15.0789 3.73913 14.8082C3.26166 14.1663 2.9531 13.4224 2.84856 12.6385C2.74401 11.8547 2.84679 11.0589 3.14935 10.3252C3.45191 9.59154 3.94391 8.94647 4.57594 8.45353C5.20797 7.96059 5.95582 7.63658 6.74556 7.51521C7.5353 7.39384 8.34228 7.48011 9.08988 7.76449C9.83747 8.04886 10.5002 8.5223 11.0249 9.14205C11.5496 9.76181 11.9193 10.5052 12.101 11.3043C12.3388 12.3672 12.2242 13.476 11.7727 14.4705C11.3213 15.465 10.5574 16.2966 9.60147 16.8255" stroke="#FF719A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.5 8.5C14.5 9.32843 13.8284 10 13 10C12.1716 10 11.5 9.32843 11.5 8.5C11.5 7.67157 12.1716 7 13 7C13.8284 7 14.5 7.67157 14.5 8.5Z" stroke="#FF719A" strokeWidth="2"/>
                  <path d="M9 5.5C9 6.32843 8.32843 7 7.5 7C6.67157 7 6 6.32843 6 5.5C6 4.67157 6.67157 4 7.5 4C8.32843 4 9 4.67157 9 5.5Z" stroke="#FF719A" strokeWidth="2"/>
                  <path d="M20 5.5C20 6.32843 19.3284 7 18.5 7C17.6716 7 17 6.32843 17 5.5C17 4.67157 17.6716 4 18.5 4C19.3284 4 20 4.67157 20 5.5Z" stroke="#FF719A" strokeWidth="2"/>
                  <path d="M14.5 15.5C14.5 16.3284 13.8284 17 13 17C12.1716 17 11.5 16.3284 11.5 15.5C11.5 14.6716 12.1716 14 13 14C13.8284 14 14.5 14.6716 14.5 15.5Z" stroke="#FF719A" strokeWidth="2"/>
                  <path d="M20 15.5C20 16.3284 19.3284 17 18.5 17C17.6716 17 17 16.3284 17 15.5C17 14.6716 17.6716 14 18.5 14C19.3284 14 20 14.6716 20 15.5Z" stroke="#FF719A" strokeWidth="2"/>
                </svg>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles size={10} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1 group-hover:text-pink-300 transition-colors">Ask AI Assistant</h3>
              <p className="text-gray-400 text-sm">Get insights and help from our AI assistant</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
