import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function Users() {
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      fetchUsers();
   }, []);

   const fetchUsers = async () => {
      try {
         setLoading(true);
         const response = await axios.get('/api/users.php?action=fetch');
         if (response.data.success) {
            setUsers(response.data.users);
         } else {
            throw new Error(response.data.error);
         }
      } catch (err) {
         setError('Failed to fetch users: ' + err.message);
      } finally {
         setLoading(false);
      }
   };

   const handleStatusChange = async (userId, newStatus) => {
      try {
         const response = await axios.post('/api/users.php?action=update-status', {
            userId,
            status: newStatus,
         });

         if (response.data.success) {
            Swal.fire({
               icon: 'success',
               title: 'Status Updated',
               text: 'User status has been updated successfully',
               toast: true,
               position: 'top-end',
               timer: 3000,
               showConfirmButton: false,
            });
            fetchUsers(); // Refresh the users list
         }
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'Failed to update user status',
         });
      }
   };

   const handleDeleteUser = async (userId) => {
      try {
         const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
         });

         if (result.isConfirmed) {
            const response = await axios.post('/api/users.php?action=delete', {
               userId,
            });

            if (response.data.success) {
               Swal.fire({
                  icon: 'success',
                  title: 'Deleted!',
                  text: 'User has been deleted.',
                  toast: true,
                  position: 'top-end',
                  timer: 3000,
                  showConfirmButton: false,
               });
               fetchUsers(); // Refresh the users list
            }
         }
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: 'Failed to delete user',
         });
      }
   };

   if (loading) {
      return <div className="text-center py-6">Loading users...</div>;
   }

   if (error) {
      return <div className="text-center py-6 text-red-500">{error}</div>;
   }

   return (
      <div className="p-6">
         <h2 className="text-2xl font-bold mb-6">User Management</h2>

         <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
               <thead className="bg-gray-100">
                  <tr>
                     <th className="px-6 py-3 text-left">Name</th>
                     <th className="px-6 py-3 text-left">Email</th>
                     <th className="px-6 py-3 text-left">Contact</th>
                     <th className="px-6 py-3 text-left">Address</th>
                     <th className="px-6 py-3 text-center">Role</th>
                     <th className="px-6 py-3 text-center">Status</th>
                     <th className="px-6 py-3 text-center">Orders</th>
                     <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                     <tr key={user.user_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                           {user.first_name} {user.last_name}
                        </td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.phone || 'N/A'}</td>
                        <td className="px-6 py-4">
                           {user.address ? (
                              <>
                                 {user.address}
                                 <br />
                                 {user.city}, {user.zip_code}
                              </>
                           ) : (
                              'N/A'
                           )}
                        </td>
                        <td className="px-6 py-4 text-center">
                           <span
                              className={`px-2 py-1 rounded ${
                                 user.role === 'admin'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-blue-100 text-blue-800'
                              }`}
                           >
                              {user.role}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                           <select
                              value={user.status}
                              onChange={(e) => handleStatusChange(user.user_id, e.target.value)}
                              className={`px-2 py-1 rounded ${
                                 user.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                              }`}
                           >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                           </select>
                        </td>
                        <td className="px-6 py-4 text-center">{user.total_orders}</td>
                        <td className="px-6 py-4 text-center">
                           <button
                              onClick={() => handleDeleteUser(user.user_id)}
                              className="text-red-600 hover:text-red-800"
                           >
                              Delete
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default Users;
