import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageCircle, 
  Calendar, 
  Briefcase,
  Users,
  UserPlus,
  MonitorSmartphone,
  Users2,
  FileText,
  BarChartBig,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NavItem = ({ 
  to, 
  icon: Icon, 
  label,
  badge,
  isActive,
}: { 
  to: string; 
  icon: React.ElementType; 
  label: string;
  badge?: number;
  isActive?: boolean;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-2.5 px-4 py-2.5 rounded-md transition-colors mb-1",
        "hover:bg-white/10",
        isActive 
          ? "bg-gradient-to-r from-purple-600/30 to-pink-500/30 font-medium text-white border-l-2 border-purple-500" 
          : "text-gray-400"
      )
    }
  >
    <Icon size={17} />
    <span>{label}</span>
    {badge && (
      <span className="ml-auto bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </NavLink>
);

const Sidebar = () => {
  return (
    <div className="w-60 h-screen border-r border-white/10 flex flex-col bg-black/95 backdrop-blur-lg">
      <div className="p-4 flex items-center border-b border-white/5">
        <div className="flex items-center gap-2">
          <img src="/assets/Logo.png" alt="Dokkaabi logo" className="w-6 h-6" />
          <span className="text-white text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Dokkaabi</span>
        </div>
      </div>
      
      <div className="flex-1 px-3 py-3 overflow-hidden">
        <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/messages" icon={MessageCircle} label="Messages" badge={10} />
        <NavItem to="/calendar" icon={Calendar} label="Calendar" />
        
        <div className="mt-5 mb-1.5 px-4">
          <span className="text-xs font-semibold text-gray-500 tracking-wider">RECRUITMENT</span>
        </div>
        
        <NavItem to="/jobs" icon={Briefcase} label="Jobs" />
        <NavItem to="/candidates" icon={Users} label="Candidates" />
        <NavItem to="/chatbot" icon={MessageSquare} label="AI Assistant" />
        <NavItem to="/referrals" icon={UserPlus} label="Referrals" />
        <NavItem to="/career-site" icon={MonitorSmartphone} label="Career Site" />
        
        <div className="mt-5 mb-1.5 px-4">
          <span className="text-xs font-semibold text-gray-500 tracking-wider">ORGANIZATION</span>
        </div>
        
        <NavItem to="/employees" icon={Users2} label="Employees" />
        <NavItem to="/documents" icon={FileText} label="Documents" />
        <NavItem to="/insights" icon={BarChartBig} label="Reports" />
      </div>
      
      <div className="mt-auto p-4 border-t border-white/5">
        <div className="bg-black/40 rounded-lg p-3 text-xs text-gray-400">
          <div className="font-semibold text-white mb-1">Dokkaabi Recruitment</div>
          <div>v1.0.0 • Build 2023.06</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
