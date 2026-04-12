import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, User, Settings, CreditCard, Bell, 
  LogIn, TrendingUp, AlertCircle, CheckCircle 
} from 'lucide-react';
import './Activity.css';

const activities = [
  {
    id: 1,
    type: 'order',
    title: 'New order placed',
    description: 'Order #12845 - Pro License purchased by John Anderson',
    time: '2 minutes ago',
    icon: ShoppingCart,
    color: 'primary'
  },
  {
    id: 2,
    type: 'user',
    title: 'New user registered',
    description: 'Sarah Mitchell joined the platform',
    time: '15 minutes ago',
    icon: User,
    color: 'success'
  },
  {
    id: 3,
    type: 'settings',
    title: 'Settings updated',
    description: 'Email notification preferences changed',
    time: '1 hour ago',
    icon: Settings,
    color: 'info'
  },
  {
    id: 4,
    type: 'payment',
    title: 'Payment received',
    description: '$499.00 received from Enterprise plan subscription',
    time: '2 hours ago',
    icon: CreditCard,
    color: 'success'
  },
  {
    id: 5,
    type: 'alert',
    title: 'System alert',
    description: 'High traffic detected on server cluster us-east-1',
    time: '3 hours ago',
    icon: AlertCircle,
    color: 'warning'
  },
  {
    id: 6,
    type: 'login',
    title: 'User login',
    description: 'Michael Chen logged in from Chrome/Windows',
    time: '4 hours ago',
    icon: LogIn,
    color: 'info'
  },
  {
    id: 7,
    type: 'order',
    title: 'Order completed',
    description: 'Order #12840 - Premium Bundle completed successfully',
    time: '5 hours ago',
    icon: CheckCircle,
    color: 'success'
  },
  {
    id: 8,
    type: 'analytics',
    title: 'Milestone reached',
    description: 'Monthly revenue target of $50,000 achieved',
    time: '6 hours ago',
    icon: TrendingUp,
    color: 'primary'
  },
  {
    id: 9,
    type: 'notification',
    title: 'Notification sent',
    description: 'Push notification sent to 1,247 subscribers',
    time: '8 hours ago',
    icon: Bell,
    color: 'info'
  },
];

const getActivityIcon = (activity) => {
  const Icon = activity.icon;
  return <Icon size={18} />;
};

const Activity = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.main 
      className="activity-page"
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
          <h1>Activity</h1>
          <p>Track all recent activities and events across your platform</p>
        </div>
        <div className="activity-filters">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Orders</button>
          <button className="filter-btn">Users</button>
          <button className="filter-btn">System</button>
        </div>
      </motion.div>

      <motion.div 
        className="activity-timeline glass"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {activities.map((activity) => (
          <motion.div 
            key={activity.id} 
            className="activity-item"
            variants={itemVariants}
          >
            <div className={`activity-icon ${activity.color}`}>
              {getActivityIcon(activity)}
            </div>
            <div className="activity-content">
              <div className="activity-header">
                <h4>{activity.title}</h4>
                <span className="activity-time">{activity.time}</span>
              </div>
              <p>{activity.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.main>
  );
};

export default Activity;