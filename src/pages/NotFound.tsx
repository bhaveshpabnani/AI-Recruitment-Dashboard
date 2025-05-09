import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      {/* Background design elements */}
      <div className="absolute top-40 left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-40 right-20 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="mb-8 relative">
        <div className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">404</div>
        <div className="absolute -top-6 -right-6 w-16 h-16 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center animate-bounce-slow">
          <span className="text-xl">🔍</span>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
      <p className="text-gray-400 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved to another location.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Go Back</span>
        </button>
        
        <Link 
          to="/dashboard" 
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all"
        >
          <Home size={18} />
          <span>Go to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
