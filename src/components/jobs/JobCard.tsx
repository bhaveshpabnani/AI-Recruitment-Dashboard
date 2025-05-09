import React from 'react';
import { MapPin, Briefcase, ExternalLink, Code, Database, Server, LineChart, Users, HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface JobCardProps {
  id: string;
  title: string;
  daysAgo: number;
  location: string;
  experience: string;
  applications: number;
  newApplicationsThisWeek: number;
  colorAccent: 'blue' | 'red' | 'yellow' | 'green';
  iconName: string;
}

const JobCard = ({ 
  title, 
  daysAgo, 
  location, 
  experience, 
  applications, 
  newApplicationsThisWeek,
  colorAccent,
  iconName
}: JobCardProps) => {
  const borderClass = {
    'blue': 'job-card-border-blue',
    'red': 'job-card-border-red',
    'yellow': 'job-card-border-yellow',
    'green': 'job-card-border-green',
  }[colorAccent] || 'job-card-border-blue';

  const gradientClass = {
    'blue': 'bg-gradient-to-br from-black to-blue-950/50 hover:from-blue-950/20 hover:to-blue-900/30',
    'red': 'bg-gradient-to-br from-black to-red-950/50 hover:from-red-950/20 hover:to-red-900/30',
    'yellow': 'bg-gradient-to-br from-black to-amber-950/50 hover:from-amber-950/20 hover:to-amber-900/30',
    'green': 'bg-gradient-to-br from-black to-green-950/50 hover:from-green-950/20 hover:to-green-900/30',
  }[colorAccent] || 'bg-gradient-to-br from-black to-blue-950/50 hover:from-blue-950/20 hover:to-blue-900/30';

  const iconBgClass = {
    'blue': 'bg-blue-900/30',
    'red': 'bg-red-900/30',
    'yellow': 'bg-amber-900/30',
    'green': 'bg-green-900/30',
  }[colorAccent] || 'bg-blue-900/30';
  
  const textColorClass = {
    'blue': 'text-blue-400',
    'red': 'text-red-400',
    'yellow': 'text-amber-400',
    'green': 'text-green-400',
  }[colorAccent] || 'text-blue-400';
  
  // Render the correct icon based on iconName
  const renderIcon = () => {
    const iconSize = 16;
    switch (iconName) {
      case 'Code':
        return <Code size={iconSize} className={textColorClass} />;
      case 'Database':
        return <Database size={iconSize} className={textColorClass} />;
      case 'Server':
        return <Server size={iconSize} className={textColorClass} />;
      case 'LineChart':
        return <LineChart size={iconSize} className={textColorClass} />;
      case 'Users':
        return <Users size={iconSize} className={textColorClass} />;
      case 'HeartHandshake':
        return <HeartHandshake size={iconSize} className={textColorClass} />;
      default:
        return <Code size={iconSize} className={textColorClass} />;
    }
  };

  return (
    <div className={cn(
      "job-card", 
      borderClass, 
      gradientClass,
      "animate-scale-in",
      "transition-all duration-300 hover:shadow-lg",
      {
        'hover:shadow-blue-900/20': colorAccent === 'blue',
        'hover:shadow-red-900/20': colorAccent === 'red',
        'hover:shadow-amber-900/20': colorAccent === 'yellow',
        'hover:shadow-green-900/20': colorAccent === 'green',
      }
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className={cn("h-8 w-8 rounded-md flex items-center justify-center", iconBgClass)}>
            {renderIcon()}
          </div>
          <div>
            <h3 className="text-white font-semibold">{title}</h3>
            <p className="text-gray-400 text-xs">Posted {daysAgo} days ago</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ExternalLink size={16} className="text-gray-400" />
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <MapPin size={14} />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <Briefcase size={14} />
          <span>{experience} exp.</span>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white">{applications}</h2>
          <p className="text-gray-400 text-xs">applications</p>
        </div>
        <div className="text-xs font-medium px-2 py-1 rounded-md">
          <span className={cn({
            'text-blue-300': colorAccent === 'blue',
            'text-red-300': colorAccent === 'red',
            'text-amber-300': colorAccent === 'yellow',
            'text-green-300': colorAccent === 'green',
          })}>{newApplicationsThisWeek} in last week</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
