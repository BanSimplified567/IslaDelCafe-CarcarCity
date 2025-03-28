import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function Orders() {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [selectedOrder, setSelectedOrder] = useState(null);
   const [pagination, setPagination] = useState({
      currentPage: 1,
      ordersPerPage: 10,
   });

   useEffect(() => {
      fetchOrders();
   }, [pagination.currentPage]);

const fetchOrders = async () => {
   try {
      setLoading(true);
      const response = await axios.get('/api/fetchorders.php', {
         params: {
            page: pagination.currentPage,
            limit: pagination.ordersPerPage,
         },
      });

      if (response.data.success) {
         const uniqueOrdersMap = new Map();

         // Deduplicate orders based on order_id
         response.data.orders.forEach((order) => {
            if (!uniqueOrdersMap.has(order.order_id)) {
               uniqueOrdersMap.set(order.order_id, order);
            }
         });

         const uniqueOrders = Array.from(uniqueOrdersMap.values());

         setOrders(uniqueOrders);
         setPagination((prev) => ({
            ...prev,
            totalOrders: response.data.total_orders,
         }));
      }
   } catch (err) {
      setError('Failed to fetch orders: ' + err.message);
      Swal.fire({
         icon: 'error',
         title: 'Fetch Error',
         text: 'Unable to load orders. Please try again.',
      });
   } finally {
      setLoading(false);
   }
};


   const updateOrderStatus = async (orderId, newStatus) => {
      try {
         const result = await Swal.fire({
            title: 'Confirm Status Update',
            text: `Are you sure you want to change the order status to ${newStatus}?`,
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
               await fetchOrders();
               Swal.fire({
                  icon: 'success',
                  title: 'Status Updated',
                  text: 'Order status has been updated successfully',
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
               });
            }
         }
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'Failed to update order status',
         });
      }
   };

   const viewOrderDetails = (order) => {
      setSelectedOrder(order);
   };

   const handlePageChange = (newPage) => {
      setPagination((prev) => ({
         ...prev,
         currentPage: newPage,
      }));
   };

   const renderStatusBadge = (status) => {
      const statusColors = {
         Pending: 'bg-yellow-100 text-yellow-800',
         Processing: 'bg-blue-100 text-blue-800',
         Completed: 'bg-green-100 text-green-800',
         Cancelled: 'bg-red-100 text-red-800',
      };

      return (
         <span className={`px-2 py-1 rounded text-xs ${statusColors[status] || 'bg-gray-100'}`}>
            {status}
         </span>
      );
   };

   if (loading)
      return (
         <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
         </div>
      );

   if (error)
      return (
         <div className="text-center py-6 text-red-500">
            <p>{error}</p>
            <button
               onClick={fetchOrders}
               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
               Retry
            </button>
         </div>
      );

   return (
      <div className="container mx-auto px-4 py-8">
         <h2 className="text-3xl font-bold mb-6">Order Management</h2>

         <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                     <tr>
                        <th className="px-4 py-3 text-left">Order #</th>
                        <th className="px-4 py-3 text-left">Customer</th>
                        <th className="px-4 py-3 text-center">Items</th>
                        <th className="px-4 py-3 text-right">Total</th>
                        <th className="px-4 py-3 text-center">Status</th>
                        <th className="px-4 py-3 text-left">Date</th>
                        <th className="px-4 py-3 text-center">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {orders.map((order) => (
                        <tr key={order.order_id} className="border-b hover:bg-gray-50">
                           <td className="px-4 py-3">{order.order_number}</td>
                           <td className="px-4 py-3">
                              <div className="font-medium">
                                 {order.first_name} {order.last_name}
                              </div>
                              <div className="text-sm text-gray-500">{order.email}</div>
                           </td>
                           <td className="px-4 py-3 text-center">{order.items_count} items</td>
                           <td className="px-4 py-3 text-right">
                              ₱{parseFloat(order.total_amount).toFixed(2)}
                           </td>
                           <td className="px-4 py-3 text-center">
                              <select
                                 value={order.status}
                                 onChange={(e) =>
                                    updateOrderStatus(order.order_id, e.target.value)
                                 }
                                 className="px-2 py-1 border rounded text-sm"
                              >
                                 <option value="Pending">Pending</option>
                                 <option value="Processing">Processing</option>
                                 <option value="Completed">Completed</option>
                                 <option value="Cancelled">Cancelled</option>
                              </select>
                           </td>
                           <td className="px-4 py-3">
                              {new Date(order.order_date).toLocaleString()}
                           </td>
                           <td className="px-4 py-3 text-center">
                              <div className="flex justify-center space-x-2">
                                 <button
                                    onClick={() => viewOrderDetails(order)}
                                    className="text-blue-500 hover:text-blue-700"
                                 >
                                    Details
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center px-4 py-3 bg-gray-50">
               <div className="text-sm text-gray-600">
                  Showing {orders.length} of {pagination.totalOrders} orders
               </div>
               <div className="flex space-x-2">
                  <button
                     onClick={() => handlePageChange(pagination.currentPage - 1)}
                     disabled={pagination.currentPage === 1}
                     className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                  >
                     Previous
                  </button>
                  <button
                     onClick={() => handlePageChange(pagination.currentPage + 1)}
                     disabled={orders.length < pagination.ordersPerPage}
                     className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                  >
                     Next
                  </button>
               </div>
            </div>
         </div>

         {/* Order Details Modal */}
         {selectedOrder && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
               <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold">
                           Order Details - {selectedOrder.order_number}
                        </h3>
                        <button
                           onClick={() => setSelectedOrder(null)}
                           className="text-gray-500 hover:text-gray-700"
                        >
                           ✕
                        </button>
                     </div>

                     <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                           <h4 className="font-semibold mb-2">Customer Information</h4>
                           <p>
                              {selectedOrder.first_name} {selectedOrder.last_name}
                           </p>
                           <p>{selectedOrder.email}</p>
                           <p>{selectedOrder.phone}</p>
                           <p>{selectedOrder.address}</p>
                           <p>
                              {selectedOrder.city}, {selectedOrder.zip_code}
                           </p>
                        </div>
                        <div>
                           <h4 className="font-semibold mb-2">Order Information</h4>
                           <p>Status: {renderStatusBadge(selectedOrder.status)}</p>
                           <p>Date: {new Date(selectedOrder.order_date).toLocaleString()}</p>
                           <p>Payment Method: {selectedOrder.payment_method}</p>
                        </div>
                     </div>

                     <h4 className="font-semibold mb-4">Order Items</h4>
                     <div className="overflow-x-auto">
                        <table className="w-full">
                           <thead className="bg-gray-100">
                              <tr>
                                 <th className="px-4 py-2 text-left">Product</th>
                                 <th className="px-4 py-2 text-right">Quantity</th>
                                 <th className="px-4 py-2 text-right">Price</th>
                                 <th className="px-4 py-2 text-right">Subtotal</th>
                              </tr>
                           </thead>
                           <tbody>
                              {selectedOrder.items.map((item, index) => (
                                 <tr key={index} className="border-t">
                                    <td className="px-4 py-2">{item.product_name}</td>
                                    <td className="px-4 py-2 text-right">{item.quantity}</td>
                                    <td className="px-4 py-2 text-right">
                                       ₱{parseFloat(item.price).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                       ₱{parseFloat(item.subtotal).toFixed(2)}
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                           <tfoot>
                              <tr className="font-bold bg-gray-50">
                                 <td colSpan="3" className="px-4 py-2 text-right">
                                    Total:
                                 </td>
                                 <td className="px-4 py-2 text-right">
                                    ₱{parseFloat(selectedOrder.total_amount).toFixed(2)}
                                 </td>
                              </tr>
                           </tfoot>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default Orders;
