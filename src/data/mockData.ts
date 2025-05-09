import { JobCardProps } from '@/components/jobs/JobCard';
import { MapPin, Briefcase, LineChart, Server, Users, Database, Code, HeartHandshake } from 'lucide-react';
import React from 'react';

export const jobs: JobCardProps[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    daysAgo: 14,
    location: 'San Francisco, CA (Remote)',
    experience: '5+ years',
    applications: 24,
    newApplicationsThisWeek: 3,
    colorAccent: 'blue',
    iconName: 'Code'
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    daysAgo: 3,
    location: 'New York, NY (Hybrid)',
    experience: '3+ years',
    applications: 18,
    newApplicationsThisWeek: 7,
    colorAccent: 'red',
    iconName: 'LineChart'
  },
  {
    id: '3',
    title: 'Product Manager',
    daysAgo: 7,
    location: 'Austin, TX (Remote)',
    experience: '4+ years',
    applications: 12,
    newApplicationsThisWeek: 5,
    colorAccent: 'green',
    iconName: 'Users'
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    daysAgo: 2,
    location: 'Seattle, WA (On-site)',
    experience: '3+ years',
    applications: 8,
    newApplicationsThisWeek: 2,
    colorAccent: 'yellow',
    iconName: 'Server'
  },
  {
    id: '5',
    title: 'Marketing Specialist',
    daysAgo: 5,
    location: 'Chicago, IL (Remote)',
    experience: '2+ years',
    applications: 15,
    newApplicationsThisWeek: 4,
    colorAccent: 'blue',
    iconName: 'Code'
  },
  {
    id: '6',
    title: 'Data Scientist',
    daysAgo: 7,
    location: 'Boston, MA (Hybrid)',
    experience: '4+ years',
    applications: 9,
    newApplicationsThisWeek: 2,
    colorAccent: 'red',
    iconName: 'Database'
  },
  {
    id: '7',
    title: 'Backend Developer',
    daysAgo: 4,
    location: 'San Francisco, CA (Remote)',
    experience: '3+ years',
    applications: 21,
    newApplicationsThisWeek: 6,
    colorAccent: 'green',
    iconName: 'Code'
  },
  {
    id: '8',
    title: 'Customer Success Manager',
    daysAgo: 3,
    location: 'Denver, CO (On-site)',
    experience: '2+ years',
    applications: 7,
    newApplicationsThisWeek: 1,
    colorAccent: 'yellow',
    iconName: 'HeartHandshake'
  }
];

export interface Candidate {
  id: number;
  name: string;
  avatar: string;
  role: string;
  status: 'new' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  rating: number;
  appliedFor: string;
  appliedDate: string;
  tags: string[];
}

export const candidates: Candidate[] = [
  {
    id: 1,
    name: 'Charlie Kristen',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    role: 'Sr. UX Designer',
    status: 'interview',
    rating: 4.0,
    appliedFor: 'UX/UI Designer',
    appliedDate: '12/02/23',
    tags: ['design', 'figma', 'ui/ux']
  },
  {
    id: 2,
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    role: 'Frontend Developer',
    status: 'screening',
    rating: 4.5,
    appliedFor: 'Senior Frontend Developer',
    appliedDate: '15/02/23',
    tags: ['react', 'typescript', 'frontend']
  },
  {
    id: 3,
    name: 'Maya Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    role: 'Product Manager',
    status: 'new',
    rating: 3.8,
    appliedFor: 'Product Manager',
    appliedDate: '18/02/23',
    tags: ['product', 'agile', 'strategy']
  },
  {
    id: 4,
    name: 'James Chen',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    role: 'DevOps Engineer',
    status: 'offer',
    rating: 4.7,
    appliedFor: 'DevOps Engineer',
    appliedDate: '10/02/23',
    tags: ['aws', 'kubernetes', 'ci/cd']
  },
  {
    id: 5,
    name: 'Sophia Kim',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    role: 'Data Scientist',
    status: 'hired',
    rating: 4.9,
    appliedFor: 'Data Scientist',
    appliedDate: '05/02/23',
    tags: ['python', 'machine learning', 'data']
  },
  {
    id: 6,
    name: 'Daniel Torres',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    role: 'Backend Developer',
    status: 'rejected',
    rating: 3.2,
    appliedFor: 'Backend Developer',
    appliedDate: '20/02/23',
    tags: ['java', 'spring', 'microservices']
  }
];

// Data for Insights page
export const applicantsOverTimeData = [
  { week: 'W1', count: 65 },
  { week: 'W2', count: 40 },
  { week: 'W3', count: 75 },
  { week: 'W4', count: 85 },
  { week: 'W5', count: 55 },
  { week: 'W6', count: 30 },
  { week: 'W7', count: 60 },
  { week: 'W8', count: 80 }
];

export const conversionRatesData = [
  { stage: 'Applied', rate: 100, color: '#8b5cf6' },
  { stage: 'Screened', rate: 60, color: '#8b5cf6' },
  { stage: 'Interviewed', rate: 40, color: '#ec4899' },
  { stage: 'Offered', rate: 25, color: '#ec4899' },
  { stage: 'Hired', rate: 18, color: '#ec4899' }
];

export const sourcingChannelsData = [
  { channel: 'LinkedIn', applicants: 42, color: '#8b5cf6' },
  { channel: 'Company Website', applicants: 28, color: '#ec4899' },
  { channel: 'Indeed', applicants: 18, color: '#3b82f6' },
  { channel: 'Referrals', applicants: 15, color: '#10b981' },
  { channel: 'Other', applicants: 7, color: '#6b7280' }
];

export const popularRolesData = [
  { role: 'Frontend Developer', applicants: 86, fillRate: 75 },
  { role: 'UX Designer', applicants: 42, fillRate: 60 },
  { role: 'Product Manager', applicants: 38, fillRate: 50 },
  { role: 'Data Scientist', applicants: 32, fillRate: 40 },
  { role: 'DevOps Engineer', applicants: 28, fillRate: 70 }
];

export const timeToHireData = [
  { month: 'Jan', days: 25 },
  { month: 'Feb', days: 23 },
  { month: 'Mar', days: 26 },
  { month: 'Apr', days: 20 },
  { month: 'May', days: 18 },
  { month: 'Jun', days: 21 }
];

export const departmentHiringData = [
  { 
    department: 'Engineering', 
    openRoles: 8, 
    applications: 86, 
    interviews: 24, 
    offers: 12, 
    hired: 6 
  },
  { 
    department: 'Design', 
    openRoles: 4, 
    applications: 42, 
    interviews: 18, 
    offers: 8, 
    hired: 5 
  },
  { 
    department: 'Product', 
    openRoles: 3, 
    applications: 38, 
    interviews: 15, 
    offers: 6, 
    hired: 3 
  },
  { 
    department: 'Marketing', 
    openRoles: 5, 
    applications: 50, 
    interviews: 22, 
    offers: 10, 
    hired: 7 
  },
  { 
    department: 'Sales', 
    openRoles: 6, 
    applications: 68, 
    interviews: 30, 
    offers: 18, 
    hired: 12 
  }
]; 