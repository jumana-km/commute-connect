
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, ArrowRight } from 'lucide-react';
import AuthForms from '@/components/AuthForms';

const Index = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [animateContent, setAnimateContent] = useState(false);
  
  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
    
    setTimeout(() => {
      setAnimateContent(true);
    }, 100);
  }, [navigate]);
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-commute-darknavy to-commute-navy overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-commute-blue/10 via-transparent to-transparent"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-commute-darknavy via-commute-blue to-commute-darknavy"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-commute-lightblue/10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
        <header className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-2">
            <Bus className="h-8 w-8 text-commute-blue animate-float" />
            <span className="text-xl font-bold text-commute-offwhite">CommuteConnect</span>
          </div>
          <div className="space-x-4">
            <button
              className={`btn-secondary ${!isLogin ? 'bg-commute-blue hover:bg-commute-blue/90 text-commute-offwhite border-commute-blue' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              <span>Sign in</span>
            </button>
            <button
              className={`btn-secondary ${isLogin ? 'bg-commute-blue hover:bg-commute-blue/90 text-commute-offwhite border-commute-blue' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              <span>Sign up</span>
            </button>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          <div className={`flex flex-col justify-center ${animateContent ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl sm:text-5xl font-bold text-commute-offwhite leading-tight">
              Smart commuting solutions for modern professionals
            </h1>
            <p className="mt-6 text-xl text-commute-lightblue max-w-2xl">
              Optimize your daily commute, reduce travel costs, and earn rewards while making sustainable transportation choices.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1">
                  <div className="h-5 w-5 rounded-full bg-commute-blue flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-commute-offwhite" />
                  </div>
                </div>
                <p className="ml-3 text-commute-offwhite">Track and optimize your daily commute patterns</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1">
                  <div className="h-5 w-5 rounded-full bg-commute-blue flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-commute-offwhite" />
                  </div>
                </div>
                <p className="ml-3 text-commute-offwhite">Earn rewards for using public transportation or carpooling</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1">
                  <div className="h-5 w-5 rounded-full bg-commute-blue flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-commute-offwhite" />
                  </div>
                </div>
                <p className="ml-3 text-commute-offwhite">Connect with exclusive partner discounts on travel services</p>
              </div>
            </div>
          </div>
          
          <div className={`flex items-center justify-center ${animateContent ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="card w-full">
              <AuthForms isLogin={isLogin} onToggleForm={() => setIsLogin(!isLogin)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
