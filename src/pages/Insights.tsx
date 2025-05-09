import React, { useState } from 'react';
import AnalyticsCard from '@/components/analytics/AnalyticsCard';
import { 
  applicantsOverTimeData, 
  conversionRatesData,
  sourcingChannelsData,
  popularRolesData,
  timeToHireData,
  departmentHiringData
} from '@/data/mockData';
import { Calendar, Download, ChevronDown } from 'lucide-react';

// Transform data for AnalyticsCard
const applicationsChartData = applicantsOverTimeData.map(item => ({
  name: item.week,
  applications: item.count
}));

const DonutChart = () => {
  const totalPercentage = conversionRatesData[conversionRatesData.length - 1].rate;
  
  return (
    <div className="h-64 flex items-center justify-center">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#374151"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="3"
            strokeDasharray="60, 100"
            strokeDashoffset="25"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#ec4899"
            strokeWidth="3"
            strokeDasharray="30, 100"
            strokeDashoffset="75"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-2xl font-bold">{totalPercentage}%</div>
          <div className="text-xs text-gray-400">Success Rate</div>
        </div>
      </div>
    </div>
  );
};

const LineChart = () => {
  const maxDays = Math.max(...timeToHireData.map(item => item.days));
  const points = timeToHireData.map((item, index) => {
    const x = (index * 100) / (timeToHireData.length - 1);
    const y = 50 - ((item.days / maxDays) * 40);
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className="h-64 flex items-end p-4">
      <svg viewBox="0 0 100 50" className="w-full h-full">
        <polyline
          points={points}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const MetricCard = ({ title, value, change, isPositive = true }) => {
  return (
    <div className="bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl p-4 flex flex-col shadow-md">
      <div className="text-gray-400 text-sm mb-2">{title}</div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div className={`text-xs ${isPositive ? 'text-green-400' : 'text-red-400'} flex items-center`}>
        {isPositive ? '↑' : '↓'} {change} from last month
      </div>
    </div>
  );
};

const Insights = () => {
  const [timeRange, setTimeRange] = useState('This Month');

  return (
    <div className="animate-fade-in">
      {/* Background design elements */}
      <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-80 right-20 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Analytics</span>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">Recruitment Insights</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 text-sm">
            <Calendar size={16} />
            <span>{timeRange}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          
          <button className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 text-sm">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard 
          title="New Applications" 
          value="128" 
          change="12%" 
          isPositive={true} 
        />
        <MetricCard 
          title="Interviews Scheduled" 
          value="45" 
          change="8%" 
          isPositive={true} 
        />
        <MetricCard 
          title="Offer Acceptance" 
          value="86%" 
          change="5%" 
          isPositive={true} 
        />
        <MetricCard 
          title="Time to Hire" 
          value="18 days" 
          change="3 days" 
          isPositive={false} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Applications Over Time</h2>
            <div className="text-sm text-gray-400">Last 8 weeks</div>
          </div>
          <AnalyticsCard 
            title=""
            chartType="bar"
            data={applicationsChartData}
            colors={['#8b5cf6', '#ec4899']}
          />
        </div>
        
        <div className="bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Hiring Funnel</h2>
            <div className="text-sm text-gray-400">Conversion Rates</div>
          </div>
          <DonutChart />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl p-6 shadow-lg mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Department Hiring Progress</h2>
          <div className="text-sm text-gray-400">Current Quarter</div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Department</th>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Open Roles</th>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Applications</th>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Interviews</th>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Offers</th>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Hired</th>
              </tr>
            </thead>
            <tbody>
              {departmentHiringData.map((dept, index) => (
                <tr key={index} className={index < departmentHiringData.length - 1 ? "border-b border-white/10" : ""}>
                  <td className="py-3">{dept.department}</td>
                  <td className="py-3">{dept.openRoles}</td>
                  <td className="py-3">{dept.applications}</td>
                  <td className="py-3">{dept.interviews}</td>
                  <td className="py-3">{dept.offers}</td>
                  <td className="py-3">{dept.hired}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Time to Hire Trend</h2>
          <div className="text-sm text-gray-400">Last 6 months</div>
        </div>
        <LineChart />
      </div>
    </div>
  );
};

export default Insights;
