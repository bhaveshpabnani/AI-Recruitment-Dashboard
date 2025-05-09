import React, { useState, useEffect } from 'react';
import { Search, Settings, Bell, ChevronDown, UserPlus, MessageSquare, LogOut, User, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { signOut } from '@/pages/Login';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Get current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  useEffect(() => {
    // Get the current session
    const getSession = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      
      if (data.session?.user) {
        setUserEmail(data.session.user.email || '');
        
        // Fetch user profile from the profiles table
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('name, role')
          .eq('id', data.session.user.id)
          .single();
        
        if (profileData && !error) {
          setUserName(profileData.name || '');
          setUserRole(profileData.role || '');
        } else {
          // Fallback to user metadata if profile not found
          const metadata = data.session.user.user_metadata;
          setUserName(metadata?.full_name || '');
          setUserRole(metadata?.role || '');
        }
      }
      setLoading(false);
    };
    
    getSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          setUserEmail(session.user.email || '');
          
          // Fetch user profile on auth state change
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('name, role')
            .eq('id', session.user.id)
            .single();
          
          if (profileData && !error) {
            setUserName(profileData.name || '');
            setUserRole(profileData.role || '');
          } else {
            // Fallback to user metadata
            const metadata = session.user.user_metadata;
            setUserName(metadata?.full_name || '');
            setUserRole(metadata?.role || '');
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out"
      });
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        description: "An error occurred while signing out",
        variant: "destructive"
      });
    }
  };

  const closeMenu = () => {
    setProfileMenuOpen(false);
  };

  // Handle clicking outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (profileMenuOpen && !target.closest('[data-profile-menu]')) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileMenuOpen]);

  return (
    <div className="border-b border-white/10 px-8 py-4 flex items-center justify-between backdrop-blur-md bg-black/40 z-20 relative">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for jobs, candidates and more..." 
            className="w-full bg-black/30 border border-white/10 text-gray-300 rounded-lg py-2 pl-10 pr-4 outline-none focus:ring-1 focus:ring-white/20"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 text-gray-300 text-sm">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-white/5 transition-colors relative">
            <Bell className="h-5 w-5 text-gray-400" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-pink-500 rounded-full"></span>
          </button>
          
          <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
            <Settings className="h-5 w-5 text-gray-400" />
          </button>
          
          <div className="relative" data-profile-menu>
            <button 
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full hover:bg-white/5 transition-colors border border-white/10"
            >
              <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-purple-500/30 hover:ring-purple-500/50 transition-all bg-gray-600">
                <User className="h-full w-full p-2 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">{userEmail || 'guest@example.com'}</div>
                <div className="text-xs text-gray-400">{userRole || 'Recruiter'}</div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400 hidden md:block" />
            </button>
            
            {profileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-lg shadow-xl z-50 bg-gray-900 border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/10 bg-black">
                  <div className="font-medium">{userName || 'Guest User'}</div>
                  <div className="text-xs text-gray-400 mt-1">{userEmail || 'guest@example.com'}</div>
                </div>
                <div className="py-1 bg-black">
                  <button 
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-gray-800 transition-colors"
                    onClick={() => {
                      navigate('/profile');
                      closeMenu();
                    }}
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </button>
                  <button 
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-gray-800 transition-colors"
                    onClick={() => {
                      navigate('/settings');
                      closeMenu();
                    }}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                </div>
                <div className="py-1 border-t border-white/10 bg-black">
                  <button 
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-950 transition-colors"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
