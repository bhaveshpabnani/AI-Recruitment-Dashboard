import React, { useState } from 'react';
import { candidates as allCandidates, Candidate } from '@/data/mockData';
import { Eye, FileText, Star, ChevronDown } from 'lucide-react';
import CandidateDetailsDrawer from './CandidateDetailsDrawer';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'new':
      return <span className="bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full text-xs">New</span>;
    case 'screening':
      return <span className="bg-yellow-500/20 text-yellow-400 px-2.5 py-1 rounded-full text-xs">Screening</span>;
    case 'interview':
      return <span className="bg-purple-500/20 text-purple-400 px-2.5 py-1 rounded-full text-xs">Interview</span>;
    case 'offer':
      return <span className="bg-pink-500/20 text-pink-400 px-2.5 py-1 rounded-full text-xs">Offer</span>;
    case 'hired':
      return <span className="bg-green-500/20 text-green-400 px-2.5 py-1 rounded-full text-xs">Hired</span>;
    case 'rejected':
      return <span className="bg-red-500/20 text-red-400 px-2.5 py-1 rounded-full text-xs">Rejected</span>;
    default:
      return null;
  }
};

// Dummy avatar images
const dummyAvatars = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
  'https://randomuser.me/api/portraits/women/4.jpg',
  'https://randomuser.me/api/portraits/men/5.jpg',
  'https://randomuser.me/api/portraits/women/6.jpg',
  'https://randomuser.me/api/portraits/men/7.jpg',
  'https://randomuser.me/api/portraits/women/8.jpg',
  'https://randomuser.me/api/portraits/men/9.jpg',
  'https://randomuser.me/api/portraits/women/10.jpg',
];

interface CandidateTableProps {
  candidates?: Candidate[];
  onViewCandidate?: (candidate: Candidate) => void;
}

const CandidateTable: React.FC<CandidateTableProps> = ({ 
  candidates = allCandidates,  // Use all candidates as default if none provided
  onViewCandidate 
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | undefined>(undefined);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleViewCandidate = (candidate: Candidate) => {
    // Add avatar URL to the candidate object
    const candidateWithAvatar = {
      ...candidate,
      avatar: dummyAvatars[candidates.findIndex(c => c.id === candidate.id) % dummyAvatars.length]
    };
    
    if (onViewCandidate) {
      // If an external handler is provided, use it
      onViewCandidate(candidateWithAvatar);
    } else {
      // Otherwise, use the internal drawer
      setSelectedCandidate(candidateWithAvatar);
      setIsDrawerOpen(true);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl overflow-hidden shadow-lg shadow-purple-900/5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-left text-gray-400 text-xs uppercase border-b border-white/10 bg-black/20">
              <tr>
                <th className="px-4 py-3">Candidate</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Applied For</th>
                <th className="px-4 py-3">Applied Date</th>
                <th className="px-4 py-3">Tags</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.length > 0 ? (
                candidates.map((candidate, index) => (
                  <tr key={candidate.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <div 
                        className="flex items-center gap-3 cursor-pointer" 
                        onClick={() => handleViewCandidate(candidate)}
                      >
                        <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-purple-500/30 hover:ring-purple-500/50 transition-all">
                          <img 
                            src={dummyAvatars[index % dummyAvatars.length]} 
                            alt={candidate.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-white">{candidate.name}</div>
                          <div className="text-xs text-gray-400">{candidate.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span>{candidate.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(candidate.status)}
                    </td>
                    <td className="px-4 py-3 text-blue-300">{candidate.appliedFor}</td>
                    <td className="px-4 py-3 text-gray-400">{candidate.appliedDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {candidate.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                          onClick={() => handleViewCandidate(candidate)}
                        >
                          <Eye size={16} className="text-gray-400" />
                        </button>
                        <button 
                          className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                          onClick={() => alert(`View resume for ${candidate.name}`)}
                        >
                          <FileText size={16} className="text-gray-400" />
                        </button>
                        <button 
                          className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                          onClick={() => alert(`More options for ${candidate.name}`)}
                        >
                          <ChevronDown size={16} className="text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    No candidates found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CandidateDetailsDrawer 
        candidate={selectedCandidate}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};

export default CandidateTable;
