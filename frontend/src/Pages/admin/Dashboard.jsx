// Dashboard.jsx
import { useAuth } from '@context/AuthContext';
import DashboardSummary from '@pages/admin/DashboardSummary';
import SalesChart from '@pages/admin/SalesChart';
import '@style/Dashboard.css';
import axios from 'axios';
import { Coffee, Package, ShoppingBag, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import our new Sidebar component

function Dashboard() {
   const { admin } = useAuth();
   const [stats, setStats] = useState({
      totalOrders: 0,
      pendingOrders: 0,
      totalProducts: 0,
      totalUsers: 0,
      recentOrders: [],
      topProducts: [],
   });
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();
   const [chartPeriod, setChartPeriod] = useState('week');
   const [isCollapsed, setIsCollapsed] = useState(false);

   const handleClick = () => {
      navigate('/orders');
   };

   // Sales data
   const data = [
      { month: 'Jan', sales: 6500 },
      { month: 'Feb', sales: 7800 },
      { month: 'Mar', sales: 9200 },
      { month: 'Apr', sales: 8700 },
      { month: 'May', sales: 10500 },
      { month: 'Jun', sales: 11200 },
      { month: 'Jul', sales: 12500 },
      { month: 'Aug', sales: 13100 },
      { month: 'Sep', sales: 11800 },
      { month: 'Oct', sales: 12800 },
      { month: 'Nov', sales: 13500 },
      { month: 'Dec', sales: 12548 },
   ];

   const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
         return (
            <div className="dashboard-tooltip">
               <p className="dashboard-text-sm">{label}</p>
               <p className="dashboard-text-lg">${payload[0].value.toLocaleString()}</p>
            </div>
         );
      }
      return null;
   };

   const formatYAxis = (value) => `$${value.toLocaleString()}`;

   // Use useEffect for DOM manipulation instead of direct DOM queries
   useEffect(() => {
      const filterBtns = document.querySelectorAll('.dashboard-filter-btn');
      const handleClick = (event) => {
         filterBtns.forEach((b) => b.classList.remove('dashboard-active'));
         event.currentTarget.classList.add('dashboard-active');
      };

      filterBtns.forEach((btn) => {
         btn.addEventListener('click', handleClick);
      });

      // Cleanup event listeners
      return () => {
         filterBtns.forEach((btn) => {
            btn.removeEventListener('click', handleClick);
         });
      };
   }, []);

   useEffect(() => {
      fetchDashboardStats();
   }, []);

   const fetchDashboardStats = async () => {
      try {
         const response = await axios.get('/api/dashboard_stats.php');
         if (response.data.success) {
            setStats(response.data.stats);
         }
      } catch (error) {
         console.error('Error fetching dashboard stats:', error);
      } finally {
         setLoading(false);
      }
   };

   if (loading) {
      return (
         <div className="dashboard-loading">
            <div className="spinner"></div>
            <p>Loading dashboard...</p>
         </div>
      );
   }

   return (
      <div className={`content ${isCollapsed ? 'content-expanded' : ''}`}>
         <div className="dashboard-container">
            <div className="dashboard-header">
               <h1>Welcome back, {admin?.name}</h1>
               <p>Here's what's happening with your store today.</p>
            </div>

            {/* Quick Summary */}
            <DashboardSummary />

            {/* Stats Cards */}
            <div className="dashboard-stats">
               <div className="stat-card">
                  <div className="stat-icon orders">
                     <ShoppingBag size={24} />
                  </div>
                  <div className="stat-details">
                     <h3>Total Orders</h3>
                     <p className="stat-value">{stats.totalOrders}</p>
                     <span className="stat-label">All time orders</span>
                  </div>
               </div>

               <div className="stat-card">
                  <div className="stat-icon pending">
                     <Coffee size={24} />
                  </div>
                  <div className="stat-details">
                     <h3>Pending Orders</h3>
                     <p className="stat-value">{stats.pendingOrders}</p>
                     <span className="stat-label">Needs attention</span>
                  </div>
               </div>

               <div className="stat-card">
                  <div className="stat-icon products">
                     <Package size={24} />
                  </div>
                  <div className="stat-details">
                     <h3>Products</h3>
                     <p className="stat-value">{stats.totalProducts}</p>
                     <span className="stat-label">In stock</span>
                  </div>
               </div>

               <div className="stat-card">
                  <div className="stat-icon users">
                     <Users size={24} />
                  </div>
                  <div className="stat-details">
                     <h3>Users</h3>
                     <p className="stat-value">{stats.totalUsers}</p>
                     <span className="stat-label">Registered users</span>
                  </div>
               </div>
            </div>

            {/* Recent Orders */}
            <div className="dashboard-section">
               <div className="section-header">
                  <h2>Recent Orders</h2>
                  <Link to="/orders" className="view-all">
                     View All
                  </Link>
               </div>
               <div className="orders-table">
                  <table>
                     <thead>
                        <tr>
                           <th>Order ID</th>
                           <th>Customer</th>
                           <th>Products</th>
                           <th>Total</th>
                           <th>Status</th>
                        </tr>
                     </thead>
                     <tbody>
                        {stats.recentOrders.map((order) => (
                           <tr key={order.order_id}>
                              <td>#{order.order_number}</td>
                              <td>
                                 {order.first_name} {order.last_name}
                              </td>
                              <td>{order.items_count} items</td>
                              <td>₱{order.total_amount}</td>
                              <td>
                                 <span className={`status-badge ${order.status.toLowerCase()}`}>
                                    {order.status}
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Top Products */}
            <div className="dashboard-section">
               <div className="section-header">
                  <h2>Top Products</h2>
                  <Link to="/products" className="view-all">
                     View All
                  </Link>
               </div>
               <div className="products-grid">
                  {stats.topProducts.map((product) => (
                     <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <div className="product-info">
                           <h3>{product.name}</h3>
                           <p>₱{product.price}</p>
                           <span className="sales-count">{product.sales_count} sales</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Sales Chart */}
            <div className="dashboard-section">
               <div className="section-header">
                  <h2>Sales Overview</h2>
                  <select onChange={(e) => setChartPeriod(e.target.value)} value={chartPeriod}>
                     <option value="week">This Week</option>
                     <option value="month">This Month</option>
                     <option value="year">This Year</option>
                  </select>
               </div>
               <SalesChart period={chartPeriod} />
            </div>
         </div>
      </div>
   );
}

export default Dashboard;
