import React from 'react';
import StatCard from './StatCard';
import { Users, DollarSign, ShoppingBag, Activity } from 'lucide-react';
import './Dashboard.css';

const DashboardContent = () => {
    return (
        <main className="dashboard-content">
            <div className="welcome-banner glass">
                <div>
                    <h1>Welcome, Admin! 👋</h1>
                    <p>Here's what's happening with your projects today.</p>
                </div>
                <button className="btn-primary">View Reports</button>
            </div>
            <div className="stats-grid">
                <StatCard
                    title="Total Revenue"
                    value="$54,230"
                    trend="up"
                    trendValue="12%"
                    icon={DollarSign}
                    color="primary" // We'll need to define this utility or use inline style for bg
                />
                <StatCard
                    title="Total Users"
                    value="2,430"
                    trend="up"
                    trendValue="8.1%"
                    icon={Users}
                    color="success" // need to define
                />
                <StatCard
                    title="New Orders"
                    value="1,240"
                    trend="down"
                    trendValue="3.2%"
                    icon={ShoppingBag}
                    color="warning" // need to define
                />
                <StatCard
                    title="Activity"
                    value="18,300"
                    trend="up"
                    trendValue="5.4%"
                    icon={Activity}
                    color="info" // need to define
                />
            </div>

            <div className="charts-grid">
                <div className="chart-card glass large">
                    <h3>Revenue Overview</h3>
                    <div className="chart-placeholder">
                        {/* Logic for a chart would go here, using CSS/SVG or a library */}
                        <div className="bars">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="bar" style={{
                                    height: `${Math.random() * 80 + 20}%`,
                                    background: 'var(--color-primary)', // Solid professional color
                                    opacity: 0.7 + (Math.random() * 0.3) // Variable opacity for depth
                                }}></div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="chart-card glass small">
                    <h3>Traffic Source</h3>
                    <div className="pie-placeholder">
                        <div className="pie-segment" style={{
                            // Simple clean gradient or solid colors
                            background: 'conic-gradient(var(--color-primary) 0% 65%, var(--color-info) 65% 90%, var(--color-text-muted) 90% 100%)'
                        }}></div>
                    </div>
                </div>
            </div>

            <div className="recent-orders glass">
                <h3>Recent Orders</h3>
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#12345</td>
                                <td>Pro License</td>
                                <td>John Doe</td>
                                <td><span className="status success">Completed</span></td>
                                <td>$120.00</td>
                            </tr>
                            <tr>
                                <td>#12346</td>
                                <td>Basic Plan</td>
                                <td>Jane Smith</td>
                                <td><span className="status pending">Pending</span></td>
                                <td>$49.00</td>
                            </tr>
                            <tr>
                                <td>#12347</td>
                                <td>Premium Plan</td>
                                <td>Mike Johnson</td>
                                <td><span className="status error">Failed</span></td>
                                <td>$199.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main >
    );
};

export default DashboardContent;
