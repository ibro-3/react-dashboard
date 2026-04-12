import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  User, Bell, Lock, CreditCard, Monitor, Save, 
  Eye, EyeOff, Check, Mail, Smartphone, Globe 
} from 'lucide-react';
import './Settings.css';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'appearance', label: 'Appearance', icon: Monitor },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@dashboard.com',
      phone: '+1 (555) 123-4567',
      company: 'Acme Corp',
      bio: 'Full-stack developer passionate about creating elegant solutions.',
    }
  });

  const notificationSettings = useForm({
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      weeklyDigest: false,
      marketingEmails: true,
      orderAlerts: true,
      userActivity: true,
      securityAlerts: true,
      productUpdates: true,
    }
  });

  const onProfileSubmit = async (data) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Profile data:', data);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const onNotificationsSubmit = async (data) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Notification settings:', data);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <form onSubmit={handleSubmit(onProfileSubmit)} className="settings-form">
            <div className="form-section">
              <h3>Personal Information</h3>
              <p className="section-description">Update your personal details and profile information</p>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input 
                    type="text" 
                    {...register('firstName', { required: 'First name is required' })}
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
                </div>
                
                <div className="form-group">
                  <label>Last Name</label>
                  <input 
                    type="text" 
                    {...register('lastName', { required: 'Last name is required' })}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
                  })}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email.message}</span>}
              </div>
              
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" {...register('phone')} />
              </div>
            </div>
            
            <div className="form-section">
              <h3>Company Details</h3>
              <p className="section-description">Your company information for billing purposes</p>
              
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" {...register('company')} />
              </div>
              
              <div className="form-group">
                <label>Bio</label>
                <textarea {...register('bio')} rows={4} />
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-save" disabled={isSaving}>
                {isSaving ? 'Saving...' : saved ? <><Check size={18} /> Saved! </> : <><Save size={18} /> Save Changes</>}
              </button>
            </div>
          </form>
        );
        
      case 'notifications':
        return (
          <form onSubmit={notificationSettings.handleSubmit(onNotificationsSubmit)} className="settings-form">
            <div className="form-section">
              <h3>Delivery Methods</h3>
              <p className="section-description">Choose how you want to receive notifications</p>
              
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <Mail size={20} />
                    <div>
                      <h4>Email Notifications</h4>
                      <p>Receive notifications via email</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" {...notificationSettings.register('emailNotifications')} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="toggle-item">
                  <div className="toggle-info">
                    <Smartphone size={20} />
                    <div>
                      <h4>Push Notifications</h4>
                      <p>Receive push notifications on your device</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" {...notificationSettings.register('pushNotifications')} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Notification Types</h3>
              <p className="section-description">Choose which notifications you want to receive</p>
              
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <div>
                      <h4>Weekly Digest</h4>
                      <p>Receive a weekly summary of activity</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" {...notificationSettings.register('weeklyDigest')} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="toggle-item">
                  <div className="toggle-info">
                    <div>
                      <h4>Marketing Emails</h4>
                      <p>Receive updates about new features and offers</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" {...notificationSettings.register('marketingEmails')} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="toggle-item">
                  <div className="toggle-info">
                    <div>
                      <h4>Order Alerts</h4>
                      <p>Get notified about new orders</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" {...notificationSettings.register('orderAlerts')} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="toggle-item">
                  <div className="toggle-info">
                    <div>
                      <h4>User Activity</h4>
                      <p>Get notified about user sign-ups</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" {...notificationSettings.register('userActivity')} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-save" disabled={isSaving}>
                {isSaving ? 'Saving...' : saved ? <><Check size={18} /> Saved!</> : <><Save size={18} /> Save Changes</>}
              </button>
            </div>
          </form>
        );
        
      case 'security':
        return (
          <form className="settings-form">
            <div className="form-section">
              <h3>Password</h3>
              <p className="section-description">Update your password regularly for security</p>
              
              <div className="form-group">
                <label>Current Password</label>
                <div className="input-with-icon">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Enter current password"
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label>New Password</label>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Enter new password"
                />
              </div>
              
              <div className="form-group">
                <label>Confirm New Password</label>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            
            <div className="form-section">
              <h3>Two-Factor Authentication</h3>
              <p className="section-description">Add an extra layer of security to your account</p>
              
              <button type="button" className="btn-outline">Enable 2FA</button>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-save">
                <Save size={18} /> Update Password
              </button>
            </div>
          </form>
        );
        
      case 'billing':
        return (
          <form className="settings-form">
            <div className="form-section">
              <h3>Current Plan</h3>
              <p className="section-description">Manage your subscription plan</p>
              
              <div className="plan-card">
                <div className="plan-info">
                  <h4>Pro Plan</h4>
                  <p>Everything you need to manage your business</p>
                </div>
                <div className="plan-price">
                  <span className="price">$49</span>
                  <span className="period">/month</span>
                </div>
              </div>
              
              <button type="button" className="btn-outline">Upgrade Plan</button>
            </div>
            
            <div className="form-section">
              <h3>Payment Method</h3>
              <p className="section-description">Manage your payment methods</p>
              
              <div className="payment-card">
                <CreditCard size={24} />
                <div className="payment-info">
                  <h4>•••• •••• •••• 4242</h4>
                  <p>Expires 12/2027</p>
                </div>
                <button type="button" className="btn-text">Edit</button>
              </div>
              
              <button type="button" className="btn-outline">Add Payment Method</button>
            </div>
          </form>
        );
        
      case 'appearance':
        return (
          <form className="settings-form">
            <div className="form-section">
              <h3>Theme</h3>
              <p className="section-description">Customize the look and feel</p>
              
              <div className="theme-options">
                <label className="theme-option active">
                  <div className="theme-preview light">
                    <div className="preview-sidebar"></div>
                    <div className="preview-content">
                      <div className="preview-header"></div>
                      <div className="preview-body"></div>
                    </div>
                  </div>
                  <span>Light</span>
                </label>
                
                <label className="theme-option">
                  <div className="theme-preview dark">
                    <div className="preview-sidebar"></div>
                    <div className="preview-content">
                      <div className="preview-header"></div>
                      <div className="preview-body"></div>
                    </div>
                  </div>
                  <span>Dark</span>
                </label>
                
                <label className="theme-option">
                  <div className="theme-preview system">
                    <div className="preview-sidebar"></div>
                    <div className="preview-content">
                      <div className="preview-header"></div>
                      <div className="preview-body"></div>
                    </div>
                  </div>
                  <span>System</span>
                </label>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Language</h3>
              <p className="section-description">Set your preferred language</p>
              
              <div className="form-group">
                <select defaultValue="en">
                  <option value="en">English (US)</option>
                  <option value="en-gb">English (UK)</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-save">
                <Save size={18} /> Save Preferences
              </button>
            </div>
          </form>
        );
        
      default:
        return null;
    }
  };

  return (
    <motion.main 
      className="settings-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="page-header glass"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="page-header-content">
          <h1>Settings</h1>
          <p>Manage your account preferences and configurations</p>
        </div>
      </motion.div>

      <div className="settings-container">
        <motion.div 
          className="settings-tabs glass"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        <motion.div 
          className="settings-content glass"
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </motion.main>
  );
};

export default Settings;