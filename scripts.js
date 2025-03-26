
// DOM Elements
const app = document.getElementById('app');
const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
document.body.appendChild(toastContainer);

// App State
const state = {
  currentRoute: window.location.hash.substring(1) || '/',
  isLoggedIn: false,
  user: null,
  isMobileMenuOpen: false
};

// Toast Notifications
const toast = {
  create: function(type, title, message, duration = 3000) {
    const toastElement = document.createElement('div');
    toastElement.className = `toast ${type}`;
    
    toastElement.innerHTML = `
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <div class="toast-close">
        <i class="bi bi-x"></i>
      </div>
    `;
    
    const closeButton = toastElement.querySelector('.toast-close');
    closeButton.addEventListener('click', () => {
      toastElement.remove();
    });
    
    toastContainer.appendChild(toastElement);
    
    setTimeout(() => {
      toastElement.remove();
    }, duration);
  },
  success: function(message, title = 'Success') {
    this.create('success', title, message);
  },
  error: function(message, title = 'Error') {
    this.create('error', title, message);
  },
  info: function(message, title = 'Info') {
    this.create('info', title, message);
  }
};

// Router
const router = {
  routes: {
    '/': renderHomePage,
    '/dashboard': renderDashboard,
    '/dashboard/stats': renderDashboardStats,
    '/dashboard/rewards': renderDashboardRewards,
    '/dashboard/partners': renderDashboardPartners,
    '/not-found': renderNotFoundPage
  },
  
  navigate: function(route) {
    window.location.hash = route;
  },
  
  handleRouteChange: function() {
    const path = window.location.hash.substring(1) || '/';
    state.currentRoute = path;
    
    // Check if user is logged in for protected routes
    if (path.startsWith('/dashboard') && !state.isLoggedIn) {
      toast.error('You must be logged in to access this page');
      router.navigate('/');
      return;
    }
    
    // Render the appropriate view
    const renderFunction = this.routes[path] || this.routes['/not-found'];
    renderFunction();
  }
};

// Check Authentication
function checkAuth() {
  const userData = localStorage.getItem('user');
  if (userData) {
    state.isLoggedIn = true;
    state.user = JSON.parse(userData);
  }
}

// Validation Functions
function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

// Handle Login
function handleLogin(event) {
  event.preventDefault();
  
  // Get form values
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  // Validate form
  let isValid = true;
  const emailError = document.getElementById('login-email-error');
  const passwordError = document.getElementById('login-password-error');
  
  // Reset errors
  emailError.textContent = '';
  passwordError.textContent = '';
  
  if (!email) {
    emailError.textContent = 'Email is required';
    isValid = false;
  } else if (!validateEmail(email)) {
    emailError.textContent = 'Email is invalid';
    isValid = false;
  }
  
  if (!password) {
    passwordError.textContent = 'Password is required';
    isValid = false;
  }
  
  if (!isValid) {
    return;
  }
  
  // Simulate login (for demo purposes)
  setTimeout(() => {
    // For demo, any login is successful
    toast.success('Login successful!');
    localStorage.setItem('user', JSON.stringify({ email }));
    state.isLoggedIn = true;
    state.user = { email };
    router.navigate('/dashboard');
  }, 1000);
}

// Handle Registration
function handleRegister(event) {
  event.preventDefault();
  
  // Get form values
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;
  
  // Validate form
  let isValid = true;
  const nameError = document.getElementById('register-name-error');
  const emailError = document.getElementById('register-email-error');
  const passwordError = document.getElementById('register-password-error');
  const confirmPasswordError = document.getElementById('register-confirm-password-error');
  
  // Reset errors
  nameError.textContent = '';
  emailError.textContent = '';
  passwordError.textContent = '';
  confirmPasswordError.textContent = '';
  
  if (!name) {
    nameError.textContent = 'Name is required';
    isValid = false;
  }
  
  if (!email) {
    emailError.textContent = 'Email is required';
    isValid = false;
  } else if (!validateEmail(email)) {
    emailError.textContent = 'Email is invalid';
    isValid = false;
  }
  
  if (!password) {
    passwordError.textContent = 'Password is required';
    isValid = false;
  } else if (password.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters';
    isValid = false;
  }
  
  if (!confirmPassword) {
    confirmPasswordError.textContent = 'Please confirm your password';
    isValid = false;
  } else if (password !== confirmPassword) {
    confirmPasswordError.textContent = 'Passwords do not match';
    isValid = false;
  }
  
  if (!isValid) {
    return;
  }
  
  // Simulate registration (for demo purposes)
  setTimeout(() => {
    // For demo, any registration is successful
    toast.success('Registration successful! Please log in');
    
    // Go back to login
    state.currentRoute = '/';
    renderHomePage();
    
    // Pre-fill the login form with the registered email
    setTimeout(() => {
      const loginEmailInput = document.getElementById('login-email');
      if (loginEmailInput) {
        loginEmailInput.value = email;
      }
    }, 100);
  }, 1000);
}

// Toggle Password Visibility
function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('bi-eye');
    icon.classList.add('bi-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('bi-eye-slash');
    icon.classList.add('bi-eye');
  }
}

// Handle Logout
function handleLogout() {
  localStorage.removeItem('user');
  state.isLoggedIn = false;
  state.user = null;
  toast.success('Logged out successfully');
  router.navigate('/');
}

// Toggle Mobile Menu
function toggleMobileMenu() {
  state.isMobileMenuOpen = !state.isMobileMenuOpen;
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (state.isMobileMenuOpen) {
    mobileMenu.classList.add('active');
  } else {
    mobileMenu.classList.remove('active');
  }
}

// Render Functions
function renderHomePage() {
  if (state.isLoggedIn) {
    router.navigate('/dashboard');
    return;
  }
  
  // Default to login form
  const isLoginForm = state.currentRoute === '/';
  
  app.innerHTML = `
    <div class="min-h-screen w-full">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-commute-blue/10 via-transparent to-transparent"></div>
      
      <!-- Decorative elements -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-commute-darknavy via-commute-blue to-commute-darknavy"></div>
      <div class="absolute bottom-0 left-0 w-full h-px bg-commute-lightblue/10"></div>
      
      <div class="container">
        <header>
          <div class="header-content">
            <div class="logo">
              <i class="bi bi-bus-front animate-float"></i>
              <span>CommuteConnect</span>
            </div>
            <div class="auth-buttons">
              <button 
                class="btn-secondary ${isLoginForm ? 'btn-active' : ''}" 
                onclick="state.currentRoute = '/'; renderHomePage();"
              >
                <span>Sign in</span>
              </button>
              <button 
                class="btn-secondary ${!isLoginForm ? 'btn-active' : ''}" 
                onclick="state.currentRoute = '/register'; renderHomePage();"
              >
                <span>Sign up</span>
              </button>
            </div>
          </div>
        </header>
        
        <div class="landing-grid">
          <div class="landing-text animate-fade-in">
            <h1>Smart commuting solutions for modern professionals</h1>
            <p>
              Optimize your daily commute, reduce travel costs, and earn rewards while making sustainable transportation choices.
            </p>
            <div class="feature-list">
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="bi bi-arrow-right"></i>
                </div>
                <p>Track and optimize your daily commute patterns</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="bi bi-arrow-right"></i>
                </div>
                <p>Earn rewards for using public transportation or carpooling</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="bi bi-arrow-right"></i>
                </div>
                <p>Connect with exclusive partner discounts on travel services</p>
              </div>
            </div>
          </div>
          
          <div class="animate-fade-in">
            <div class="card auth-form-container">
              ${isLoginForm ? renderLoginForm() : renderRegisterForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add event listeners
  if (isLoginForm) {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', handleLogin);
    }
    
    const togglePasswordBtn = document.getElementById('toggle-login-password');
    if (togglePasswordBtn) {
      togglePasswordBtn.addEventListener('click', () => {
        togglePasswordVisibility('login-password', 'login-password-icon');
      });
    }
  } else {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', handleRegister);
    }
    
    const togglePasswordBtn = document.getElementById('toggle-register-password');
    if (togglePasswordBtn) {
      togglePasswordBtn.addEventListener('click', () => {
        togglePasswordVisibility('register-password', 'register-password-icon');
      });
    }
    
    const toggleConfirmPasswordBtn = document.getElementById('toggle-confirm-password');
    if (toggleConfirmPasswordBtn) {
      toggleConfirmPasswordBtn.addEventListener('click', () => {
        togglePasswordVisibility('register-confirm-password', 'confirm-password-icon');
      });
    }
  }
}

function renderLoginForm() {
  return `
    <form id="login-form" class="auth-form animate-scale-in">
      <h2>Sign in to CommuteConnect</h2>
      
      <div class="form-group">
        <label for="login-email">Email</label>
        <div class="input-wrapper">
          <i class="bi bi-envelope input-icon"></i>
          <input
            id="login-email"
            type="email"
            class="input-field input-field-with-icon"
            placeholder="your@email.com"
          />
        </div>
        <p id="login-email-error" class="form-error"></p>
      </div>
      
      <div class="form-group">
        <label for="login-password">Password</label>
        <div class="input-wrapper">
          <i class="bi bi-lock input-icon"></i>
          <input
            id="login-password"
            type="password"
            class="input-field input-field-with-icon"
            placeholder="••••••"
          />
          <button type="button" id="toggle-login-password" class="toggle-password">
            <i id="login-password-icon" class="bi bi-eye"></i>
          </button>
        </div>
        <p id="login-password-error" class="form-error"></p>
      </div>
      
      <div class="form-footer">
        <div class="remember-me">
          <input
            id="remember-me"
            type="checkbox"
          />
          <label for="remember-me">Remember me</label>
        </div>
        
        <a href="#" class="forgot-password">Forgot password?</a>
      </div>
      
      <button type="submit" class="btn-primary">
        <span>Sign in</span>
      </button>
      
      <div class="auth-links">
        <p>
          Don't have an account?
          <button type="button" onclick="state.currentRoute = '/register'; renderHomePage();">
            Sign up
          </button>
        </p>
      </div>
    </form>
  `;
}

function renderRegisterForm() {
  return `
    <form id="register-form" class="auth-form animate-scale-in">
      <h2>Create an account</h2>
      
      <div class="form-group">
        <label for="register-name">Full Name</label>
        <div class="input-wrapper">
          <i class="bi bi-person input-icon"></i>
          <input
            id="register-name"
            type="text"
            class="input-field input-field-with-icon"
            placeholder="John Doe"
          />
        </div>
        <p id="register-name-error" class="form-error"></p>
      </div>
      
      <div class="form-group">
        <label for="register-email">Email</label>
        <div class="input-wrapper">
          <i class="bi bi-envelope input-icon"></i>
          <input
            id="register-email"
            type="email"
            class="input-field input-field-with-icon"
            placeholder="your@email.com"
          />
        </div>
        <p id="register-email-error" class="form-error"></p>
      </div>
      
      <div class="form-group">
        <label for="register-password">Password</label>
        <div class="input-wrapper">
          <i class="bi bi-lock input-icon"></i>
          <input
            id="register-password"
            type="password"
            class="input-field input-field-with-icon"
            placeholder="••••••"
          />
          <button type="button" id="toggle-register-password" class="toggle-password">
            <i id="register-password-icon" class="bi bi-eye"></i>
          </button>
        </div>
        <p id="register-password-error" class="form-error"></p>
      </div>
      
      <div class="form-group">
        <label for="register-confirm-password">Confirm Password</label>
        <div class="input-wrapper">
          <i class="bi bi-lock input-icon"></i>
          <input
            id="register-confirm-password"
            type="password"
            class="input-field input-field-with-icon"
            placeholder="••••••"
          />
          <button type="button" id="toggle-confirm-password" class="toggle-password">
            <i id="confirm-password-icon" class="bi bi-eye"></i>
          </button>
        </div>
        <p id="register-confirm-password-error" class="form-error"></p>
      </div>
      
      <div class="remember-me">
        <input
          id="terms"
          type="checkbox"
        />
        <label for="terms">
          I agree to the
          <a href="#">Terms of Service</a>
          and
          <a href="#">Privacy Policy</a>
        </label>
      </div>
      
      <button type="submit" class="btn-primary">
        <span>Create account</span>
      </button>
      
      <div class="auth-links">
        <p>
          Already have an account?
          <button type="button" onclick="state.currentRoute = '/'; renderHomePage();">
            Sign in
          </button>
        </p>
      </div>
    </form>
  `;
}

function renderNavbar() {
  const routes = [
    { name: 'Home', href: '/dashboard', path: '/dashboard' },
    { name: 'Dashboard', href: '/dashboard/stats', path: '/dashboard/stats' },
    { name: 'Rewards', href: '/dashboard/rewards', path: '/dashboard/rewards' },
    { name: 'Partners', href: '/dashboard/partners', path: '/dashboard/partners' },
  ];
  
  return `
    <div class="navbar">
      <div class="navbar-container">
        <div class="navbar-content">
          <div class="navbar-logo">
            <i class="bi bi-bus-front animate-float"></i>
            <span class="text-xl font-bold text-commute-offwhite">CommuteConnect</span>
          </div>
          
          <nav class="navbar-nav">
            ${routes.map(route => `
              <a 
                href="#${route.href}" 
                class="nav-link ${state.currentRoute === route.path ? 'active' : ''}"
              >
                ${route.name}
              </a>
            `).join('')}
            <button onclick="handleLogout()" class="btn-secondary">
              <span>Logout</span>
            </button>
          </nav>
          
          <button class="mobile-menu-button" onclick="toggleMobileMenu()">
            <i class="bi ${state.isMobileMenuOpen ? 'bi-x' : 'bi-list'} h-6 w-6"></i>
          </button>
        </div>
      </div>
      
      <div id="mobile-menu" class="mobile-menu">
        <div class="navbar-container">
          ${routes.map(route => `
            <a 
              href="#${route.href}" 
              class="mobile-nav-link ${state.currentRoute === route.path ? 'active' : ''}"
              onclick="state.isMobileMenuOpen = false; document.getElementById('mobile-menu').classList.remove('active');"
            >
              ${route.name}
            </a>
          `).join('')}
          <a 
            href="#" 
            class="mobile-nav-link" 
            onclick="handleLogout(); state.isMobileMenuOpen = false; document.getElementById('mobile-menu').classList.remove('active');"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderBreadcrumb() {
  const currentPath = state.currentRoute;
  let breadcrumbContent = `
    <a href="#/dashboard" class="text-commute-blue hover:text-commute-lightblue transition-all-200">
      <i class="bi bi-house"></i>
    </a>
    <i class="bi bi-chevron-right h-3 w-3 text-commute-lightblue/60"></i>
    <span>Dashboard</span>
  `;
  
  if (currentPath !== '/dashboard') {
    breadcrumbContent += `
      <i class="bi bi-chevron-right h-3 w-3 text-commute-lightblue/60"></i>
      <span class="text-commute-lightblue">
        ${currentPath.includes('/stats') ? 'Statistics' : ''}
        ${currentPath.includes('/rewards') ? 'Rewards' : ''}
        ${currentPath.includes('/partners') ? 'Partners' : ''}
      </span>
    `;
  }
  
  return `<div class="breadcrumb">${breadcrumbContent}</div>`;
}

function renderDashboard() {
  app.innerHTML = `
    <div class="min-h-screen w-full">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-commute-blue/10 via-transparent to-transparent"></div>
      
      <!-- Decorative elements -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-commute-darknavy via-commute-blue to-commute-darknavy"></div>
      <div class="absolute bottom-0 left-0 w-full h-px bg-commute-lightblue/10"></div>
      
      ${renderNavbar()}
      
      <div class="dashboard-container container">
        ${renderBreadcrumb()}
        
        <div class="space-y-8">
          <div class="glass-panel rounded-xl animate-fade-in">
            <h2 class="text-2xl font-bold text-commute-offwhite mb-4">Good morning, User!</h2>
            <p class="text-commute-lightblue">
              Welcome to your commute dashboard. Track your trips, manage your rewards, and discover partner offers.
            </p>
          </div>
          
          <div class="dashboard-grid">
            <a href="#/dashboard/stats" class="glass-panel dashboard-card animate-fade-in">
              <div class="card-header">
                <div class="card-icon">
                  <i class="bi bi-bar-chart"></i>
                </div>
                <i class="bi bi-chevron-right"></i>
              </div>
              <h3 class="card-title">Commute Stats</h3>
              <p class="card-description">View detailed statistics about your commuting patterns.</p>
            </a>
            
            <a href="#/dashboard/rewards" class="glass-panel dashboard-card animate-fade-in">
              <div class="card-header">
                <div class="card-icon">
                  <i class="bi bi-award"></i>
                </div>
                <i class="bi bi-chevron-right"></i>
              </div>
              <h3 class="card-title">Rewards</h3>
              <p class="card-description">You have 125 points to redeem for rewards and discounts.</p>
            </a>
            
            <a href="#/dashboard/partners" class="glass-panel dashboard-card animate-fade-in">
              <div class="card-header">
                <div class="card-icon">
                  <i class="bi bi-people"></i>
                </div>
                <i class="bi bi-chevron-right"></i>
              </div>
              <h3 class="card-title">Partners</h3>
              <p class="card-description">Explore exclusive deals from our transportation partners.</p>
            </a>
          </div>
          
          <div class="glass-panel rounded-xl animate-fade-in">
            <div class="trip-header">
              <h3 class="text-xl font-bold text-commute-offwhite">Recent Trips</h3>
              <button class="btn-secondary">
                <i class="bi bi-plus"></i>
                <span>Add Trip</span>
              </button>
            </div>
            <div class="trip-list">
              <div class="trip-item">
                <div class="trip-info">
                  <div class="trip-icon">
                    <i class="bi bi-bus-front"></i>
                  </div>
                  <div class="trip-details">
                    <h4>Home to Office</h4>
                    <p>Bus - 35 minutes</p>
                  </div>
                </div>
                <p>Today</p>
              </div>
              <div class="trip-item">
                <div class="trip-info">
                  <div class="trip-icon">
                    <i class="bi bi-bus-front"></i>
                  </div>
                  <div class="trip-details">
                    <h4>Office to Home</h4>
                    <p>Bus - 42 minutes</p>
                  </div>
                </div>
                <p>Yesterday</p>
              </div>
              <div class="trip-item">
                <div class="trip-info">
                  <div class="trip-icon">
                    <i class="bi bi-bus-front"></i>
                  </div>
                  <div class="trip-details">
                    <h4>Home to Coffee Shop</h4>
                    <p>Bus - 15 minutes</p>
                  </div>
                </div>
                <p>2 days ago</p>
              </div>
            </div>
            <div class="text-center mt-4">
              <button class="text-commute-blue hover:text-commute-lightblue transition-all-200 text-sm font-medium">
                View all trips
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderDashboardStats() {
  app.innerHTML = `
    <div class="min-h-screen w-full">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-commute-blue/10 via-transparent to-transparent"></div>
      
      <!-- Decorative elements -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-commute-darknavy via-commute-blue to-commute-darknavy"></div>
      <div class="absolute bottom-0 left-0 w-full h-px bg-commute-lightblue/10"></div>
      
      ${renderNavbar()}
      
      <div class="dashboard-container container">
        ${renderBreadcrumb()}
        
        <div class="glass-panel rounded-xl animate-fade-in">
          <h2 class="text-2xl font-bold text-commute-offwhite mb-4">Commute Statistics</h2>
          <p class="text-commute-lightblue mb-6">
            View detailed statistics about your commuting patterns over time.
          </p>
          
          <div class="space-y-6">
            <div class="glass-panel bg-commute-navy/40 rounded-lg p-4">
              <h3 class="text-lg font-medium text-commute-offwhite mb-2">Weekly Summary</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="glass-panel bg-commute-navy/60 rounded-lg p-4">
                  <p class="text-commute-lightblue text-sm">Total Time</p>
                  <p class="text-commute-offwhite text-2xl font-bold">5h 42m</p>
                </div>
                <div class="glass-panel bg-commute-navy/60 rounded-lg p-4">
                  <p class="text-commute-lightblue text-sm">Total Distance</p>
                  <p class="text-commute-offwhite text-2xl font-bold">47.3 km</p>
                </div>
                <div class="glass-panel bg-commute-navy/60 rounded-lg p-4">
                  <p class="text-commute-lightblue text-sm">CO₂ Saved</p>
                  <p class="text-commute-offwhite text-2xl font-bold">8.2 kg</p>
                </div>
              </div>
            </div>
            
            <div class="glass-panel bg-commute-navy/40 rounded-lg p-4">
              <h3 class="text-lg font-medium text-commute-offwhite mb-4">Monthly Trends</h3>
              <div style="height: 16rem; display: flex; align-items: center; justify-content: center;">
                <p class="text-commute-lightblue">Chart data will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderDashboardRewards() {
  app.innerHTML = `
    <div class="min-h-screen w-full">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-commute-blue/10 via-transparent to-transparent"></div>
      
      <!-- Decorative elements -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-commute-darknavy via-commute-blue to-commute-darknavy"></div>
      <div class="absolute bottom-0 left-0 w-full h-px bg-commute-lightblue/10"></div>
      
      ${renderNavbar()}
      
      <div class="dashboard-container container">
        ${renderBreadcrumb()}
        
        <div class="glass-panel rounded-xl animate-fade-in">
          <h2 class="text-2xl font-bold text-commute-offwhite mb-4">Your Rewards</h2>
          <p class="text-commute-lightblue mb-6">
            Earn points for sustainable commuting choices and redeem them for rewards.
          </p>
          
          <div class="glass-panel bg-commute-navy/40 rounded-lg p-6 mb-6">
            <div class="flex justify-between items-center flex-wrap gap-4">
              <div>
                <p class="text-commute-lightblue text-sm">Available Points</p>
                <p class="text-commute-offwhite text-3xl font-bold">125</p>
              </div>
              <button class="btn-primary">Redeem Points</button>
            </div>
          </div>
          
          <h3 class="text-xl font-semibold text-commute-offwhite mb-4">Available Rewards</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="glass-panel bg-commute-navy/40 rounded-lg p-4 hover:bg-commute-navy/60 transition-all-200 cursor-pointer">
              <div class="flex justify-between items-start mb-3">
                <h4 class="text-lg font-medium text-commute-offwhite">$5 Coffee Voucher</h4>
                <div class="bg-commute-blue/20 rounded-full px-2 py-1">
                  <p class="text-commute-blue text-xs font-semibold">50 pts</p>
                </div>
              </div>
              <p class="text-commute-lightblue text-sm">Redeem for a $5 voucher at participating coffee shops.</p>
            </div>
            
            <div class="glass-panel bg-commute-navy/40 rounded-lg p-4 hover:bg-commute-navy/60 transition-all-200 cursor-pointer">
              <div class="flex justify-between items-start mb-3">
                <h4 class="text-lg font-medium text-commute-offwhite">Free Bus Ride</h4>
                <div class="bg-commute-blue/20 rounded-full px-2 py-1">
                  <p class="text-commute-blue text-xs font-semibold">75 pts</p>
                </div>
              </div>
              <p class="text-commute-lightblue text-sm">Redeem for a free one-way bus ride on your next commute.</p>
            </div>
            
            <div class="glass-panel bg-commute-navy/40 rounded-lg p-4 hover:bg-commute-navy/60 transition-all-200 cursor-pointer">
              <div class="flex justify-between items-start mb-3">
                <h4 class="text-lg font-medium text-commute-offwhite">$10 Rideshare Credit</h4>
                <div class="bg-commute-blue/20 rounded-full px-2 py-1">
                  <p class="text-commute-blue text-xs font-semibold">100 pts</p>
                </div>
              </div>
              <p class="text-commute-lightblue text-sm">Redeem for a $10 credit on your next rideshare trip.</p>
            </div>
            
            <div class="glass-panel bg-commute-navy/40 rounded-lg p-4 hover:bg-commute-navy/60 transition-all-200 cursor-pointer">
              <div class="flex justify-between items-start mb-3">
                <h4 class="text-lg font-medium text-commute-offwhite">Monthly Transit Pass</h4>
                <div class="bg-commute-blue/20 rounded-full px-2 py-1">
                  <p class="text-commute-blue text-xs font-semibold">500 pts</p>
                </div>
              </div>
              <p class="text-commute-lightblue text-sm">Redeem for a 10% discount on your next monthly transit pass.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderDashboardPartners() {
  app.innerHTML = `
    <div class="min-h-screen w-full">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-commute-blue/10 via-transparent to-transparent"></div>
      
      <!-- Decorative elements -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-commute-darknavy via-commute-blue to-commute-darknavy"></div>
      <div class="absolute bottom-0 left-0 w-full h-px bg-commute-lightblue/10"></div>
      
      ${renderNavbar()}
      
      <div class="dashboard-container container">
        ${renderBreadcrumb()}
        
        <div class="glass-panel rounded-xl animate-fade-in">
          <h2 class="text-2xl font-bold text-commute-offwhite mb-4">Our Partners</h2>
          <p class="text-commute-lightblue mb-6">
            Explore exclusive deals and discounts from our transportation partners.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="glass-panel bg-commute-navy/40 rounded-lg overflow-hidden">
              <div class="h-40 bg-commute-blue/20 flex items-center justify-center">
                <p class="text-commute-blue font-semibold">Partner Logo</p>
              </div>
              <div class="p-4">
                <h3 class="text-lg font-semibold text-commute-offwhite">Metro Transit</h3>
                <p class="text-commute-lightblue text-sm mt-1 mb-3">15% off monthly passes for CommuteConnect members.</p>
                <button class="btn-secondary w-full">View Offers</button>
              </div>
            </div>
            
            <div class="glass-panel bg-commute-navy/40 rounded-lg overflow-hidden">
              <div class="h-40 bg-commute-blue/20 flex items-center justify-center">
                <p class="text-commute-blue font-semibold">Partner Logo</p>
              </div>
              <div class="p-4">
                <h3 class="text-lg font-semibold text-commute-offwhite">RideShare Co.</h3>
                <p class="text-commute-lightblue text-sm mt-1 mb-3">$5 off your first 3 rides when you connect your account.</p>
                <button class="btn-secondary w-full">View Offers</button>
              </div>
            </div>
            
            <div class="glass-panel bg-commute-navy/40 rounded-lg overflow-hidden">
              <div class="h-40 bg-commute-blue/20 flex items-center justify-center">
                <p class="text-commute-blue font-semibold">Partner Logo</p>
              </div>
              <div class="p-4">
                <h3 class="text-lg font-semibold text-commute-offwhite">City Bikes</h3>
                <p class="text-commute-lightblue text-sm mt-1 mb-3">Free monthly membership for active CommuteConnect users.</p>
                <button class="btn-secondary w-full">View Offers</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderNotFoundPage() {
  app.innerHTML = `
    <div class="not-found">
      <div>
        <h1>404</h1>
        <p>Oops! Page not found</p>
        <a href="#/" onclick="router.navigate('/')">Return to Home</a>
      </div>
    </div>
  `;
}

// Initialize app
function init() {
  // Check authentication status
  checkAuth();
  
  // Initial route handling
  router.handleRouteChange();
  
  // Add event listener for route changes
  window.addEventListener('hashchange', () => {
    router.handleRouteChange();
  });
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
