import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, Table, Settings, Moon, Sun } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`sidebar glass ${isOpen ? 'open' : ''}`}>
      <div className="logo-container">
        <h2 className="logo-text">Dash<span className="accent">UI</span></h2>
      </div>

      <nav className="nav-menu">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
          <LayoutDashboard size={20} />
          <span>Overview</span>
        </NavLink>
        <NavLink to="/activity" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Activity size={20} />
          <span>Activity</span>
        </NavLink>
        <NavLink to="/datatable" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Table size={20} />
          <span>Data Table</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <p>© 2026 DashUI</p>
      </div>
    </aside>
  );
};

export default Sidebar;
