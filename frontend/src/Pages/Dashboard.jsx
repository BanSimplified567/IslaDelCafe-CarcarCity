import {
   Activity,
   CheckCircle,
   Clock,
   DollarSign,
   LogOut,
   Mail,
   Menu,
   MessageSquare,
   Package,
   Settings,
   Shield,
   ShoppingCart,
   Star,
   UserCheck,
   UserPlus,
   Users,
} from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import '../style/Dashboard.css';

const salesData = [
   { name: 'Mon', sales: 150 },
   { name: 'Tue', sales: 200 },
   { name: 'Wed', sales: 180 },
   { name: 'Thu', sales: 220 },
   { name: 'Fri', sales: 260 },
   { name: 'Sat', sales: 300 },
   { name: 'Sun', sales: 280 },
];

function Dashboard() {
   // State for all metrics
   const [metrics, setMetrics] = useState({
      orders: 120,
      sales: 5400,
      inventory: 320,
      pending: 45,
      completed: 75,
      totalOrders: 320,
      productsAdded: 28,
      userAccounts: 850,
      adminAccounts: 12,
      employeeAccounts: 35,
      newMessages: 17,
      rating: 4.8,
      earnings: 32500,
   });

   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

   const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };

   return (
      <div className="dashboard-container">
         {/* Sidebar */}
         <aside
            className={`dashboard-sidebar ${
               isSidebarOpen ? 'dashboard-sidebar-open' : 'dashboard-sidebar-closed'
            }`}
         >
            <div className="dashboard-sidebar-header">
               {isSidebarOpen && <h1 className="dashboard-sidebar-title">Admin Panel</h1>}
               <button onClick={toggleSidebar} className="dashboard-sidebar-toggle">
                  <Menu size={20} />
               </button>
            </div>

            <nav className="dashboard-nav">
               <ul className="dashboard-nav-list">
                  <NavItem
                     icon={<Activity size={20} />}
                     label="Dashboard"
                     isOpen={isSidebarOpen}
                     isActive={true}
                  />
                  <NavItem icon={<Package size={20} />} label="Products" isOpen={isSidebarOpen} />
                  <NavItem
                     icon={<ShoppingCart size={20} />}
                     label="Orders"
                     isOpen={isSidebarOpen}
                  />
                  <NavItem icon={<Package size={20} />} label="Inventory" isOpen={isSidebarOpen} />
                  <NavItem icon={<Activity size={20} />} label="Sales" isOpen={isSidebarOpen} />
                  <NavItem icon={<Users size={20} />} label="Employees" isOpen={isSidebarOpen} />
                  <NavItem
                     icon={<MessageSquare size={20} />}
                     label="Messages"
                     isOpen={isSidebarOpen}
                  />
                  <NavItem icon={<Settings size={20} />} label="Admin" isOpen={isSidebarOpen} />
                  <NavItem icon={<Users size={20} />} label="Users" isOpen={isSidebarOpen} />
                  <NavItem icon={<LogOut size={20} />} label="Logout" isOpen={isSidebarOpen} />
               </ul>
            </nav>
         </aside>

         {/* Main Content */}
         <main className="dashboard-main-content">
            <h1 className="dashboard-main-title">Dashboard Overview</h1>

            {/* Primary Metrics */}
            <div className="dashboard-primary-metrics">
               <MetricCard
                  title="Total Earnings"
                  value={`$${metrics.earnings.toLocaleString()}`}
                  icon={<DollarSign size={24} />}
                  color="bg-emerald-500"
               />
               <MetricCard
                  title="Total Orders"
                  value={metrics.totalOrders}
                  icon={<ShoppingCart size={24} />}
                  color="bg-blue-500"
               />
               <MetricCard
                  title="Customer Rating"
                  value={`${metrics.rating}/5`}
                  icon={<Star size={24} />}
                  color="bg-yellow-500"
               />
            </div>

            {/* Secondary Metrics */}
            <div className="dashboard-secondary-metrics">
               <MetricCard
                  title="Pending Orders"
                  value={metrics.pending}
                  icon={<Clock size={20} />}
                  color="bg-orange-500"
                  size="small"
               />
               <MetricCard
                  title="Completed Orders"
                  value={metrics.completed}
                  icon={<CheckCircle size={20} />}
                  color="bg-green-500"
                  size="small"
               />
               <MetricCard
                  title="Products Added"
                  value={metrics.productsAdded}
                  icon={<Package size={20} />}
                  color="bg-purple-500"
                  size="small"
               />
               <MetricCard
                  title="New Messages"
                  value={metrics.newMessages}
                  icon={<Mail size={20} />}
                  color="bg-red-500"
                  size="small"
               />
            </div>

            {/* User Accounts Metrics */}
            <div className="dashboard-user-metrics">
               <MetricCard
                  title="User Accounts"
                  value={metrics.userAccounts}
                  icon={<UserPlus size={20} />}
                  color="bg-indigo-500"
                  size="small"
               />
               <MetricCard
                  title="Admin Accounts"
                  value={metrics.adminAccounts}
                  icon={<Shield size={20} />}
                  color="bg-gray-700"
                  size="small"
               />
               <MetricCard
                  title="Employee Accounts"
                  value={metrics.employeeAccounts}
                  icon={<UserCheck size={20} />}
                  color="bg-teal-500"
                  size="small"
               />
            </div>

            {/* Charts */}
            <div className="dashboard-chart-container">
               <h2 className="dashboard-chart-title">Weekly Sales</h2>
               <ResponsiveContainer width="100%" height={250}>

                  <BarChart data={salesData}>

                     <XAxis dataKey="name" /> <YAxis /> <Tooltip />
                     <Bar dataKey="sales" fill="#4CAF50" />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </main>
      </div>
   );
}

// Navigation Item Component
const NavItem = ({ icon, label, isOpen, isActive = false }) => {
   return (
      <li className="dashboard-nav-item">
         <a
            href="#"
            className={`dashboard-nav-link ${isActive ? 'dashboard-nav-link-active' : ''}`}
         >
            <span className="dashboard-nav-icon">{icon}</span>
            {isOpen && <span className="dashboard-nav-label">{label}</span>}
         </a>
      </li>
   );
};

// Metric Card Component
const MetricCard = ({ title, value, icon, color, size = 'regular' }) => {
   return (
      <div className="dashboard-metric-card">
         <div className={`dashboard-metric-card-content${size === 'small' ? '-small' : ''}`}>
            <div className="dashboard-metric-card-flex">
               <div
                  className={`dashboard-metric-card-icon-container${
                     size === 'small' ? '-small' : ''
                  }`}
                  style={{ backgroundColor: color.replace('bg-', '') }}
               >
                  {icon}
               </div>
               <div className="dashboard-metric-card-text">
                  <h3 className="dashboard-metric-card-title">{title}</h3>
                  <p className={`dashboard-metric-card-value${size === 'small' ? '-small' : ''}`}>
                     {value}
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;

