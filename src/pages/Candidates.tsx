import React, { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import CandidateTable from '@/components/candidates/CandidateTable';
import CandidateDetailsDrawer from '@/components/candidates/CandidateDetailsDrawer';
import { candidates, Candidate } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | undefined>(undefined);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const filteredCandidates = candidates.filter(candidate => {
    // Apply status filter
    if (statusFilter !== 'all' && candidate.status !== statusFilter) {
      return false;
    }
    
    // Apply search filter
    if (searchQuery.trim() === '') {
      return true;
    }
    
    const searchLower = searchQuery.toLowerCase();
    return (
      candidate.name.toLowerCase().includes(searchLower) ||
      candidate.role.toLowerCase().includes(searchLower) ||
      candidate.appliedFor.toLowerCase().includes(searchLower) ||
      candidate.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  const handleViewCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDrawerOpen(true);
  };

  return (
    <div className="animate-fade-in">
      {/* Background design elements */}
      <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-80 right-20 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">Candidates</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidates..."
              className="w-full bg-black/40 text-white rounded-lg py-2 pl-10 pr-4 outline-none focus:ring-1 focus:ring-white/20 border border-white/10"
            />
          </div>
          
          <button 
            onClick={() => alert('Filter function would show more advanced filtering options')}
            className="flex items-center gap-2 bg-black/40 text-white px-4 py-2 rounded-lg border border-white/10 hover:bg-black/60 transition-colors"
          >
            <Filter size={16} />
            <span className="hidden md:inline">Filter</span>
          </button>
          
          <button 
            onClick={() => alert('Exporting candidates data...')}
            className="flex items-center gap-2 bg-black/40 text-white px-4 py-2 rounded-lg border border-white/10 hover:bg-black/60 transition-colors"
          >
            <Download size={16} />
            <span className="hidden md:inline">Export</span>
          </button>
          
          <button 
            onClick={() => navigate('/candidates/add')}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all"
          >
            <Plus size={16} />
            <span>Add Candidate</span>
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="mb-4 flex flex-wrap space-x-1">
          <button 
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg ${statusFilter === 'all' 
              ? 'bg-gradient-to-r from-purple-600/30 to-pink-500/30 text-white' 
              : 'text-gray-400 hover:bg-white/5'} transition-colors`}
          >
            All Candidates
          </button>
          <button 
            onClick={() => setStatusFilter('new')} 
            className={`px-4 py-2 rounded-lg ${statusFilter === 'new' 
              ? 'bg-gradient-to-r from-blue-600/30 to-blue-400/30 text-white' 
              : 'text-gray-400 hover:bg-white/5'} transition-colors`}
          >
            New
          </button>
          <button 
            onClick={() => setStatusFilter('screening')}
            className={`px-4 py-2 rounded-lg ${statusFilter === 'screening' 
              ? 'bg-gradient-to-r from-yellow-600/30 to-yellow-400/30 text-white' 
              : 'text-gray-400 hover:bg-white/5'} transition-colors`}
          >
            Screening
          </button>
          <button 
            onClick={() => setStatusFilter('interview')}
            className={`px-4 py-2 rounded-lg ${statusFilter === 'interview' 
              ? 'bg-gradient-to-r from-purple-600/30 to-purple-400/30 text-white' 
              : 'text-gray-400 hover:bg-white/5'} transition-colors`}
          >
            Interview
          </button>
          <button 
            onClick={() => setStatusFilter('offer')}
            className={`px-4 py-2 rounded-lg ${statusFilter === 'offer' 
              ? 'bg-gradient-to-r from-pink-600/30 to-pink-400/30 text-white' 
              : 'text-gray-400 hover:bg-white/5'} transition-colors`}
          >
            Offer
          </button>
          <button 
            onClick={() => setStatusFilter('hired')}
            className={`px-4 py-2 rounded-lg ${statusFilter === 'hired' 
              ? 'bg-gradient-to-r from-green-600/30 to-green-400/30 text-white' 
              : 'text-gray-400 hover:bg-white/5'} transition-colors`}
          >
            Hired
          </button>
        </div>
        
        <CandidateTable 
          candidates={filteredCandidates} 
          onViewCandidate={handleViewCandidate}
        />
      </div>
      
      <div className="flex justify-between items-center bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3">
        <div className="text-sm text-gray-400">
          Showing <span className="text-white">{filteredCandidates.length}</span> candidates
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => alert('Previous page')}
            className="px-3 py-1 rounded bg-white/10 text-gray-300 hover:bg-white/20 transition-colors"
          >
            Previous
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-gradient-to-r from-purple-600 to-pink-500 text-white">
            1
          </button>
          <button 
            onClick={() => alert('Go to page 2')}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-gray-300 transition-colors"
          >
            2
          </button>
          <button 
            onClick={() => alert('Next page')}
            className="px-3 py-1 rounded bg-white/10 text-gray-300 hover:bg-white/20 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
      
      <CandidateDetailsDrawer 
        candidate={selectedCandidate}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default Candidates;
