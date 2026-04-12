import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import StatCard from './StatCard';
import { Users, DollarSign, ShoppingBag, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import './Dashboard.css';

const revenueData = [
  { name: 'Jan', revenue: 4200, orders: 280 },
  { name: 'Feb', revenue: 3800, orders: 240 },
  { name: 'Mar', revenue: 5100, orders: 320 },
  { name: 'Apr', revenue: 4600, orders: 290 },
  { name: 'May', revenue: 5800, orders: 380 },
  { name: 'Jun', revenue: 6200, orders: 410 },
  { name: 'Jul', revenue: 5400, orders: 360 },
  { name: 'Aug', revenue: 7100, orders: 480 },
  { name: 'Sep', revenue: 6800, orders: 440 },
  { name: 'Oct', revenue: 7900, orders: 520 },
  { name: 'Nov', revenue: 8500, orders: 580 },
  { name: 'Dec', revenue: 9200, orders: 640 },
];

const trafficData = [
  { name: 'Direct', value: 35, color: '#3b82f6' },
  { name: 'Organic', value: 28, color: '#10b981' },
  { name: 'Referral', value: 22, color: '#f59e0b' },
  { name: 'Social', value: 15, color: '#8b5cf6' },
];

const recentOrders = [
  { id: '#12845', product: 'Pro License', customer: 'John Anderson', status: 'completed', amount: 199.00, date: '2026-04-12' },
  { id: '#12846', product: 'Enterprise', customer: 'Sarah Mitchell', status: 'pending', amount: 499.00, date: '2026-04-12' },
  { id: '#12847', product: 'Basic Plan', customer: 'Michael Chen', status: 'processing', amount: 79.00, date: '2026-04-11' },
  { id: '#12848', product: 'Premium Bundle', customer: 'Emily Davis', status: 'completed', amount: 299.00, date: '2026-04-11' },
  { id: '#12849', product: 'Team License', customer: 'Robert Wilson', status: 'completed', amount: 899.00, date: '2026-04-10' },
  { id: '#12850', product: 'Pro License', customer: 'Lisa Thompson', status: 'failed', amount: 199.00, date: '2026-04-10' },
];

const stats = [
  { title: 'Total Revenue', value: '$54,230', trend: 'up', trendValue: '12.5%', icon: DollarSign, color: 'primary', subtitle: 'vs last month' },
  { title: 'Active Users', value: '2,843', trend: 'up', trendValue: '8.2%', icon: Users, color: 'success', subtitle: 'vs last month' },
  { title: 'New Orders', value: '1,247', trend: 'down', trendValue: '3.1%', icon: ShoppingBag, color: 'warning', subtitle: 'vs last month' },
  { title: 'Conversion', value: '18.3%', trend: 'up', trendValue: '5.4%', icon: Activity, color: 'info', subtitle: 'vs last month' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        <p className="tooltip-value" style={{ color: payload[0].payload.color || '#3b82f6' }}>
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const DashboardContent = () => {
  return (
    <motion.main 
      className="dashboard-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="welcome-banner glass"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="welcome-info">
          <h1>Welcome back, Admin 👋</h1>
          <p>Here's what's happening with your projects today. You have 3 pending approvals.</p>
        </div>
        <button className="btn-primary">View Reports</button>
      </motion.div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="charts-grid">
        <motion.div 
          className="chart-card glass"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="chart-header">
            <h3>Revenue Overview</h3>
            <span className="chart-period">Last 12 months</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#revenueGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          className="chart-card glass"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <div className="chart-header">
            <h3>Traffic Sources</h3>
            <span className="chart-period">This month</span>
          </div>
          <div className="chart-container donut-container">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Traffic']}
                  contentStyle={{ 
                    background: 'var(--color-bg-surface)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-md)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-legend">
              {trafficData.map((item, index) => (
                <div key={index} className="legend-item">
                  <span className="legend-dot" style={{ background: item.color }}></span>
                  <span className="legend-label">{item.name}</span>
                  <span className="legend-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="recent-orders glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="section-header">
          <h3>Recent Orders</h3>
          <button className="btn-link">View All</button>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td className="order-product">{order.product}</td>
                  <td className="order-customer">{order.customer}</td>
                  <td className="order-date">{order.date}</td>
                  <td>
                    <span className={`status ${order.status}`}>
                      {order.status === 'completed' && <TrendingUp size={12} />}
                      {order.status === 'pending' && <span className="status-dot pending"></span>}
                      {order.status === 'processing' && <span className="status-dot processing"></span>}
                      {order.status === 'failed' && <TrendingDown size={12} />}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="order-amount">${order.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.main>
  );
};

export default DashboardContent;