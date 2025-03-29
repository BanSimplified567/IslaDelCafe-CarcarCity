import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function OrderManagement() {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(true);
   const [filter, setFilter] = useState('all');

   const fetchOrders = async () => {
      try {
         const response = await axios.get('/api/fetchorders.php');
         if (response.data.success) {
            setOrders(response.data.orders);
         }
      } catch (error) {
         console.error('Error fetching orders:', error);
         Swal.fire('Error', 'Failed to fetch orders', 'error');
      } finally {
         setLoading(false);
      }
   };

   const handleStatusUpdate = async (orderId, newStatus) => {
      try {
         const result = await Swal.fire({
            title: 'Update Order Status',
            text: `Change order status to ${newStatus}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!',
         });

         if (result.isConfirmed) {
            const response = await axios.post('/api/updateorderstatus.php', {
               orderId,
               status: newStatus,
            });

            if (response.data.success) {
               Swal.fire('Updated!', 'Order status has been updated.', 'success');
               fetchOrders(); // Refresh orders list
            }
         }
      } catch (error) {
         console.error('Error updating order status:', error);
         Swal.fire('Error', 'Failed to update order status', 'error');
      }
   };

   useEffect(() => {
      fetchOrders();
   }, []);

   const filteredOrders = orders.filter((order) => {
      if (filter === 'all') return true;
      return order.status.toLowerCase() === filter;
   });

   const getStatusColor = (status) => {
      const colors = {
         pending: 'bg-yellow-100 text-yellow-800',
         processing: 'bg-blue-100 text-blue-800',
         completed: 'bg-green-100 text-green-800',
         cancelled: 'bg-red-100 text-red-800',
      };
      return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
   };

   return (
      <div className="order-management-container p-6">
         <div className="order-management-header">
            <h1 className="text-2xl font-bold mb-6">Order Management</h1>

            <div className="filter-controls mb-6">
               <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="filter-select"
               >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
               </select>
            </div>
         </div>

         {loading ? (
            <div className="loading-spinner">Loading orders...</div>
         ) : (
            <div className="orders-grid">
               {filteredOrders.map((order) => (
                  <div key={order.order_id} className="order-card">
                     <div className="order-header">
                        <h3 className="order-number">Order #{order.order_number}</h3>
                        <span className={`status-badge ${getStatusColor(order.status)}`}>
                           {order.status}
                        </span>
                     </div>

                     <div className="order-details">
                        <div className="customer-info">
                           <p>
                              <strong>Customer:</strong> {order.first_name} {order.last_name}
                           </p>
                           <p>
                              <strong>Email:</strong> {order.email}
                           </p>
                           <p>
                              <strong>Phone:</strong> {order.phone}
                           </p>
                           <p>
                              <strong>Address:</strong> {order.address}, {order.city}{' '}
                              {order.zipcode}
                           </p>
                        </div>

                        <div className="order-items">
                           <h4>Items:</h4>
                           <ul>
                              {order.items.map((item, index) => (
                                 <li key={index}>
                                    {item.quantity}x {item.product_name} - ₱{item.subtotal}
                                 </li>
                              ))}
                           </ul>
                        </div>

                        <div className="order-total">
                           <p>
                              <strong>Total Amount:</strong> ₱{order.total_amount}
                           </p>
                           <p>
                              <strong>Payment Method:</strong> {order.payment_method}
                           </p>
                           <p>
                              <strong>Order Date:</strong>{' '}
                              {new Date(order.order_date).toLocaleString()}
                           </p>
                        </div>
                     </div>

                     <div className="order-actions">
                        {order.status === 'Pending' && (
                           <>
                              <button
                                 onClick={() => handleStatusUpdate(order.order_id, 'Processing')}
                                 className="process-button"
                              >
                                 Process Order
                              </button>
                              <button
                                 onClick={() => handleStatusUpdate(order.order_id, 'Cancelled')}
                                 className="cancel-button"
                              >
                                 Cancel Order
                              </button>
                           </>
                        )}
                        {order.status === 'Processing' && (
                           <button
                              onClick={() => handleStatusUpdate(order.order_id, 'Completed')}
                              className="complete-button"
                           >
                              Complete Order
                           </button>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}

export default OrderManagement;
