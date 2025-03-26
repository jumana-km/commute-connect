
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/lib/toast';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface AuthFormProps {
  isLogin: boolean;
  onToggleForm: () => void;
}

const AuthForms: React.FC<AuthFormProps> = ({ isLogin, onToggleForm }) => {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Login form fields
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  
  // Register form fields
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateRegisterForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!registerData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!registerData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!registerData.password) {
      newErrors.password = 'Password is required';
    } else if (registerData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      // For demo purposes, any login is successful
      toast.success('Login successful!');
      localStorage.setItem('user', JSON.stringify({ email: loginData.email }));
      navigate('/dashboard');
      setLoading(false);
    }, 1000);
  };
  
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) return;
    
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      // For demo purposes, any registration is successful
      toast.success('Registration successful! Please log in');
      onToggleForm();
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      {isLogin ? (
        <form onSubmit={handleLoginSubmit} className="space-y-5 animate-scale-in">
          <h2 className="text-2xl font-bold text-center text-commute-offwhite mb-6">
            Sign in to CommuteConnect
          </h2>
          
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-commute-offwhite">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-commute-lightblue" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={loginData.email}
                onChange={handleLoginChange}
                className={`input-field pl-10 w-full ${errors.email ? 'border-red-500' : ''}`}
                placeholder="your@email.com"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-commute-offwhite">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-commute-lightblue" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={loginData.password}
                onChange={handleLoginChange}
                className={`input-field pl-10 pr-10 w-full ${errors.password ? 'border-red-500' : ''}`}
                placeholder="••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-commute-lightblue" />
                ) : (
                  <Eye className="h-5 w-5 text-commute-lightblue" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-commute-lightblue/30 bg-commute-navy/70 focus:ring-commute-blue focus:ring-offset-commute-navy"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-commute-offwhite">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="text-commute-blue hover:text-commute-lightblue transition-all-200">
                Forgot password?
              </a>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <span>Sign in</span>
            )}
          </button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-commute-lightblue">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onToggleForm}
                className="text-commute-blue hover:text-commute-lightblue transition-all-200 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit} className="space-y-5 animate-scale-in">
          <h2 className="text-2xl font-bold text-center text-commute-offwhite mb-6">
            Create an account
          </h2>
          
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-commute-offwhite">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-commute-lightblue" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                className={`input-field pl-10 w-full ${errors.name ? 'border-red-500' : ''}`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
          
          <div className="space-y-1">
            <label htmlFor="register-email" className="block text-sm font-medium text-commute-offwhite">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-commute-lightblue" />
              </div>
              <input
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                className={`input-field pl-10 w-full ${errors.email ? 'border-red-500' : ''}`}
                placeholder="your@email.com"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div className="space-y-1">
            <label htmlFor="register-password" className="block text-sm font-medium text-commute-offwhite">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-commute-lightblue" />
              </div>
              <input
                id="register-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={registerData.password}
                onChange={handleRegisterChange}
                className={`input-field pl-10 pr-10 w-full ${errors.password ? 'border-red-500' : ''}`}
                placeholder="••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-commute-lightblue" />
                ) : (
                  <Eye className="h-5 w-5 text-commute-lightblue" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>
          
          <div className="space-y-1">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-commute-offwhite">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-commute-lightblue" />
              </div>
              <input
                id="confirm-password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                className={`input-field pl-10 pr-10 w-full ${errors.confirmPassword ? 'border-red-500' : ''}`}
                placeholder="••••••"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
          
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-commute-lightblue/30 bg-commute-navy/70 focus:ring-commute-blue focus:ring-offset-commute-navy"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-commute-offwhite">
              I agree to the{' '}
              <a href="#" className="text-commute-blue hover:text-commute-lightblue transition-all-200">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-commute-blue hover:text-commute-lightblue transition-all-200">
                Privacy Policy
              </a>
            </label>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span>Creating account...</span>
            ) : (
              <span>Create account</span>
            )}
          </button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-commute-lightblue">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onToggleForm}
                className="text-commute-blue hover:text-commute-lightblue transition-all-200 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthForms;
