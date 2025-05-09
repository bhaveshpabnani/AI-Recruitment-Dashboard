import React, { useState } from 'react';
import { ArrowLeft, Save, Upload, Plus, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { jobs } from '@/data/mockData';

const skillOptions = [
  'React', 'Angular', 'Vue', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Node.js',
  'Python', 'Java', 'C#', '.NET', 'Ruby', 'PHP', 'Go', 'Swift', 'Kotlin',
  'SQL', 'MongoDB', 'Firebase', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
  'CI/CD', 'Git', 'Agile', 'Scrum', 'UI/UX', 'Figma', 'Adobe XD', 'Sketch',
  'Data Analysis', 'Machine Learning', 'AI', 'Blockchain', 'DevOps', 'Testing',
  'QA', 'Security', 'SEO', 'Marketing', 'Sales', 'Product Management'
];

const AddCandidate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    jobId: '',
    resume: null as File | null,
    linkedin: '',
    github: '',
    portfolio: '',
    skills: [] as string[],
    notes: '',
  });
  
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        resume: e.target.files![0]
      }));
    }
  };
  
  const handleAddSkill = () => {
    if (skillInput.trim() && !selectedSkills.includes(skillInput.trim())) {
      setSelectedSkills(prev => [...prev, skillInput.trim()]);
      setSkillInput('');
    }
  };
  
  const handleSelectSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills(prev => [...prev, skill]);
    }
  };
  
  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(prev => prev.filter(s => s !== skill));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update skills before submitting
    const updatedFormData = {
      ...formData,
      skills: selectedSkills
    };
    
    console.log('Form submitted:', updatedFormData);
    
    // In a real application, you would send this data to your backend
    // For now, we'll just navigate back to the candidates page
    navigate('/candidates');
  };
  
  const filteredSkillOptions = skillOptions.filter(
    skill => !selectedSkills.includes(skill) && 
    skill.toLowerCase().includes(skillInput.toLowerCase())
  );
  
  return (
    <div className="animate-fade-in pb-10">
      {/* Background design elements */}
      <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Link to="/candidates" className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold">Add New Candidate</h1>
        </div>
        
        <button 
          onClick={handleSubmit}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all"
        >
          <Save size={18} />
          <span>Save Candidate</span>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">First Name</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="First Name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Current Role</label>
                  <input 
                    type="text" 
                    name="role" 
                    value={formData.role} 
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Senior Developer"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Applying For</label>
                  <select 
                    name="jobId" 
                    value={formData.jobId} 
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select a job opening</option>
                    {jobs.map(job => (
                      <option key={job.id} value={job.id}>{job.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Resume / CV</label>
                <div className="flex items-center">
                  <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-black/40 border border-white/10 border-dashed rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                    <Upload size={18} />
                    <span className="text-gray-300">
                      {formData.resume ? formData.resume.name : 'Drag & drop or click to upload'}
                    </span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Skills & Expertise</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Skills</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedSkills.map(skill => (
                    <div 
                      key={skill} 
                      className="flex items-center gap-1 bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-full text-sm"
                    >
                      <span>{skill}</span>
                      <button 
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="h-4 w-4 rounded-full flex items-center justify-center hover:bg-purple-400/20"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={skillInput} 
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Add skills (e.g., JavaScript, React, etc.)"
                  />
                  <button 
                    type="button"
                    onClick={handleAddSkill}
                    className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                
                {skillInput && filteredSkillOptions.length > 0 && (
                  <div className="mt-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    <div className="p-1">
                      {filteredSkillOptions.slice(0, 6).map(skill => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleSelectSkill(skill)}
                          className="w-full text-left px-3 py-1.5 hover:bg-white/10 rounded-md text-sm transition-colors"
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">LinkedIn</label>
                <input 
                  type="url" 
                  name="linkedin" 
                  value={formData.linkedin} 
                  onChange={handleInputChange}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">GitHub</label>
                  <input 
                    type="url" 
                    name="github" 
                    value={formData.github} 
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://github.com/username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Portfolio/Website</label>
                  <input 
                    type="url" 
                    name="portfolio" 
                    value={formData.portfolio} 
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Notes</label>
                <textarea 
                  name="notes" 
                  value={formData.notes} 
                  onChange={handleInputChange}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px]"
                  placeholder="Additional notes about the candidate..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-black/80 to-gray-900/70 border border-white/10 rounded-xl p-6 shadow-lg sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Candidate Summary</h2>
            
            <div className="flex flex-col items-center mb-6">
              <div className="h-20 w-20 bg-gradient-to-br from-purple-600/30 to-pink-400/20 rounded-full flex items-center justify-center text-2xl font-bold mb-3">
                {formData.firstName.charAt(0) || '?'}{formData.lastName.charAt(0) || '?'}
              </div>
              <h3 className="text-lg font-semibold text-center">
                {(formData.firstName || formData.lastName) ? 
                  `${formData.firstName} ${formData.lastName}` : 
                  'New Candidate'}
              </h3>
              <p className="text-sm text-gray-400">{formData.role || 'Role not specified'}</p>
            </div>
            
            <div className="space-y-3 mb-6">
              {formData.email && (
                <div className="flex items-center gap-2 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{formData.email}</span>
                </div>
              )}
              
              {formData.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{formData.phone}</span>
                </div>
              )}
              
              {formData.jobId && (
                <div className="flex items-center gap-2 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>
                    {jobs.find(job => job.id.toString() === formData.jobId)?.title || 'Selected Job'}
                  </span>
                </div>
              )}
              
              {formData.resume && (
                <div className="flex items-center gap-2 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="10 9 9 9 8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="truncate max-w-[200px]">{formData.resume.name}</span>
                </div>
              )}
            </div>
            
            {selectedSkills.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkills.map(skill => (
                    <span 
                      key={skill} 
                      className="bg-black/40 border border-white/10 px-2 py-0.5 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all font-medium"
              >
                <Save size={18} />
                <span>Save Candidate</span>
              </button>
              
              <button 
                type="button"
                onClick={() => navigate('/candidates')}
                className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 bg-black/40 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCandidate; 