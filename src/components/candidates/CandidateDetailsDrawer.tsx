import React from 'react';
import { X, Mail, Phone, CheckCircle, Clock } from 'lucide-react';
import { Candidate } from '@/data/mockData';
import { createPortal } from 'react-dom';

// Default avatar to use as fallback
const DEFAULT_AVATAR = 'https://randomuser.me/api/portraits/lego/1.jpg';

interface CandidateDetailsDrawerProps {
  candidate?: Candidate;
  isOpen: boolean;
  onClose: () => void;
}

const CandidateDetailsDrawer: React.FC<CandidateDetailsDrawerProps> = ({ candidate, isOpen, onClose }) => {
  if (!candidate || !isOpen) return null;
  
  // Using a portal to render the drawer at the root level of the DOM
  // This ensures it's not constrained by the parent component's positioning
  return createPortal(
    <div 
      className="fixed top-[64px] bottom-0 right-0 z-40 w-96 flex flex-col bg-black/95 backdrop-blur-lg border-l border-white/10 shadow-lg transform transition-transform duration-300 overflow-hidden" 
      style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
    >
      {/* Header - Fixed */}
      <div className="flex-shrink-0 p-6 border-b border-white/10 bg-black/95 backdrop-blur-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Candidate Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-grow overflow-y-auto" style={{ scrollbarWidth: 'thin', msOverflowStyle: 'none' }}>
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="h-20 w-20 rounded-full overflow-hidden mb-4 border-2 border-purple-500/30 p-1">
              <img
                src={candidate.avatar || DEFAULT_AVATAR}
                alt={candidate.name}
                className="h-full w-full object-cover rounded-full"
                onError={(e) => {
                  // If image fails to load, replace with default avatar
                  e.currentTarget.src = DEFAULT_AVATAR;
                }}
              />
            </div>
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">{candidate.name}</h3>
            <p className="text-gray-400 text-sm">{candidate.role}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-lg p-4 border border-white/10">
              <h4 className="text-sm font-medium text-gray-400 mb-2">CONTACT INFORMATION</h4>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1.5">EMAIL ADDRESS</p>
                  <div className="flex items-center gap-2 pl-1">
                    <Mail size={16} className="text-purple-400" />
                    <p className="text-sm">{candidate.name.toLowerCase().replace(' ', '.') + '@gmail.com'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1.5">PHONE NUMBER</p>
                  <div className="flex items-center gap-2 pl-1">
                    <Phone size={16} className="text-purple-400" />
                    <p className="text-sm">+11 5423-6548</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4">Application Details</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500/20 to-green-400/40 flex items-center justify-center">
                  <CheckCircle size={16} className="text-green-500" />
                </div>
                <div>
                  <p className="text-white font-medium">Screening</p>
                  <p className="text-xs text-gray-400">March 20, 2023</p>
                </div>
              </div>

              <div className="ml-4 h-8 border-l border-dashed border-white/20"></div>

              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-400/40 flex items-center justify-center">
                  <Clock size={16} className="text-yellow-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium">Design Challenge</p>
                    <span className="text-[10px] text-yellow-500 px-2 py-0.5 border border-yellow-500 rounded-full">Under Review</span>
                  </div>
                  <p className="text-xs text-gray-400">March 22, 2023</p>
                </div>
              </div>

              <div className="ml-4 h-8 border-l border-dashed border-white/20"></div>

              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full border-2 border-white/20 flex items-center justify-center">
                  <span className="text-sm font-medium">3</span>
                </div>
                <p>Interview</p>
              </div>

              <div className="ml-4 h-8 border-l border-dashed border-white/20"></div>

              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full border-2 border-white/20 flex items-center justify-center">
                  <span className="text-sm font-medium">4</span>
                </div>
                <p>HR Round</p>
              </div>

              <div className="ml-4 h-8 border-l border-dashed border-white/20"></div>

              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full border-2 border-white/20 flex items-center justify-center">
                  <span className="text-sm font-medium">5</span>
                </div>
                <p>Hired</p>
              </div>
            </div>
          </div>

          <div className="mt-8 mb-4">
            <h4 className="text-lg font-semibold mb-4">Experience</h4>
            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-gradient-to-r from-pink-500/20 to-purple-500/20 flex items-center justify-center text-white">
                    A
                  </div>
                  <h5 className="font-medium">AirBnb</h5>
                </div>
                <p className="text-xs text-gray-400">Oct 20 - Present</p>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Led the redesign of the booking process for AirBnb's mobile app, resulting in a 30% increase in conversion rates and improved user satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Fixed */}
      <div className="flex-shrink-0 p-6 border-t border-white/10 bg-black/95 backdrop-blur-lg">
        <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all font-medium flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20">
          Move to Next Step
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
};

export default CandidateDetailsDrawer;
