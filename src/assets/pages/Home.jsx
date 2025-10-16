import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Apple, Play, Download, Star, Zap, CheckCircle, Power, Clock, Trello, Plane, Gauge, Search, Trash2, Sliders, X, Loader, Home as HomeIcon, List, CornerUpLeft } from 'lucide-react';


const ResponsiveContainer = ({ children, width = '100%', height = 300 }) => (
  <div style={{ width, height, margin: '0 auto' }}>{children}</div>
);
const LineChart = ({ children }) => <div className="p-4 bg-white rounded-xl shadow-inner">{children}</div>;
const Line = () => <div className="h-1 bg-indigo-500 rounded-full w-full" style={{ opacity: 0.7 }} />;
const XAxis = ({ dataKey }) => <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">X-Axis ({dataKey})</div>;
const YAxis = () => <div className="text-xs text-gray-500 pt-2 border-l border-gray-200 pl-2">Y-Axis (Reviews)</div>;
const Tooltip = () => <div className="absolute top-0 right-0 p-1 text-xs bg-gray-800 text-white rounded-md shadow-lg">Data Point Mock</div>;

const ChartPlaceholder = ({ data }) => {
  const chartHeight = 200;
  const dataPoints = data.map(d => d.value);
  const maxVal = Math.max(...dataPoints);

  return (
      <ResponsiveContainer>
          <div className="relative w-full h-full p-4">
              <div className="absolute inset-0 flex flex-col justify-between">
                  <div className="h-px bg-gray-200"></div>
                  <div className="h-px bg-gray-200"></div>
                  <div className="h-px bg-gray-200"></div>
              </div>
              <div className="flex justify-between items-end h-full relative">
                  {data.map((point, index) => (
                      <div key={index} className="flex flex-col items-center h-full justify-end">
                          <div
                              key={index}
                              className="w-4 bg-indigo-500 rounded-t-lg transition-all duration-500 hover:bg-indigo-600"
                              style={{ height: `${(point.value / maxVal) * chartHeight}px`, minHeight: '5px' }}
                          ></div>
                          <span className="text-xs text-gray-600 mt-1">{point.name}</span>
                      </div>
                  ))}
              </div>
              <p className="text-center text-sm font-medium text-gray-500 mt-4">Review Chart (Mock Recharts Visualization)</p>
          </div>
      </ResponsiveContainer>
  );
};

const ToastComponent = ({ toast, setToast }) => {
  if (!toast.message) return null;

  const getStyle = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-700';
    }
  };

  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => {
        setToast({ message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.message]);

  return (
    <div
      className={`fixed bottom-5 right-5 p-4 rounded-lg text-white shadow-xl flex items-center space-x-3 transition-opacity duration-300 z-[100] ${getStyle(toast.type)}`}
      role="alert"
    >
      <CheckCircle className="w-5 h-5" />
      <p className="text-sm font-medium">{toast.message}</p>
      <button onClick={() => setToast({ message: '', type: '' })}>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};


const STORAGE_KEY = 'heroio_installed_apps';

const getInstalledApps = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data).map(Number) : []; 
  } catch (error) {
    console.error("Error reading localStorage:", error);
    return [];
  }
};

const saveInstalledApps = (apps) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};

const AppsData = [
  {
    "image": "https://picsum.photos/seed/taskflow/400/400",
    "title": "TaskFlow",
    "companyName": "FlowTech Ltd",
    "id": 1,
    "description": "Manage tasks, deadlines, and projects with smart productivity insights. This app is designed to help you organize your daily life, prioritize important tasks, and achieve your goals faster. It includes features like customizable boards, reminder alerts, and team collaboration tools.",
    "size": 42,
    "reviews": 1280,
    "ratingAvg": 4.6,
    "downloads": 50000,
    "reviewData": [{ name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 }, { name: 'Mar', value: 2000 }, { name: 'Apr', value: 2780 }, { name: 'May', value: 1890 }, { name: 'Jun', value: 2390 }],
  },
  {
    "image": "https://picsum.photos/seed/fitbuddy/400/400",
    "title": "FitBuddy",
    "companyName": "Wellbeing Apps",
    "id": 2,
    "description": "Track workouts and nutrition with AI-based fitness recommendations. Achieve your health and fitness goals with personalized plans, detailed progress tracking, and access to a library of professional workout videos. Stay motivated with community challenges.",
    "size": 55,
    "reviews": 2210,
    "ratingAvg": 4.8,
    "downloads": 150000,
    "reviewData": [{ name: 'Jan', value: 3000 }, { name: 'Feb', value: 4500 }, { name: 'Mar', value: 5000 }, { name: 'Apr', value: 3800 }, { name: 'May', value: 4100 }, { name: 'Jun', value: 5500 }],
  },
  {
    "image": "https://picsum.photos/seed/photosnap/400/400",
    "title": "PhotoSnap",
    "companyName": "Pixel Studios",
    "id": 3,
    "description": "Edit and share your photos with beautiful filters and instant effects. This app offers professional-grade editing tools in a simple interface, making it easy for anyone to enhance their pictures and share them directly to social media.",
    "size": 76,
    "reviews": 3410,
    "ratingAvg": 4.4,
    "downloads": 250000,
    "reviewData": [{ name: 'Jan', value: 1000 }, { name: 'Feb', value: 2000 }, { name: 'Mar', value: 1500 }, { name: 'Apr', value: 2200 }, { name: 'May', value: 3000 }, { name: 'Jun', value: 2500 }],
  },
  {
    "image": "https://picsum.photos/seed/notease/400/400",
    "title": "NoteEase",
    "companyName": "Paperless Labs",
    "id": 4,
    "description": "Create, organize, and sync notes seamlessly across all devices. Never lose an idea again. NoteEase supports rich text, voice notes, and collaborative editing, perfect for students and professionals alike.",
    "size": 38,
    "reviews": 980,
    "ratingAvg": 4.2,
    "downloads": 85000,
    "reviewData": [{ name: 'Jan', value: 500 }, { name: 'Feb', value: 900 }, { name: 'Mar', value: 1200 }, { name: 'Apr', value: 1000 }, { name: 'May', value: 1500 }, { name: 'Jun', value: 1800 }],
  },
  {
    "image": "https://picsum.photos/seed/budgetwise/400/400",
    "title": "BudgetWise",
    "companyName": "FinTech Pro",
    "id": 5,
    "description": "Plan budgets, control expenses, and save more with personalized insights. Take control of your finances. Automatically categorize transactions, set spending limits, and visualize your financial health with detailed reports.",
    "size": 60,
    "reviews": 4500,
    "ratingAvg": 4.5,
    "downloads": 340000,
    "reviewData": [{ name: 'Jan', value: 6000 }, { name: 'Feb', value: 5500 }, { name: 'Mar', value: 6500 }, { name: 'Apr', value: 7000 }, { name: 'May', value: 8000 }, { name: 'Jun', value: 7500 }],
  },
  {
    "image": "https://picsum.photos/seed/soundwave/400/400",
    "title": "SoundWave",
    "companyName": "EchoWorks",
    "id": 6,
    "description": "Stream music and podcasts with immersive sound and offline mode. Discover millions of songs, create custom playlists, and enjoy ad-free listening anywhere, anytime. High-fidelity audio guaranteed.",
    "size": 90,
    "reviews": 8120,
    "ratingAvg": 4.7,
    "downloads": 800000,
    "reviewData": [{ name: 'Jan', value: 9000 }, { name: 'Feb', value: 8500 }, { name: 'Mar', value: 10000 }, { name: 'Apr', value: 9500 }, { name: 'May', value: 11000 }, { name: 'Jun', value: 12000 }],
  },
  {
    "image": "https://picsum.photos/seed/travelgo/400/400",
    "title": "TravelGo",
    "companyName": "JetSmart",
    "id": 7,
    "description": "Book flights, hotels, and trips worldwide with one easy app. Find the best deals, manage your bookings on the go, and get real-time flight updates. Your perfect travel companion.",
    "size": 78,
    "reviews": 2310,
    "ratingAvg": 4.3,
    "downloads": 300000,
    "reviewData": [{ name: 'Jan', value: 2000 }, { name: 'Feb', value: 2500 }, { name: 'Mar', value: 3500 }, { name: 'Apr', value: 4000 }, { name: 'May', value: 3000 }, { name: 'Jun', value: 4500 }],
  },
  {
    "image": "https://picsum.photos/seed/mindscape/400/400",
    "title": "MindScape",
    "companyName": "Serenity Labs",
    "id": 8,
    "description": "Guided meditation and sleep stories for daily wellness and stress relief. Improve focus, reduce anxiety, and sleep better with hundreds of guided sessions led by world-renowned experts. Start your journey to mindfulness today.",
    "size": 110,
    "reviews": 6700,
    "ratingAvg": 4.9,
    "downloads": 950000,
    "reviewData": [{ name: 'Jan', value: 7000 }, { name: 'Feb', value: 7500 }, { name: 'Mar', value: 8000 }, { name: 'Apr', value: 9000 }, { name: 'May', value: 8500 }, { name: 'Jun', value: 9200 }],
  },
  {
    "image": "https://picsum.photos/seed/codelearn/400/400",
    "title": "CodeLearn",
    "companyName": "DevAcademy",
    "id": 9,
    "description": "Interactive lessons and coding challenges for beginners to advanced programmers. Learn Python, JavaScript, HTML, and more through engaging, bite-sized lessons. Practice in the built-in code editor.",
    "size": 98,
    "reviews": 4120,
    "ratingAvg": 4.6,
    "downloads": 610000,
    "reviewData": [{ name: 'Jan', value: 4500 }, { name: 'Feb', value: 5000 }, { name: 'Mar', value: 4800 }, { name: 'Apr', value: 5500 }, { name: 'May', value: 6000 }, { name: 'Jun', value: 6500 }],
  },
  {
    "image": "https://picsum.photos/seed/recipespot/400/400",
    "title": "RecipeSpot",
    "companyName": "KitchenGenius",
    "id": 10,
    "description": "Find and save delicious recipes with step-by-step cooking instructions. Explore thousands of recipes based on cuisine, diet, or ingredients you have at home. Includes meal planning features.",
    "size": 48,
    "reviews": 1560,
    "ratingAvg": 4.5,
    "downloads": 180000,
    "reviewData": [{ name: 'Jan', value: 1500 }, { name: 'Feb', value: 1800 }, { name: 'Mar', value: 2000 }, { name: 'Apr', value: 2500 }, { name: 'May', value: 2200 }, { name: 'Jun', value: 2800 }],
  },
  {
    "image": "https://picsum.photos/seed/autotrack/400/400",
    "title": "AutoTrack",
    "companyName": "DriveWise Inc.",
    "id": 11,
    "description": "Log mileage, track fuel consumption, and manage vehicle maintenance schedules. Keep your vehicle in top shape. Get reminders for oil changes, track expenses, and generate detailed reports for tax purposes.",
    "size": 30,
    "reviews": 790,
    "ratingAvg": 4.1,
    "downloads": 75000,
    "reviewData": [{ name: 'Jan', value: 800 }, { name: 'Feb', value: 1000 }, { name: 'Mar', value: 1500 }, { name: 'Apr', value: 1200 }, { name: 'May', value: 1600 }, { name: 'Jun', value: 1400 }],
  },
  {
    "image": "https://picsum.photos/seed/artsketch/400/400",
    "title": "ArtSketch",
    "companyName": "Canvas Digital",
    "id": 12,
    "description": "A powerful digital sketchbook with layers and professional drawing tools. Create stunning digital art anywhere. Features include pressure sensitivity, custom brushes, and cloud synchronization.",
    "size": 150,
    "reviews": 9200,
    "ratingAvg": 4.8,
    "downloads": 1200000,
    "reviewData": [{ name: 'Jan', value: 10000 }, { name: 'Feb', value: 12000 }, { name: 'Mar', value: 11000 }, { name: 'Apr', value: 13000 }, { name: 'May', value: 14000 }, { name: 'Jun', value: 15000 }],
  }
];


const StoreButton = ({ icon: Icon, text, link }) => (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gray-900 text-white font-semibold text-sm shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-gray-700"
    >
      <Icon className="w-5 h-5" />
      <span className="flex flex-col items-start leading-none">
        <span className="text-xs font-light">GET IT ON</span>
        <span className="text-base">{text}</span>
      </span>
    </a>
  );
  
const FloatingIcon = ({ icon: Icon, className, iconColor, bgColor }) => (
    <div 
      className={`absolute p-3 rounded-full shadow-xl transition duration-500 hover:scale-110 ${className} ${bgColor}`}
      role="img" 
      aria-label="App Feature Icon"
    >
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
);

const StatCard = ({ value, label, subtext, icon: Icon }) => (
    <div className="flex flex-col items-center p-4">
      <Icon className="w-8 h-8 text-indigo-200 mb-3" />
      <div className="text-4xl sm:text-5xl font-extrabold text-white mb-1">
        {value}
      </div>
      <p className="text-sm font-medium text-indigo-300 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-xs text-indigo-400 font-light italic">
        {subtext}
      </p>
    </div>
);

const formatDownloads = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K+';
    return num.toLocaleString();
};

const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.3 && rating % 1 < 0.8; 
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    const StarIcon = ({ type }) => {
        if (type === 'full') return <Star className="w-4 h-4 text-yellow-500 fill-current" />;
        if (type === 'half') return <Star className="w-4 h-4 text-yellow-500 fill-current opacity-50" />; 
        return <Star className="w-4 h-4 text-gray-300" />;
    };

    return (
        <div className="flex items-center text-sm space-x-0.5">
            {Array(fullStars).fill(0).map((_, i) => (<StarIcon key={`full-${i}`} type="full" />))}
            {hasHalfStar && (<StarIcon key="half" type="half" />)}
            {Array(emptyStars).fill(0).map((_, i) => (<StarIcon key={`empty-${i}`} type="empty" />))}
        </div>
    );
};

const AppCard = ({ app, onNavigate, onInstall, isInstalled, onUninstall, isInstalledPage = false }) => {
    
    const handleAction = (e) => {
        e.stopPropagation();
        if (isInstalledPage) {
            onUninstall(app.id);
        } else if (!isInstalled) {
            onInstall(app);
        }
    };

    return (
        <div 
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-2xl hover:-translate-y-1 text-left cursor-pointer"
            onClick={() => onNavigate(`details/${app.id}`)}
        >
            <div className="flex items-start space-x-4 mb-4">
                <img 
                    src={app.image} 
                    alt={`${app.title} icon`} 
                    className="flex-shrink-0 w-16 h-16 rounded-2xl object-cover shadow-md"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64/2563EB/ffffff?text=App"; }}
                />
                <div className='overflow-hidden'>
                    <h3 className="text-xl font-bold text-gray-900 truncate">{app.title}</h3>
                    <p className="text-sm text-indigo-600 font-medium truncate">{app.companyName}</p>
                </div>
            </div>
            
            <p className="mt-2 text-sm text-gray-600 line-clamp-2 h-10">{app.description}</p>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className='flex items-center justify-between'>
                    {renderStars(app.ratingAvg)}
                    <span className="ml-1 text-gray-800 font-semibold text-sm">{app.ratingAvg.toFixed(1)}</span>
                </div>
                
                <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                    <span>
                        <span className="font-bold text-gray-800">{formatDownloads(app.downloads)}</span> Downloads
                    </span>
                    <span>
                        {app.size} MB
                    </span>
                </div>
            </div>

            <button
                onClick={handleAction}
                disabled={!isInstalledPage && isInstalled}
                className={`mt-4 w-full py-2 rounded-lg text-sm font-semibold transition duration-200 shadow-md hover:shadow-lg transform active:scale-95
                    ${isInstalledPage 
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : isInstalled
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }
                `}
            >
                {isInstalledPage ? (
                    <span className='flex items-center justify-center'>
                        <Trash2 className="w-4 h-4 mr-2" /> Uninstall
                    </span>
                ) : isInstalled ? (
                    <span className='flex items-center justify-center'>
                        <CheckCircle className="w-4 h-4 mr-2" /> Installed
                    </span>
                ) : 'Get App'}
            </button>
        </div>
    );
};

const NavbarComponent = ({ currentPath, onNavigate, installedCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const baseLinkClass =
    "text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition duration-200 flex items-center";
  const activeLinkClass =
    "text-indigo-700 underline decoration-2 decoration-indigo-700 underline-offset-4";
  const inactiveLinkClass = "hover:text-indigo-700";

  const mobileLinkClass =
    "text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition duration-200 flex items-center";
  const mobileActiveLinkClass =
    "bg-indigo-100 text-indigo-700";
  const mobileInactiveLinkClass = "hover:bg-indigo-50";


  const NavButton = ({ targetPath, label, isMobile = false, icon: Icon, showCount = false }) => {
    const isActive = currentPath.startsWith(targetPath);
    const linkClasses = isMobile 
        ? `${mobileLinkClass} ${isActive ? mobileActiveLinkClass : mobileInactiveLinkClass}`
        : `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`;
    
    return (
        <button
            onClick={() => { onNavigate(targetPath); setIsOpen(false); }}
            className={linkClasses}
        >
            {Icon && <Icon className="w-4 h-4 mr-1.5" />}
            {label}
            {showCount && installedCount > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {installedCount}
                </span>
            )}
        </button>
    );
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center"
            >
             <img
             src="https://placehold.co/32x32/6366f1/ffffff?text=L"
             alt="HERO.IO Logo"
             className="w-8 h-8 rounded-lg"
             />

              <span className="ml-2 text-xl font-bold text-indigo-700">
                HERO.IO
              </span>
            </button>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex space-x-8">
              <NavButton targetPath="home" label="Home" icon={HomeIcon} />
              <NavButton targetPath="apps" label="Apps" icon={List} />
              <NavButton targetPath="myinstall" label="My Installation" icon={Download} showCount={true} />
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <a
              href="https://github.com/RAYHAN1812/Hero_app"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
            >
              Contribute
            </a>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition duration-150"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavButton targetPath="home" label="Home" isMobile={true} icon={HomeIcon} />
            <NavButton targetPath="apps" label="Apps" isMobile={true} icon={List} />
            <NavButton targetPath="myinstall" label="My Installation" isMobile={true} icon={Download} showCount={true} />
            
            <a
              href="https://github.com/RAYHAN1812/Hero_app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-4 block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
            >
              Contribute
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const LoadingIndicator = ({ text = "Loading..." }) => (
  <div className="flex items-center justify-center p-10 text-lg font-medium text-indigo-600">
    <Loader className="w-6 h-6 mr-3 animate-spin" />
    {text}
  </div>
);

const NoResults = ({ message = "No applications found matching your criteria." }) => (
  <div className="text-center p-16 bg-gray-50 rounded-xl shadow-inner my-8">
    <Search className="w-10 h-10 mx-auto text-gray-400 mb-4" />
    <p className="text-xl font-medium text-gray-700">{message}</p>
    <p className="text-gray-500 mt-2">Try adjusting your search query or filters.</p>
  </div>
);


const HomeContent = ({ onNavigate, appsData, installedApps, onInstall, isLoading }) => {
    const appStoreLink = "https://www.apple.com/app-store/";
    const playStoreLink = "https://play.google.com/store";
  
    const MobileMockupWithFeatures = () => {
        const heroImageUrl = "./hero.png";

        return (
          <div className="mt-8 sm:mt-16 flex justify-center w-full relative max-w-xl mx-auto py-16">
            
            <FloatingIcon icon={Gauge} className="hidden sm:block -left-4 top-0 md:-left-8 md:top-4 lg:-left-12" bgColor="bg-blue-100" iconColor="text-blue-500" />
            <FloatingIcon icon={CheckCircle} className="hidden sm:block -left-10 top-1/3 md:-left-16 lg:-left-20" bgColor="bg-green-100" iconColor="text-green-500" />
            <FloatingIcon icon={Power} className="hidden sm:block -left-4 bottom-0 md:-left-8 md:-bottom-4 lg:-left-12" bgColor="bg-green-100" iconColor="text-green-500" />
            <FloatingIcon icon={Clock} className="hidden sm:block -right-4 top-0 md:-right-8 md:-top-4 lg:-right-12" bgColor="bg-red-100" iconColor="text-red-500" />
            <FloatingIcon icon={Trello} className="hidden sm:block -right-10 top-1/3 md:-right-16 lg:-right-20" bgColor="bg-blue-100" iconColor="text-blue-500" />
            <FloatingIcon icon={Plane} className="hidden sm:block -right-4 bottom-0 md:-right-8 md:-bottom-4 lg:-right-12" bgColor="bg-sky-100" iconColor="text-sky-500" />

            <img
              src={heroImageUrl}
              alt="HERO.IO Mobile App Preview"
              className="w-full max-w-xs h-auto rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transform transition duration-500 ease-in-out cursor-pointer hover:scale-[1.05]"
              onError={(e) => {
               e.target.onerror = null;
               e.target.src = `https://placehold.co/400x500/6366f1/ffffff?text=HERO+MOCKUP`;
              }}
            />
          </div>
        );
    };

    const HeroSection = () => (
        <section className="py-12 md:py-24 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            We Build <span className="text-indigo-600">Productive Apps</span>
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            At HERO.IO, we craft innovative apps designed to make everyday life simpler, smarter, and more exciting. Our goal is to turn your ideas into digital experiences that truly make an impact.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-4">
            <StoreButton icon={Play} text="Google Play" link={playStoreLink} />
            <StoreButton icon={Apple} text="App Store" link={appStoreLink} />
            </div>
            <MobileMockupWithFeatures />
        </section>
    );

    const StatsSection = () => (
        <section className="bg-indigo-700 w-full py-12 md:py-16 rounded-t-[3rem] shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 md:mb-12">
              Trusted By Millions, Built For You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard
                value="29.6M"
                label="Total Downloads"
                subtext="21% More Than Last Month"
                icon={Download}
              />
              <StatCard
                value="906K"
                label="Total Reviews"
                subtext="45% More Than Last Month"
                icon={Star}
              />
              <StatCard
                value="132+"
                label="Active Apps"
                subtext="50 More Will Launch Soon"
                icon={Zap}
              />
            </div>
          </div>
        </section>
    );

    const AppListSection = () => {
        if (isLoading) return <LoadingIndicator text="Loading featured apps..." />;
      
        return (
            <section className="py-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                    Our Featured Apps
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                    Explore a curated selection of our most popular and high-performing applications.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {appsData.slice(0, 4).map(app => (
                        <AppCard 
                            key={app.id} 
                            app={app} 
                            onNavigate={onNavigate} 
                            onInstall={onInstall} 
                            isInstalled={installedApps.includes(app.id)}
                        />
                    ))}
                </div>

                <div className="mt-12">
                    <button
                        onClick={() => onNavigate('apps')}
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 shadow-xl hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.05] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Show All Apps &rarr;
                    </button>
                </div>
            </section>
        );
    };

    return (
        <>
            <HeroSection />
            <StatsSection />
            <AppListSection />
        </>
    );
};

const AppsPage = ({ appsData, installedApps, onNavigate, onInstall, isLoading }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('none');
    const [isSearching, setIsSearching] = useState(false);

    const filteredAndSortedApps = useMemo(() => {
        let filtered = appsData.filter(app =>
            app.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortBy === 'high-low') {
            filtered = filtered.sort((a, b) => b.downloads - a.downloads);
        } else if (sortBy === 'low-high') {
            filtered = filtered.sort((a, b) => a.downloads - b.downloads);
        }
        return filtered;
    }, [appsData, searchTerm, sortBy]);

    useEffect(() => {
      if (searchTerm) {
        setIsSearching(true);
        const timer = setTimeout(() => setIsSearching(false), 500);
        return () => clearTimeout(timer);
      } else {
        setIsSearching(false);
      }
    }, [searchTerm]);

    if (isLoading) {
      return <LoadingIndicator text="Loading all apps..." />;
    }

    return (
      <div className="pt-12 pb-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">The HERO.IO App Store</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Discover the best tools to enhance your productivity and daily life. Find the perfect app for every need.</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <p className="text-lg font-semibold text-gray-700">
                  Total Apps: <span className="text-indigo-600">{filteredAndSortedApps.length}</span>
              </p>
              
              <div className="flex w-full md:w-auto space-x-4">
                  <div className="relative flex-grow">
                      <input
                          type="text"
                          placeholder="Search apps..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      {isSearching && (
                        <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-500 animate-spin" />
                      )}
                  </div>
                  
                  <div className="relative">
                      <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="appearance-none w-full md:w-40 pl-3 pr-8 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-sm"
                      >
                          <option value="none">Sort by Default</option>
                          <option value="high-low">Downloads (High to Low)</option>
                          <option value="low-high">Downloads (Low to High)</option>
                      </select>
                      <Sliders className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
              </div>
          </div>

          {filteredAndSortedApps.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredAndSortedApps.map(app => (
                      <AppCard 
                          key={app.id} 
                          app={app} 
                          onNavigate={onNavigate} 
                          onInstall={onInstall} 
                          isInstalled={installedApps.includes(app.id)}
                      />
                  ))}
              </div>
          ) : (
              <NoResults />
          )}

      </div>
    );
};

const AppDetailsPage = ({ appsData, onNavigate, onInstall, onUninstall, installedApps, path }) => {
    const appIdMatch = path.match(/details\/(\d+)/);
    const appId = appIdMatch ? parseInt(appIdMatch[1], 10) : null;
    const app = appsData.find(a => a.id === appId);
    const isInstalled = installedApps.includes(appId);

    if (!app) {
        return (
            <div className="pt-20 pb-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-extrabold text-red-600 mb-4">404 App Not Found</h1>
                <p className="text-lg text-gray-600">The application you are looking for does not exist or the URL is incorrect.</p>
                <button
                    onClick={() => onNavigate('apps')}
                    className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 shadow-xl hover:bg-indigo-700 transition duration-300"
                >
                    <CornerUpLeft className="w-5 h-5 mr-2" /> Back to App Store
                </button>
            </div>
        );
    }
    
    const handleAction = () => {
        if (isInstalled) {
            onUninstall(app.id);
        } else {
            onInstall(app);
        }
    };

    return (
        <div className="pt-12 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
                onClick={() => onNavigate('apps')}
                className="flex items-center text-indigo-600 font-semibold mb-8 hover:text-indigo-800 transition duration-200"
            >
                <CornerUpLeft className="w-4 h-4 mr-1" /> Back to App Store
            </button>

            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10">
                <div className="flex flex-col md:flex-row md:space-x-8">
                    <img
                        src={app.image}
                        alt={`${app.title} icon`}
                        className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-3xl object-cover shadow-xl mb-6 md:mb-0"
                    />
                    <div className="flex-grow">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{app.title}</h1>
                        <p className="text-xl text-indigo-600 font-medium mt-1">{app.companyName}</p>
                        
                        <div className='flex items-center mt-3 space-x-4'>
                            <div className="flex flex-col items-center">
                                {renderStars(app.ratingAvg)}
                                <span className="text-sm text-gray-500 mt-1">{app.reviews.toLocaleString()} Reviews</span>
                            </div>
                            <div className='w-px h-10 bg-gray-200'></div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-800">{app.ratingAvg.toFixed(1)}</p>
                                <p className="text-sm text-gray-500">Rating</p>
                            </div>
                            <div className='w-px h-10 bg-gray-200'></div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-800">{formatDownloads(app.downloads)}</p>
                                <p className="text-sm text-gray-500">Downloads</p>
                            </div>
                        </div>

                        <button
                            onClick={handleAction}
                            className={`mt-6 px-8 py-3 rounded-full text-base font-semibold transition duration-200 shadow-lg hover:shadow-xl transform active:scale-95
                                ${isInstalled
                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                }
                            `}
                        >
                            {isInstalled ? (
                                <span className='flex items-center justify-center'>
                                    <Trash2 className="w-5 h-5 mr-2" /> Uninstall App
                                </span>
                            ) : (
                                <span className='flex items-center justify-center'>
                                    <Download className="w-5 h-5 mr-2" /> Get App ({app.size} MB)
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                <div className="mt-10 border-t border-gray-100 pt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About This App</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{app.description}</p>
                </div>
                
                <div className="mt-10 border-t border-gray-100 pt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Trend</h2>
                    <LineChart>
                        <ChartPlaceholder data={app.reviewData} />
                    </LineChart>
                </div>
            </div>
        </div>
    );
};

const MyInstallationPage = ({ installedApps, appsData, onUninstall }) => {
    const installedAppData = useMemo(() => {
        const appMap = new Map(appsData.map(app => [app.id, app]));
        return installedApps.map(id => appMap.get(id)).filter(app => app);
    }, [installedApps, appsData]);

    return (
        <div className="pt-12 pb-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Installations</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">Manage the apps you've installed from HERO.IO. Total installed apps: <span className='font-bold text-indigo-600'>{installedAppData.length}</span></p>
            </div>

            {installedAppData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {installedAppData.map(app => (
                        <AppCard
                            key={app.id}
                            app={app}
                            onUninstall={onUninstall}
                            isInstalledPage={true} 
                        />
                    ))}
                </div>
            ) : (
                <NoResults message="You don't have any apps installed yet." />
            )}
        </div>
    );
};


const App = () => {
    
    const initialPath = window.location.pathname.substring(1) || 'home';
    const [currentPath, setCurrentPath] = useState(initialPath);
    const [installedApps, setInstalledApps] = useState(getInstalledApps);
    const [toast, setToast] = useState({ message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false); 
    const onNavigate = useCallback((path) => {
        window.history.pushState(null, '', `/${path}`);
        
        setCurrentPath(path);
    }, []);

    
    useEffect(() => {
        const handlePopState = () => {
            
            setCurrentPath(window.location.pathname.substring(1) || 'home');
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleInstall = (app) => {
        if (!installedApps.includes(app.id)) {
            const newInstalledApps = [...installedApps, app.id];
            setInstalledApps(newInstalledApps);
            saveInstalledApps(newInstalledApps);
            setToast({ message: `${app.title} installed successfully!`, type: 'success' });
        }
    };

    const handleUninstall = (appId) => {
        const app = AppsData.find(a => a.id === appId);
        const newInstalledApps = installedApps.filter(id => id !== appId);
        setInstalledApps(newInstalledApps);
        saveInstalledApps(newInstalledApps);
        setToast({ message: `${app.title} uninstalled.`, type: 'error' });
    };

    const renderContent = () => {
        if (currentPath === 'home' || currentPath === '') {
            return (
                <HomeContent 
                    onNavigate={onNavigate} 
                    appsData={AppsData} 
                    installedApps={installedApps} 
                    onInstall={handleInstall} 
                    isLoading={isLoading} 
                />
            );
        }
        if (currentPath === 'apps') {
            return (
                <AppsPage 
                    onNavigate={onNavigate} 
                    appsData={AppsData} 
                    installedApps={installedApps} 
                    onInstall={handleInstall} 
                    isLoading={isLoading} 
                />
            );
        }
        if (currentPath === 'myinstall') {
            return (
                <MyInstallationPage 
                    appsData={AppsData} 
                    installedApps={installedApps} 
                    onUninstall={handleUninstall} 
                />
            );
        }
        if (currentPath.startsWith('details/')) {
            return (
                <AppDetailsPage 
                    path={currentPath} 
                    onNavigate={onNavigate} 
                    appsData={AppsData} 
                    installedApps={installedApps} 
                    onInstall={handleInstall} 
                    onUninstall={handleUninstall} 
                />
            );
        }

        return (
            <div className="pt-20 pb-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-extrabold text-red-600 mb-4">404 Page Not Found</h1>
                <p className="text-lg text-gray-600">The URL you requested does not match any route in the application.</p>
                <button
                    onClick={() => onNavigate('home')}
                    className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 shadow-xl hover:bg-indigo-700 transition duration-300"
                >
                    <CornerUpLeft className="w-5 h-5 mr-2" /> Go to Homepage
                </button>
            </div>
        );
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <NavbarComponent 
                currentPath={currentPath} 
                onNavigate={onNavigate} 
                installedCount={installedApps.length} 
            />
            
            <main>
                {renderContent()}
            </main>

            <ToastComponent toast={toast} setToast={setToast} />

            <footer className="w-full bg-gray-100 py-6 mt-12 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} HERO.IO. All rights reserved. | Simple SPA Router Mockup.
                </div>
            </footer>
        </div>
    );
};

export default App;