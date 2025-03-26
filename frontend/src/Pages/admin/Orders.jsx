import axios from 'axios';
import { useEffect, useState } from 'react';

function Orders({ userId }) {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchOrders = async () => {
         try {
            const response = await axios.get(`/api/fetchorders.php?user_id=${userId}`);
            setOrders(response.data.orders || []);
         } catch (err) {
            setError('Failed to fetch orders.', err);
         } finally {
            setLoading(false);
         }
      };

      fetchOrders();
   }, [userId]);

   if (loading) return <div className="text-center py-6 text-gray-500">Loading orders...</div>;
   if (error) return <div className="text-center py-6 text-red-500">{error}</div>;
   if (orders.length === 0)
      return <div className="text-center py-6 text-gray-400">No orders found.</div>;

   return (
      <div className="overflow-x-auto px-4">
         <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
         <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
               <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Qty</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
               </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
               {orders.map((order) => (
                  <tr key={order.order_id} className="border-t hover:bg-gray-50">
                     <td className="px-4 py-3 text-center">{order.order_id}</td>
                     <td className="px-4 py-3">{order.product_name}</td>
                     <td className="px-4 py-3 text-center">
                        ₱{parseFloat(order.price).toFixed(2)}
                     </td>
                     <td className="px-4 py-3 text-center">{order.quantity}</td>
                     <td className="px-4 py-3 text-center">
                        ₱{parseFloat(order.total).toFixed(2)}
                     </td>
                     <td className="px-4 py-3 text-center">{order.status}</td>
                     <td className="px-4 py-3 text-center">{order.order_date}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default Orders;
