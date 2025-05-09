import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, HelpCircle, Briefcase, BarChart, Users, MessageSquare } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

// Exported function for signing out - can be used by other components
export const signOut = async () => {
  return await supabase.auth.signOut();
};

interface User {
  id: string;
  role: "recruiter" | "manager" | "admin";
  email: string;
}

const Login: React.FC = () => {
  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Signup state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companySize, setCompanySize] = useState("10-50");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [industry, setIndustry] = useState("Technology");
  const [role, setRole] = useState<"recruiter" | "manager" | "admin">("recruiter");
  const [recruiterId, setRecruiterId] = useState<string>("");
  
  const [error, setError] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      if (data.session) {
        navigate('/dashboard');
      }
      setIsLoading(false);
    };
    checkSession();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) {
          navigate('/dashboard');
        }
      }
    );

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLocalLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLocalLoading(false);
        return;
      }

      if (data.user) {
        toast({
          title: "Login successful",
          description: "Welcome to the Dokkaabi Recruitment Dashboard",
        });
        
        navigate('/dashboard');
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLocalLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    setError("");
    setLocalLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        }
      });

      if (error) {
        setError(error.message);
      }
    } catch (error) {
      setError("An unexpected error occurred with Google login. Please try again.");
      console.error("Google login error:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLocalLoading(true);

    const fullName = `${firstName} ${lastName}`.trim();
    if (!fullName) {
      setError("Name is required");
      setLocalLoading(false);
      return;
    }

    if (signupPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLocalLoading(false);
      return;
    }

    if (!acceptedTerms) {
      setError("You must accept the terms of use");
      setLocalLoading(false);
      return;
    }

    if (signupPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      setLocalLoading(false);
      return;
    }

    try {
      // Create the user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: {
            full_name: fullName,
            company_name: companyName,
            company_size: companySize,
            industry: industry,
            role: role,
            recruiter_id: recruiterId || null,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        setLocalLoading(false);
        return;
      }

      if (data.user) {
        // Create profile in the profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            name: fullName,
            email: signupEmail,
            role: role,
          });

        if (profileError) {
          console.error("Error creating profile:", profileError);
          // We'll still show success but log the error
        }

        // Clear form fields
        setSignupEmail("");
        setSignupPassword("");
        setFirstName("");
        setLastName("");
        setConfirmPassword("");
        setCompanyName("");
        setIndustry("Technology");
        setRole("recruiter");
        setRecruiterId("");
        setAcceptedTerms(false);
        
        // Show success message
        toast({
          title: "Registration successful",
          description: data.session ? "You are now logged in" : "Please check your email to confirm your account",
        });
        
        // If email confirmation is required, switch to login tab
        // If session is available, user will be redirected by the auth listener
        if (!data.session) {
          setIsLoginActive(true);
        }
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          <div className="animate-spin">
            <Loader2 size={48} className="text-blue-300 mb-4" />
          </div>
          <p className="text-lg text-white">
            Loading your recruitment dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-black flex flex-col">
      {/* Header - fixed at top with high z-index */}
      <div className="fixed top-0 left-0 right-0 py-6 px-10 z-20">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <img src="/assets/Logo.png" alt="Dokkaabi logo" className="w-6 h-6" />
            <span className="text-white text-2xl font-bold">Dokkaabi</span>
          </div>
          <span className="text-white mx-3">|</span>
          <span className="text-white text-2xl font-light">Dashboard</span>
        </div>
      </div>
      
      {/* Add padding to account for fixed header */}
      <div className="pt-20"></div>
      
      {/* Main content area */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Background image section on the left - fixed position */}
        <div className="hidden md:block md:w-1/4">
          <div 
            className="fixed top-0 left-0 bottom-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url("/assets/login_image.jpg")',
              width: '25%',
              height: '100vh',
              zIndex: 10 // Lower z-index than header
            }}
          />
        </div>
        
        {/* Form and features section - responsive width */}
        <div className="w-full md:w-3/4 md:ml-0">
          <div className="flex">
            {/* Login/Join form section */}
            <div className="w-full lg:w-1/2 md:border-l md:border-white/5">
              {/* Tab navigation */}
              <div className="flex">
                <button 
                  className={`w-1/2 py-3 text-center font-medium ${isLoginActive ? 'bg-gray-300 text-gray-800' : 'bg-white text-gray-600'}`}
                  onClick={() => setIsLoginActive(true)}
                >
                  Login
                </button>
                <button 
                  className={`w-1/2 py-3 text-center font-medium ${!isLoginActive ? 'bg-gray-300 text-gray-800' : 'bg-white text-gray-600'}`}
                  onClick={() => setIsLoginActive(false)}
                >
                  Register
                </button>
              </div>
              
              {/* Form content area with white background */}
              <div className="bg-white p-6 text-gray-800">
                {isLoginActive ? (
                  /* Login Form */
                  <>
                    <h2 className="text-xl font-medium mb-6">
                      Welcome to your AI Recruitment Dashboard
                    </h2>
                    
                    {error && (
                      <div className="bg-red-100 text-red-700 p-3 rounded-md mb-6 text-sm">
                        {error}
                      </div>
                    )}
                    
                    <form onSubmit={handleLogin} className="space-y-4">
                      {/* Email field */}
                      <div className="form-field">
                        <div className="relative">
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 rounded border border-gray-300 pt-6 pb-2 bg-white text-gray-800"
                            required
                          />
                          <label 
                            htmlFor="email" 
                            className={`absolute left-2 ${email ? 'text-xs top-1' : 'text-sm top-1/2 -translate-y-1/2'} transition-all text-gray-500`}
                          >
                            Work Email*
                          </label>
                        </div>
                      </div>
                      
                      {/* Password field */}
                      <div className="form-field">
                        <div className="relative">
                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 rounded border border-gray-300 pt-6 pb-2 bg-white text-gray-800"
                            required
                          />
                          <label 
                            htmlFor="password" 
                            className={`absolute left-2 ${password ? 'text-xs top-1' : 'text-sm top-1/2 -translate-y-1/2'} transition-all text-gray-500`}
                          >
                            Password*
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      {/* Forgot password link */}
                      <div className="flex justify-end">
                        <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                      </div>
                      
                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={localLoading}
                        className="w-full py-3 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors mt-4"
                      >
                        {localLoading ? (
                          <span className="flex items-center justify-center">
                            <Loader2 size={16} className="animate-spin mr-2" />
                            Logging in...
                          </span>
                        ) : (
                          "Log in to Dashboard"
                        )}
                      </button>
                    </form>
                    
                    {/* Or divider */}
                    <div className="mt-8 text-center">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-6 py-1 bg-white text-gray-500 uppercase text-center font-medium">OR</span>
                        </div>
                      </div>
                      
                      {/* Google login button */}
                      <div className="mt-6">
                        <button
                          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={handleGoogleLogin}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                            <path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z" fill="#FF3D00"/>
                            <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z" fill="#4CAF50"/>
                            <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
                          </svg>
                          <span>Continue with Google</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Not a member link */}
                    <div className="mt-8 border-t border-gray-300 pt-4 pb-4 text-center">
                      <p className="text-sm text-gray-600">
                        Don't have an account yet? <a href="#" onClick={(e) => { e.preventDefault(); setIsLoginActive(false); }} className="text-blue-600 hover:underline">Register now</a>
                      </p>
                    </div>
                  </>
                ) : (
                  /* Register Form */
                  <>
                    <h2 className="text-xl font-medium mb-6">
                      Register Your Account
                    </h2>
                    
                    {error && (
                      <div className="bg-red-100 text-red-700 p-3 rounded-md mb-6 text-sm">
                        {error}
                      </div>
                    )}
                    
                    {/* Company Information */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-600">Company Information</label>
                        <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                          <HelpCircle size={14} />
                        </span>
                      </div>
                      
                      <div className="form-field mb-4">
                        <div className="relative">
                          <input
                            id="companyName"
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full p-2 rounded border border-gray-300 pt-6 pb-2 bg-white text-gray-800"
                            required
                          />
                          <label 
                            htmlFor="companyName" 
                            className={`absolute left-2 ${companyName ? 'text-xs top-1' : 'text-sm top-1/2 -translate-y-1/2'} transition-all text-gray-500`}
                          >
                            Company Name*
                          </label>
                        </div>
                      </div>
                      
                      <div className="form-field">
                        <div className="relative">
                          <select
                            id="companySize"
                            value={companySize}
                            onChange={(e) => setCompanySize(e.target.value)}
                            className="w-full p-2 rounded border border-gray-300 pt-6 pb-2 bg-white text-gray-800 appearance-none"
                            required
                          >
                            <option value="1-10">1-10 employees</option>
                            <option value="10-50">10-50 employees</option>
                            <option value="50-200">50-200 employees</option>
                            <option value="200-500">200-500 employees</option>
                            <option value="500+">500+ employees</option>
                          </select>
                          <label 
                            htmlFor="companySize" 
                            className="absolute left-2 text-xs top-1 transition-all text-gray-500"
                          >
                            Company Size*
                          </label>
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">▼</span>
                        </div>
                      </div>
                    </div>
                    
                    <form onSubmit={handleSignup} className="space-y-4">
                      {/* Email field */}
                      <div className="form-field">
                        <div className="relative">
                          <input
                            id="signup-email"
                            type="email"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            className="w-full p-2 rounded border border-gray-300 pt-6 pb-2 bg-white text-gray-800"
                            required
                          />
                          <label 
                            htmlFor="signup-email" 
                            className={`absolute left-2 ${signupEmail ? 'text-xs top-1' : 'text-sm top-1/2 -translate-y-1/2'} transition-all text-gray-500`}
                          >
                            Work Email*
                          </label>
                        </div>
                      </div>
                      
                      {/* First name and Last name fields */}
                      <div className="flex gap-4">
                        <div className="w-1/2 form-field">
                          <div className="relative">
                            <input
                              id="firstname"
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="w-full p-2 rounded border border-gray-300 pt-6 pb-2 bg-white text-gray-800"
                              required
                            />
                            <label 
                              htmlFor="firstname" 
                              className={`absolute left-2 ${firstName ? 'text-xs top-1' : 'text-sm top-1/2 -translate-y-1/2'} transition-all text-gray-500`}
                            >
                              First name*
                            </label>
                          </div>
                        </div>
                        <div className="w-1/2 form-field">
                          <div className="relative">
                            <input
                              id="lastname"
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="w-full p-2 rounded border border-gray-300 pt-6 pb-2 bg-white text-gray-800"
                              required
                            />
                            <label 
                              htmlFor="lastname" 
                              className={`absolute left-2 ${lastName ? 'text-xs top-1' : 'text-sm top-1/2 -translate-y-1/2'} transition-all text-gray-500`}
                            >
                              Last name*
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      {/* Password and Confirm Password fields */}
                      <div className="flex gap-4">
                        <div className="w-1/2 form-field">
                          <div className="relative">
                            <input
                              id="signup-password"
                              type={showSignupPassword ? "text" : "password"}
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              className="w-full p-2 rounded border border-gray-300 pt-6 pb-2 bg-white text-gray-800"
                              required
                            />
                            <label 
                              htmlFor="signup-password" 
                              className={`absolute left-2 ${signupPassword ? 'text-xs top-1' : 'text-sm top-1/2 -translate-y-1/2'} transition-all text-gray-500`}
                            >
                              Password*
                            </label>
                            <button
                              type="button"
                              onClick={() => setShowSignupPassword(!showSignupPassword)}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                            >
                              {showSignupPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                        <div className="w-1/2 form-field">
                          <div className="relative">
                            <input
                              id="confirmPassword"
                              type={showSignupPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="w-full p-2 rounded border border-gray-300 pt-6 pb-2 bg-white text-gray-800"
                              required
                            />
                            <label 
                              htmlFor="confirmPassword" 
                              className={`absolute left-2 ${confirmPassword ? 'text-xs top-1' : 'text-sm top-1/2 -translate-y-1/2'} transition-all text-gray-500`}
                            >
                              Re-type password*
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      {/* Industry field */}
                      <div className="form-field">
                        <div className="relative">
                          <select
                            id="industry"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="w-full p-2 rounded border border-gray-300 pt-6 pb-2 bg-white text-gray-800 appearance-none"
                            required
                          >
                            <option value="Technology">Technology</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Finance">Finance</option>
                            <option value="Education">Education</option>
                            <option value="Retail">Retail</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Other">Other</option>
                          </select>
                          <label 
                            htmlFor="industry" 
                            className="absolute left-2 text-xs top-1 transition-all text-gray-500"
                          >
                            Industry*
                          </label>
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">▼</span>
                        </div>
                      </div>
                      
                      {/* Role selection field */}
                      <div className="form-field">
                        <div className="relative">
                          <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value as "recruiter" | "manager" | "admin")}
                            className="w-full p-2 rounded border border-gray-300 pt-6 pb-2 bg-white text-gray-800 appearance-none"
                            required
                          >
                            <option value="recruiter">Recruiter</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                          </select>
                          <label 
                            htmlFor="role" 
                            className="absolute left-2 text-xs top-1 transition-all text-gray-500"
                          >
                            Role*
                          </label>
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">▼</span>
                        </div>
                      </div>
                      
                      {/* Role ID field */}
                      <div className="form-field">
                        <div className="relative">
                          <input
                            id="roleId"
                            type="text"
                            value={recruiterId}
                            onChange={(e) => setRecruiterId(e.target.value)}
                            className="w-full p-2 rounded border border-gray-300 pt-6 pb-2 bg-white text-gray-800"
                          />
                          <label 
                            htmlFor="roleId" 
                            className={`absolute left-2 ${recruiterId ? 'text-xs top-1' : 'text-sm top-1/2 -translate-y-1/2'} transition-all text-gray-500`}
                          >
                            Role ID (Optional)
                          </label>
                        </div>
                      </div>
                      
                      {/* Password requirements text */}
                      <p className="text-xs text-gray-500 mt-1 ml-1">
                        8+ characters, including 3 of the following: an uppercase letter, a lowercase letter, a number, and a special character.
                      </p>
                      
                      {/* Terms and conditions checkbox */}
                      <div className="pt-2">
                        <div className="flex items-center">
                          <div className="checkbox">
                            <label htmlFor="terms" className="flex items-start">
                              <input 
                                type="checkbox" 
                                id="terms" 
                                className="mt-1 mr-2"
                                checked={acceptedTerms}
                                onChange={() => setAcceptedTerms(!acceptedTerms)}
                                required
                              />
                              <span className="text-sm text-gray-600">
                                I have read and accept the <a href="#" className="text-blue-600">terms of use</a>.
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={localLoading}
                        className="w-full py-3 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                      >
                        {localLoading ? (
                          <span className="flex items-center justify-center">
                            <Loader2 size={16} className="animate-spin mr-2" />
                            Registering...
                          </span>
                        ) : (
                          "Register Company"
                        )}
                      </button>
                    </form>
                    
                    {/* Or divider */}
                    <div className="mt-8 text-center">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-6 py-1 bg-white text-gray-500 uppercase text-center font-medium">OR</span>
                        </div>
                      </div>
                      
                      {/* Google register button */}
                      <div className="mt-6">
                        <button
                          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={handleGoogleLogin}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                            <path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z" fill="#FF3D00"/>
                            <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z" fill="#4CAF50"/>
                            <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
                          </svg>
                          <span>Continue with Google</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Already a member link */}
                    <div className="mt-8 border-t border-gray-300 pt-4 pb-4 text-center">
                      <p className="text-sm text-gray-600">
                        Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsLoginActive(true); }} className="text-blue-600 hover:underline">Log in</a>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Features column */}
            <div className="w-full lg:w-1/2 p-6 bg-black text-white hidden lg:block">
              <div className="sticky top-24">
                <h2 className="text-2xl mb-6 text-white">AI-Powered Recruitment Dashboard</h2>
                <p className="text-gray-300 mb-6">Streamline your hiring process with advanced AI tools</p>
                <div className="mb-8">
                  <div className="flex items-start mb-6">
                    <div className="bg-gray-800 rounded-full p-3 mr-4">
                      <Briefcase className="text-gray-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1 text-white">Jobs Management</h3>
                      <p className="text-sm text-gray-300">Create, track and manage all job openings in one centralized place</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <div className="bg-gray-800 rounded-full p-3 mr-4">
                      <Users className="text-gray-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1 text-white">Candidate Tracking</h3>
                      <p className="text-sm text-gray-300">Follow candidates through each stage of your hiring pipeline</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <div className="bg-gray-800 rounded-full p-3 mr-4">
                      <BarChart className="text-gray-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1 text-white">Recruitment Analytics</h3>
                      <p className="text-sm text-gray-300">Gain insights from your recruitment data with powerful analytics</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <div className="bg-gray-800 rounded-full p-3 mr-4">
                      <MessageSquare className="text-gray-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1 text-white">AI Assistant</h3>
                      <p className="text-sm text-gray-300">Interact with our AI voice assistant to get information and insights</p>
                    </div>
                  </div>
                  
                  {/* Privacy statement */}
                  <div className="bg-gray-800 p-4 rounded text-sm text-gray-300 mt-6">
                    <p>
                      Please read our <a href="#" className="text-blue-300 hover:underline">privacy statement</a> to understand how we handle your data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
