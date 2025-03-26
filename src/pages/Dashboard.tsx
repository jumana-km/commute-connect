
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Bus, ChevronRight, Award, Users, Home, BarChart3, Plus } from 'lucide-react';

const DashboardHome = () => {
  return (
    <div className="space-y-8">
      <div className="glass-panel rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-2xl font-bold text-commute-offwhite mb-4">Good morning, User!</h2>
        <p className="text-commute-lightblue">
          Welcome to your commute dashboard. Track your trips, manage your rewards, and discover partner offers.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/dashboard/stats" className="glass-panel rounded-xl p-6 hover:bg-commute-navy/80 transition-all-200 group animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-between items-start">
            <div className="bg-commute-blue/20 rounded-lg p-3">
              <BarChart3 className="h-6 w-6 text-commute-blue" />
            </div>
            <ChevronRight className="h-5 w-5 text-commute-lightblue/50 group-hover:text-commute-blue transition-all-200" />
          </div>
          <h3 className="text-lg font-semibold text-commute-offwhite mt-4">Commute Stats</h3>
          <p className="text-commute-lightblue mt-2">View detailed statistics about your commuting patterns.</p>
        </Link>
        
        <Link to="/dashboard/rewards" className="glass-panel rounded-xl p-6 hover:bg-commute-navy/80 transition-all-200 group animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex justify-between items-start">
            <div className="bg-commute-blue/20 rounded-lg p-3">
              <Award className="h-6 w-6 text-commute-blue" />
            </div>
            <ChevronRight className="h-5 w-5 text-commute-lightblue/50 group-hover:text-commute-blue transition-all-200" />
          </div>
          <h3 className="text-lg font-semibold text-commute-offwhite mt-4">Rewards</h3>
          <p className="text-commute-lightblue mt-2">You have 125 points to redeem for rewards and discounts.</p>
        </Link>
        
        <Link to="/dashboard/partners" className="glass-panel rounded-xl p-6 hover:bg-commute-navy/80 transition-all-200 group animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex justify-between items-start">
            <div className="bg-commute-blue/20 rounded-lg p-3">
              <Users className="h-6 w-6 text-commute-blue" />
            </div>
            <ChevronRight className="h-5 w-5 text-commute-lightblue/50 group-hover:text-commute-blue transition-all-200" />
          </div>
          <h3 className="text-lg font-semibold text-commute-offwhite mt-4">Partners</h3>
          <p className="text-commute-lightblue mt-2">Explore exclusive deals from our transportation partners.</p>
        </Link>
      </div>
      
      <div className="glass-panel rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-commute-offwhite">Recent Trips</h3>
          <button className="btn-secondary py-1.5 px-3">
            <Plus className="h-4 w-4 mr-1" />
            <span>Add Trip</span>
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-commute-lightblue/10 pb-3">
            <div className="flex items-center">
              <div className="bg-commute-blue/20 rounded-lg p-2 mr-3">
                <Bus className="h-5 w-5 text-commute-blue" />
              </div>
              <div>
                <p className="text-commute-offwhite font-medium">Home to Office</p>
                <p className="text-commute-lightblue text-sm">Bus - 35 minutes</p>
              </div>
            </div>
            <p className="text-commute-lightblue text-sm">Today</p>
          </div>
          <div className="flex items-center justify-between border-b border-commute-lightblue/10 pb-3">
            <div className="flex items-center">
              <div className="bg-commute-blue/20 rounded-lg p-2 mr-3">
                <Bus className="h-5 w-5 text-commute-blue" />
              </div>
              <div>
                <p className="text-commute-offwhite font-medium">Office to Home</p>
                <p className="text-commute-lightblue text-sm">Bus - 42 minutes</p>
              </div>
            </div>
            <p className="text-commute-lightblue text-sm">Yesterday</p>
          </div>
          <div className="flex items-center justify-between border-b border-commute-lightblue/10 pb-3">
            <div className="flex items-center">
              <div className="bg-commute-blue/20 rounded-lg p-2 mr-3">
                <Bus className="h-5 w-5 text-commute-blue" />
              </div>
              <div>
                <p className="text-commute-offwhite font-medium">Home to Coffee Shop</p>
                <p className="text-commute-lightblue text-sm">Bus - 15 minutes</p>
              </div>
            </div>
            <p className="text-commute-lightblue text-sm">2 days ago</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button className="text-commute-blue hover:text-commute-lightblue transition-all-200 text-sm font-medium">
            View all trips
          </button>
        </div>
      </div>
    </div>
  );
};

const DashboardStats = () => (
  <div className="glass-panel rounded-xl p-6 animate-fade-in">
    <h2 className="text-2xl font-bold text-commute-offwhite mb-4">Commute Statistics</h2>
    <p className="text-commute-lightblue mb-6">
      View detailed statistics about your commuting patterns over time.
    </p>
    
    <div className="space-y-6">
      <div className="glass-panel bg-commute-navy/40 rounded-lg p-4">
        <h3 className="text-lg font-medium text-commute-offwhite mb-2">Weekly Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-commute-navy/60 rounded-lg p-4">
            <p className="text-commute-lightblue text-sm">Total Time</p>
            <p className="text-commute-offwhite text-2xl font-bold">5h 42m</p>
          </div>
          <div className="bg-commute-navy/60 rounded-lg p-4">
            <p className="text-commute-lightblue text-sm">Total Distance</p>
            <p className="text-commute-offwhite text-2xl font-bold">47.3 km</p>
          </div>
          <div className="bg-commute-navy/60 rounded-lg p-4">
            <p className="text-commute-lightblue text-sm">CO₂ Saved</p>
            <p className="text-commute-offwhite text-2xl font-bold">8.2 kg</p>
          </div>
        </div>
      </div>
      
      <div className="glass-panel bg-commute-navy/40 rounded-lg p-4">
        <h3 className="text-lg font-medium text-commute-offwhite mb-4">Monthly Trends</h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-commute-lightblue">Chart data will be displayed here</p>
        </div>
      </div>
    </div>
  </div>
);

const DashboardRewards = () => (
  <div className="glass-panel rounded-xl p-6 animate-fade-in">
    <h2 className="text-2xl font-bold text-commute-offwhite mb-4">Your Rewards</h2>
    <p className="text-commute-lightblue mb-6">
      Earn points for sustainable commuting choices and redeem them for rewards.
    </p>
    
    <div className="glass-panel bg-commute-navy/40 rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-commute-lightblue text-sm">Available Points</p>
          <p className="text-commute-offwhite text-3xl font-bold">125</p>
        </div>
        <button className="btn-primary">Redeem Points</button>
      </div>
    </div>
    
    <h3 className="text-xl font-semibold text-commute-offwhite mb-4">Available Rewards</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="glass-panel bg-commute-navy/40 rounded-lg p-4 hover:bg-commute-navy/60 transition-all-200 cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-lg font-medium text-commute-offwhite">$5 Coffee Voucher</h4>
          <div className="bg-commute-blue/20 rounded-full px-2 py-1">
            <p className="text-commute-blue text-xs font-semibold">50 pts</p>
          </div>
        </div>
        <p className="text-commute-lightblue text-sm">Redeem for a $5 voucher at participating coffee shops.</p>
      </div>
      
      <div className="glass-panel bg-commute-navy/40 rounded-lg p-4 hover:bg-commute-navy/60 transition-all-200 cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-lg font-medium text-commute-offwhite">Free Bus Ride</h4>
          <div className="bg-commute-blue/20 rounded-full px-2 py-1">
            <p className="text-commute-blue text-xs font-semibold">75 pts</p>
          </div>
        </div>
        <p className="text-commute-lightblue text-sm">Redeem for a free one-way bus ride on your next commute.</p>
      </div>
      
      <div className="glass-panel bg-commute-navy/40 rounded-lg p-4 hover:bg-commute-navy/60 transition-all-200 cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-lg font-medium text-commute-offwhite">$10 Rideshare Credit</h4>
          <div className="bg-commute-blue/20 rounded-full px-2 py-1">
            <p className="text-commute-blue text-xs font-semibold">100 pts</p>
          </div>
        </div>
        <p className="text-commute-lightblue text-sm">Redeem for a $10 credit on your next rideshare trip.</p>
      </div>
      
      <div className="glass-panel bg-commute-navy/40 rounded-lg p-4 hover:bg-commute-navy/60 transition-all-200 cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-lg font-medium text-commute-offwhite">Monthly Transit Pass</h4>
          <div className="bg-commute-blue/20 rounded-full px-2 py-1">
            <p className="text-commute-blue text-xs font-semibold">500 pts</p>
          </div>
        </div>
        <p className="text-commute-lightblue text-sm">Redeem for a 10% discount on your next monthly transit pass.</p>
      </div>
    </div>
  </div>
);

const DashboardPartners = () => (
  <div className="glass-panel rounded-xl p-6 animate-fade-in">
    <h2 className="text-2xl font-bold text-commute-offwhite mb-4">Our Partners</h2>
    <p className="text-commute-lightblue mb-6">
      Explore exclusive deals and discounts from our transportation partners.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="glass-panel bg-commute-navy/40 rounded-lg overflow-hidden">
        <div className="h-40 bg-commute-blue/20 flex items-center justify-center">
          <p className="text-commute-blue font-semibold">Partner Logo</p>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-commute-offwhite">Metro Transit</h3>
          <p className="text-commute-lightblue text-sm mt-1 mb-3">15% off monthly passes for CommuteConnect members.</p>
          <button className="btn-secondary w-full py-1.5">View Offers</button>
        </div>
      </div>
      
      <div className="glass-panel bg-commute-navy/40 rounded-lg overflow-hidden">
        <div className="h-40 bg-commute-blue/20 flex items-center justify-center">
          <p className="text-commute-blue font-semibold">Partner Logo</p>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-commute-offwhite">RideShare Co.</h3>
          <p className="text-commute-lightblue text-sm mt-1 mb-3">$5 off your first 3 rides when you connect your account.</p>
          <button className="btn-secondary w-full py-1.5">View Offers</button>
        </div>
      </div>
      
      <div className="glass-panel bg-commute-navy/40 rounded-lg overflow-hidden">
        <div className="h-40 bg-commute-blue/20 flex items-center justify-center">
          <p className="text-commute-blue font-semibold">Partner Logo</p>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-commute-offwhite">City Bikes</h3>
          <p className="text-commute-lightblue text-sm mt-1 mb-3">Free monthly membership for active CommuteConnect users.</p>
          <button className="btn-secondary w-full py-1.5">View Offers</button>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const location = useLocation();
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<DashboardHome />);
  
  useEffect(() => {
    // Set the active component based on the current route
    const path = location.pathname;
    if (path === '/dashboard/stats') {
      setActiveComponent(<DashboardStats />);
    } else if (path === '/dashboard/rewards') {
      setActiveComponent(<DashboardRewards />);
    } else if (path === '/dashboard/partners') {
      setActiveComponent(<DashboardPartners />);
    } else {
      setActiveComponent(<DashboardHome />);
    }
  }, [location]);
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-commute-darknavy to-commute-navy overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-commute-blue/10 via-transparent to-transparent"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-commute-darknavy via-commute-blue to-commute-darknavy"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-commute-lightblue/10"></div>
      
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-wrap items-center space-x-1 mb-6">
          <Link to="/dashboard" className="text-commute-blue hover:text-commute-lightblue transition-all-200">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-3 w-3 text-commute-lightblue/60" />
          <span className="text-commute-offwhite font-medium">Dashboard</span>
          {location.pathname !== '/dashboard' && (
            <>
              <ChevronRight className="h-3 w-3 text-commute-lightblue/60" />
              <span className="text-commute-lightblue">
                {location.pathname.includes('/stats') && 'Statistics'}
                {location.pathname.includes('/rewards') && 'Rewards'}
                {location.pathname.includes('/partners') && 'Partners'}
              </span>
            </>
          )}
        </div>
        
        {/* Dynamic content based on route */}
        {activeComponent}
      </div>
    </div>
  );
};

export default Dashboard;
