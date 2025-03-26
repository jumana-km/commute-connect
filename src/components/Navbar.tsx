
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bus } from 'lucide-react';

// This navbar will be used after login
const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  
  const navigation = [
    { name: 'Home', href: '/dashboard' },
    { name: 'Dashboard', href: '/dashboard/stats' },
    { name: 'Rewards', href: '/dashboard/rewards' },
    { name: 'Partners', href: '/dashboard/partners' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-commute-navy/80 backdrop-blur-lg border-b border-commute-lightblue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Bus className="h-8 w-8 text-commute-blue animate-float" />
              <span className="text-xl font-bold text-commute-offwhite">CommuteConnect</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all-200 ${
                    isActive(item.href)
                      ? 'border-commute-blue text-commute-offwhite'
                      : 'border-transparent text-commute-lightblue hover:border-commute-lightblue/50 hover:text-commute-offwhite'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <Link to="/" className="btn-secondary">
              <span>Logout</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-commute-lightblue hover:text-commute-offwhite hover:bg-commute-blue/20 transition-all-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isOpen ? 'block animate-fade-in' : 'hidden animate-fade-out'
        }`}
      >
        <div className="pt-2 pb-3 space-y-1 bg-commute-navy/90 backdrop-blur-lg">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all-200 ${
                isActive(item.href)
                  ? 'border-commute-blue text-commute-offwhite bg-commute-blue/10'
                  : 'border-transparent text-commute-lightblue hover:border-commute-lightblue/50 hover:text-commute-offwhite hover:bg-commute-lightblue/10'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-commute-lightblue hover:text-commute-offwhite hover:bg-commute-lightblue/10 transition-all-200"
            onClick={() => setIsOpen(false)}
          >
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
