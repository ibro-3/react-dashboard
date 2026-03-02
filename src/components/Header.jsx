import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, User, Moon, Sun } from 'lucide-react';
import './Header.css';

const Header = ({ toggleSidebar, toggleTheme, isDark }) => {
    return (
        <header className="header glass">
            <div className="header-left">
                <button className="menu-btn" onClick={toggleSidebar}>
                    <Menu size={24} />
                </button>
                <div className="search-bar">
                    <Search size={18} className="search-icon" />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>

            <div className="header-right">
                <button className="icon-btn" onClick={toggleTheme}>
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button className="icon-btn">
                    <Bell size={20} />
                    <span className="badge"></span>
                </button>
                <div className="profile-btn">
                    <div className="avatar">
                        <User size={20} />
                    </div>
                    <span className="username">Admin</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
