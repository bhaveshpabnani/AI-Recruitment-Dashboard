import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CreateJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'full-time',
    experience: 'mid-level',
    salary: { min: '', max: '' },
    description: '',
    requirements: [''],
    responsibilities: [''],
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        [name]: value
      }
    }));
  };
  
  const handleListItemChange = (list: 'requirements' | 'responsibilities', index: number, value: string) => {
    setFormData(prev => {
      const newList = [...prev[list]];
      newList[index] = value;
      return {
        ...prev,
        [list]: newList
      };
    });
  };
  
  const addListItem = (list: 'requirements' | 'responsibilities') => {
    setFormData(prev => ({
      ...prev,
      [list]: [...prev[list], '']
    }));
  };
  
  const removeListItem = (list: 'requirements' | 'responsibilities', index: number) => {
    if (formData[list].length <= 1) return;
    
    setFormData(prev => {
      const newList = prev[list].filter((_, i) => i !== index);
      return {
        ...prev,
        [list]: newList
      };
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // In a real application, you would send this data to your backend
    // For now, we'll just navigate back to the jobs page
    navigate('/jobs');
  };
  
  return (
    <div className="animate-fade-in">
      {/* Background design elements */}
      <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Link to="/jobs" className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold">Create New Job</h1>
        </div>
        
        <button 
          onClick={handleSubmit}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all"
        >
          <Save size={18} />
          <span>Save & Publish</span>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Job Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Job Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleInputChange}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Senior Frontend Developer"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Department</label>
                  <input 
                    type="text" 
                    name="department" 
                    value={formData.department} 
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Engineering"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Location</label>
                  <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., San Francisco, CA (Remote)"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Job Type</label>
                  <select 
                    name="type" 
                    value={formData.type} 
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Experience Level</label>
                  <select 
                    name="experience" 
                    value={formData.experience} 
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="entry-level">Entry Level</option>
                    <option value="mid-level">Mid Level</option>
                    <option value="senior">Senior</option>
                    <option value="lead">Lead</option>
                    <option value="executive">Executive</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Salary Range (USD)</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input 
                      type="number" 
                      name="min" 
                      value={formData.salary.min} 
                      onChange={handleRangeChange}
                      className="w-full bg-black/40 border border-white/10 rounded-lg pl-8 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Min"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input 
                      type="number" 
                      name="max" 
                      value={formData.salary.max} 
                      onChange={handleRangeChange}
                      className="w-full bg-black/40 border border-white/10 rounded-lg pl-8 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Job Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px]"
                  placeholder="Describe the role and your company..."
                  required
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Requirements</h2>
              <button 
                type="button"
                onClick={() => addListItem('requirements')}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={requirement} 
                    onChange={(e) => handleListItemChange('requirements', index, e.target.value)}
                    className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={`Requirement #${index + 1}`}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => removeListItem('requirements', index)}
                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Responsibilities</h2>
              <button 
                type="button"
                onClick={() => addListItem('responsibilities')}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.responsibilities.map((responsibility, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={responsibility} 
                    onChange={(e) => handleListItemChange('responsibilities', index, e.target.value)}
                    className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={`Responsibility #${index + 1}`}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => removeListItem('responsibilities', index)}
                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl p-6 shadow-lg sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-600/10 rounded-lg p-5 border border-white/10">
              <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 inline-block mb-3">
                Draft
              </div>
              
              <h3 className="text-lg font-semibold mb-1">
                {formData.title || 'Job Title'}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {formData.department || 'Department'}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-300">
                    {formData.location || 'Location'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-300">Posted Today</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-sm text-gray-400">
              <p>This preview shows how your job will appear in the job listings. Fill out all fields to see a complete preview.</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all font-medium"
              >
                <Save size={18} />
                <span>Save & Publish</span>
              </button>
              
              <button 
                type="button"
                className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 bg-black/40 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span>Save as Draft</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateJob; 