import axios from 'axios';
import {
   BarElement,
   CategoryScale,
   Chart as ChartJS,
   Legend,
   LinearScale,
   Title,
   Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SalesChart({ period = 'week' }) {
   const [salesData, setSalesData] = useState({
      labels: [],
      datasets: [],
   });
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetchSalesData(period);
   }, [period]);

   const fetchSalesData = async (timePeriod) => {
      try {
         const response = await axios.get(`/api/sales_stats.php?period=${timePeriod}`);
         if (response.data.success) {
            formatChartData(response.data.sales);
         }
      } catch (error) {
         console.error('Error fetching sales data:', error);
      } finally {
         setLoading(false);
      }
   };

   const formatChartData = (data) => {
      setSalesData({
         labels: data.map((item) => item.date),
         datasets: [
            {
               label: 'Sales',
               data: data.map((item) => item.total),
               backgroundColor: 'rgba(111, 78, 55, 0.5)',
               borderColor: 'rgba(111, 78, 55, 1)',
               borderWidth: 1,
            },
         ],
      });
   };

   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: 'top',
         },
         title: {
            display: true,
            text: 'Sales Overview',
         },
      },
      scales: {
         y: {
            beginAtZero: true,
            ticks: {
               callback: function (value) {
                  return '₱' + value;
               },
            },
         },
      },
   };

   if (loading) {
      return <div className="chart-loading">Loading sales data...</div>;
   }

   return (
      <div className="sales-chart-container">
         <Bar data={salesData} options={options} />
      </div>
   );
}

export default SalesChart;
