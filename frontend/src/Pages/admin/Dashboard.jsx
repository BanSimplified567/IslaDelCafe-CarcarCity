// Dashboard.jsx
import { ShoppingBag } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
   Area,
   CartesianGrid,
   Line,
   LineChart,
   ResponsiveContainer,
   Tooltip,
   XAxis,
   YAxis,
} from 'recharts';
import '../../style/Dashboard.css';

// Import our new Sidebar component

function Dashboard() {
   const navigate = useNavigate();

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

   return (
      <div>
         <div className="dashboard-main-content">
            <div className="dashboard-header">
               <div className="dashboard-page-title">
                  <h1>Dashboard</h1>
                  <div className="dashboard-page-subtitle">
                     Welcome back, John! Here's what's happening today.
                  </div>
               </div>

               <div className="dashboard-header-actions">
                  <div className="dashboard-search-box">
                     <i>🔍</i>
                     <input type="text" placeholder="Search..." />
                  </div>

                  <div className="dashboard-notification-bell">
                     <div className="dashboard-icon">🔔</div>
                     <div className="dashboard-notification-dot"></div>
                  </div>

                  <div className="dashboard-user-profile">
                     <div className="dashboard-avatar">JD</div>
                     <div className="dashboard-user-info">
                        <div className="dashboard-name">John Doe</div>
                        <div className="dashboard-role">Manager</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="dashboard-stats-cards">
               <div className="dashboard-stat-card">
                  <div className="dashboard-stat-card-header">
                     <div>
                        <div className="dashboard-stat-card-title">Total Sales</div>
                        <div className="dashboard-stat-card-value">$12,548</div>
                     </div>
                     <div className="dashboard-stat-card-icon dashboard-sales">💰</div>
                  </div>
                  <div className="dashboard-stat-card-trend dashboard-trend-up">
                     <span>▲ 12.5%</span> vs last month
                  </div>
               </div>

               <div className="dashboard-stat-card">
                  <div className="dashboard-stat-card-header">
                     <div>
                        <div className="dashboard-stat-card-title">Total Orders</div>
                        <div className="dashboard-stat-card-value">584</div>
                     </div>
                     <div className="dashboard-stat-card-icon dashboard-orders">🛒</div>
                  </div>
                  <div className="dashboard-stat-card-trend dashboard-trend-up">
                     <span>▲ 8.2%</span> vs last month
                  </div>
               </div>

               <div className="dashboard-stat-card">
                  <div className="dashboard-stat-card-header">
                     <div>
                        <div className="dashboard-stat-card-title">New Customers</div>
                        <div className="dashboard-stat-card-value">129</div>
                     </div>
                     <div className="dashboard-stat-card-icon dashboard-customers">👥</div>
                  </div>
                  <div className="dashboard-stat-card-trend dashboard-trend-up">
                     <span>▲ 5.7%</span> vs last month
                  </div>
               </div>

               <div className="dashboard-stat-card">
                  <div className="dashboard-stat-card-header">
                     <div>
                        <div className="dashboard-stat-card-title">Avg. Order Value</div>
                        <div className="dashboard-stat-card-value">$21.50</div>
                     </div>
                     <div className="dashboard-stat-card-icon dashboard-revenue">📈</div>
                  </div>
                  <div className="dashboard-stat-card-trend dashboard-trend-down">
                     <span>▼ 2.1%</span> vs last month
                  </div>
               </div>
            </div>

            <div className="dashboard-grid">
               <div className="dashboard-sales-chart">
                  <div className="dashboard-card-header">
                     <div className="dashboard-card-title">Sales Overview</div>
                     <div className="dashboard-time-filter">
                        <button className="dashboard-filter-btn">Day</button>
                        <button className="dashboard-filter-btn">Week</button>
                        <button className="dashboard-filter-btn dashboard-active">Month</button>
                        <button className="dashboard-filter-btn">Year</button>
                     </div>
                  </div>
                  <div className="dashboard-chart-container">
                     <div className="dashboard-bg-white">
                        <div className="dashboard-h-64">
                           <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                 data={data}
                                 margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                              >
                                 <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="#E0E6ED"
                                 />
                                 <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6C757D' }}
                                 />
                                 <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6C757D' }}
                                    tickFormatter={formatYAxis}
                                 />
                                 <Tooltip content={<CustomTooltip />} />
                                 <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.1} />
                                       <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
                                    </linearGradient>
                                 </defs>
                                 <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#FF6B35"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                 />
                                 <Line
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#FF6B35"
                                    strokeWidth={2}
                                    dot={{
                                       stroke: '#FF6B35',
                                       strokeWidth: 2,
                                       r: 4,
                                       fill: '#FF6B35',
                                    }}
                                    activeDot={{
                                       stroke: '#fff',
                                       strokeWidth: 2,
                                       r: 6,
                                       fill: '#FF6B35',
                                    }}
                                 />
                              </LineChart>
                           </ResponsiveContainer>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="dashboard-popular-items">
                  <div className="dashboard-card-header">
                     <div className="dashboard-card-title">Popular Items</div>
                  </div>

                  <div className="dashboard-item-card">
                     <div className="dashboard-item-image">🍔</div>
                     <div className="dashboard-item-details">
                        <div className="dashboard-item-name">Double Cheeseburger</div>
                        <div className="dashboard-item-category">Burgers</div>
                        <div className="dashboard-item-price">$8.99</div>
                     </div>
                     <div className="dashboard-item-sales">
                        <div className="dashboard-sales-count">142</div>
                        <div>Orders</div>
                     </div>
                  </div>

                  <div className="dashboard-item-card">
                     <div className="dashboard-item-image">🍕</div>
                     <div className="dashboard-item-details">
                        <div className="dashboard-item-name">Pepperoni Pizza</div>
                        <div className="dashboard-item-category">Pizza</div>
                        <div className="dashboard-item-price">$12.99</div>
                     </div>
                     <div className="dashboard-item-sales">
                        <div className="dashboard-sales-count">98</div>
                        <div>Orders</div>
                     </div>
                  </div>

                  <div className="dashboard-item-card">
                     <div className="dashboard-item-image">🍟</div>
                     <div className="dashboard-item-details">
                        <div className="dashboard-item-name">Loaded Fries</div>
                        <div className="dashboard-item-category">Sides</div>
                        <div className="dashboard-item-price">$5.49</div>
                     </div>
                     <div className="dashboard-item-sales">
                        <div className="dashboard-sales-count">76</div>
                        <div>Orders</div>
                     </div>
                  </div>
               </div>

               <div className="dashboard-recent-orders">
                  <div className="dashboard-card-header">
                     <div className="dashboard-card-title">Recent Orders</div>
                  </div>

                  <table className="dashboard-orders-table">
                     <thead>
                        <tr>
                           <th>Order ID</th>
                           <th>Customer</th>
                           <th>Items</th>
                           <th>Date</th>
                           <th>Total</th>
                           <th>Status</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td className="dashboard-order-id">#FB2854</td>
                           <td>Emily Johnson</td>
                           <td>Double Cheeseburger, Fries (L), Soda</td>
                           <td>Mar 8, 2025 - 12:42 PM</td>
                           <td>$15.97</td>
                           <td>
                              <span className="dashboard-order-status dashboard-status-completed">
                                 Completed
                              </span>
                           </td>
                        </tr>
                        <tr>
                           <td className="dashboard-order-id">#FB2853</td>
                           <td>Michael Smith</td>
                           <td>Pepperoni Pizza, Buffalo Wings, Garlic Bread</td>
                           <td>Mar 8, 2025 - 12:35 PM</td>
                           <td>$24.98</td>
                           <td>
                              <span className="dashboard-order-status dashboard-status-preparing">
                                 Preparing
                              </span>
                           </td>
                        </tr>
                        <tr>
                           <td className="dashboard-order-id">#FB2852</td>
                           <td>Sarah Williams</td>
                           <td>Caesar Salad, Grilled Chicken Wrap</td>
                           <td>Mar 8, 2025 - 12:28 PM</td>
                           <td>$16.48</td>
                           <td>
                              <span className="dashboard-order-status dashboard-status-completed">
                                 Completed
                              </span>
                           </td>
                        </tr>
                        <tr>
                           <td className="dashboard-order-id">#FB2851</td>
                           <td>David Brown</td>
                           <td>Fish & Chips, Lemonade</td>
                           <td>Mar 8, 2025 - 12:15 PM</td>
                           <td>$14.49</td>
                           <td>
                              <span className="dashboard-order-status dashboard-status-cancelled">
                                 Cancelled
                              </span>
                           </td>
                        </tr>
                        <tr>
                           <td className="dashboard-order-id">#FB2850</td>
                           <td>Jessica Davis</td>
                           <td>Veggie Burger, Sweet Potato Fries, Milkshake</td>
                           <td>Mar 8, 2025 - 12:03 PM</td>
                           <td>$18.47</td>
                           <td>
                              <span className="dashboard-order-status dashboard-status-completed">
                                 Completed
                              </span>
                           </td>
                        </tr>
                     </tbody>
                  </table>

                  <div className="dashboard-view-more">
                     <button onClick={handleClick} className="dashboard-flex">
                        <ShoppingBag size={18} />
                        <span>View All Orders</span>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Dashboard;
