import { useState, useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardContent from './components/DashboardContent';
import Activity from './components/Activity';
import DataTable from './components/DataTable';
import Settings from './components/Settings';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return saved === 'dark' || (!saved && prefers);
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="app-container">
      {sidebarOpen && <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />}
      <Sidebar isOpen={sidebarOpen} />
      <div className={`main-wrapper ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} isDark={isDark} />
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