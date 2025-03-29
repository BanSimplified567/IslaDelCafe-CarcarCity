import axios from 'axios';
import { useEffect, useState } from 'react';

function DashboardSummary() {
   const [summary, setSummary] = useState({
      todaySales: 0,
      weekSales: 0,
      monthSales: 0,
      averageOrderValue: 0,
   });
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      fetchSummary();
   }, []);

   const fetchSummary = async () => {
      try {
         setError(null);
         const response = await axios.get('/api/dashboard_summary.php');
         if (response.data.success) {
            const parsedSummary = {
               todaySales: parseFloat(response.data.summary.todaySales) || 0,
               weekSales: parseFloat(response.data.summary.weekSales) || 0,
               monthSales: parseFloat(response.data.summary.monthSales) || 0,
               averageOrderValue: parseFloat(response.data.summary.averageOrderValue) || 0,
            };
            setSummary(parsedSummary);
         } else {
            setError('Failed to fetch summary data');
         }
      } catch (error) {
         setError(error.message || 'Error fetching summary');
         console.error('Error fetching summary:', error);
      } finally {
         setLoading(false);
      }
   };

   if (loading) {
      return <div className="summary-loading">Loading summary...</div>;
   }

   if (error) {
      return <div className="summary-error">Error: {error}</div>;
   }

   return (
      <div className="dashboard-summary">
         <div className="summary-card">
            <h3>Today's Sales</h3>
            <p className="amount">₱{summary.todaySales.toFixed(2)}</p>
         </div>

         <div className="summary-card">
            <h3>This Week</h3>
            <p className="amount">₱{summary.weekSales.toFixed(2)}</p>
         </div>

         <div className="summary-card">
            <h3>This Month</h3>
            <p className="amount">₱{summary.monthSales.toFixed(2)}</p>
         </div>

         <div className="summary-card">
            <h3>Average Order</h3>
            <p className="amount">₱{summary.averageOrderValue.toFixed(2)}</p>
         </div>
      </div>
   );
}

export default DashboardSummary;
