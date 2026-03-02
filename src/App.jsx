import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardContent from './components/DashboardContent';
import Activity from './components/Activity';
import DataTable from './components/DataTable';
import Settings from './components/Settings';

function App() {
  // Initialize sidebar based on window width (closed on mobile by default)
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference or saved theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setIsDark(false);
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-container">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} />

      <div className={`main-wrapper ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header
          toggleSidebar={toggleSidebar}
          toggleTheme={toggleTheme}
          isDark={isDark}
        />
        <Routes>
          <Route path="/" element={<DashboardContent />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/datatable" element={<DataTable />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
