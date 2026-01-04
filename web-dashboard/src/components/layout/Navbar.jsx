// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="fixed top-0 w-full bg-white shadow-md z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/dashboard" className="text-2xl font-bold text-green-600">🌾 Fertilizer Tracker</Link>
//             <div className="hidden md:ml-10 md:flex md:space-x-8">
//               <Link to="/dashboard" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Dashboard</Link>
//               <Link to="/crops" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Crops</Link>
//               <Link to="/thermal/new" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Add Thermal Data</Link>
//               <Link to="/analytics" className="hover:text-green-600 font-medium">Analytics</Link>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <span className="text-sm text-gray-700">Welcome, {user?.username}</span>
//             <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm">Logout</button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// src/components/layout/Navbar.jsx
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { PlusCircle } from 'lucide-react'; // Optional: for a nice icon

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="fixed top-0 w-full bg-white shadow-md z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/dashboard" className="text-2xl font-bold text-green-600">🌾 Fertilizer Tracker</Link>
//             {/* <div className="hidden md:ml-10 md:flex md:space-x-8"> */}
//             {/* <div className="flex ml-10 space-x-8">
//               <Link to="/dashboard" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Dashboard</Link>
              
//               <Link to="/new-analysis" className="flex items-center gap-1 text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
//                 <PlusCircle size={16} /> New Analysis
//               </Link>
//               <Link to="/analytics" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Analytics</Link>
//             </div> */}

//             <div className="flex ml-10 space-x-8"> {/* Removed 'hidden md:' so they stay visible */}
//               <Link to="/dashboard" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Dashboard</Link>
//               <Link to="/new-analysis" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">New Analysis</Link>
//               <Link to="/analytics" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Analytics</Link>
//             </div>

//           </div>
//           {/* ... logout section remains same ... */}
//         </div>
//       </div>
//     </nav>
//   );
// };
// export default Navbar;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-2xl font-bold text-green-600">🌾 Fertilizer Tracker</Link>

            <div className="flex ml-10 space-x-8">
              <Link to="/dashboard" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
              Dashboard
              </Link>
              <Link to="/crops" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
              Crops
              </Link>
              <Link to="/thermal/new" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
              Add Thermal Data
              </Link>
              <Link to="/analytics" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
              Analytics
              </Link>
            </div>

            {/* <div className="flex ml-10 space-x-8">
              <Link to="/dashboard" className="...">Dashboard</Link>
              
              <Link to="/thermal/new" className="...">New Analysis</Link>
              <Link to="/analytics" className="...">Analytics</Link>
            </div> */}

            
            
            {/* <div className="flex ml-10 space-x-8"> 
              <Link to="/dashboard" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Dashboard</Link>
              <Link to="/new-analysis" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">New Analysis</Link>
              <Link to="/analytics" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Analytics</Link>
            </div> */}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700 hidden sm:inline">Welcome, {user?.username}</span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
