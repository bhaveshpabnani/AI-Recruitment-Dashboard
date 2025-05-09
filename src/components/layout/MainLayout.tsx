import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const MainLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      // Check if user is authenticated
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        // Redirect to login page if not authenticated
        navigate('/login');
        return;
      }
      
      setIsAuthenticated(true);
      setIsLoading(false);
    };
    
    checkAuth();
    
    // Set up auth state listener to handle real-time auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          // Redirect to login page on sign out
          navigate('/login');
        } else if (session) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  

  return (
    <div className="min-h-screen bg-black font-urbanist text-white">
      <div className="min-h-screen flex">
        {/* Fixed sidebar */}
        <div className="fixed top-0 left-0 h-screen z-40">
          <Sidebar />
        </div>
        
        {/* Main content area with left margin to account for fixed sidebar */}
        <div className="flex-1 ml-64 flex flex-col">
          {/* Header stays at the top with appropriate z-index */}
          <div className="sticky top-0 z-30">
            <Header />
          </div>
          
          {/* Content area */}
          <div className="p-6 flex-1 relative z-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;