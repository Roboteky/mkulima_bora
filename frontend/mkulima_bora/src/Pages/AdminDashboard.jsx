// src/pages/AdminDashboard.jsx
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import FarmComparison from '../components/Admin/FarmComparison';
import SystemStatus from '../components/Admin/SystemStatus';
import UserManagement from '../components/Admin/UserManagement';
import { farmData } from '../data/dummyData';

const AdminDashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <FarmComparison farms={[farmData.userOne, farmData.userTwo]} />;
      case 'status':
        return <SystemStatus />;
      case 'users':
        return <UserManagement />;
      default:
        return <FarmComparison farms={[farmData.userOne, farmData.userTwo]} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Header 
        farmName="Mkulima Bora Admin" 
        location="System Overview" 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      
      <div className="flex flex-1">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isAdmin 
        />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold capitalize">Admin {activeTab}</h1>
            <p className="text-sm opacity-75">System status: All operational</p>
          </div>
          
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;