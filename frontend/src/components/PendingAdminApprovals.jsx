import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function PendingAdminApprovals() {
   const [pendingAdmins, setPendingAdmins] = useState([]);
   const [loading, setLoading] = useState(true);

   const fetchPendingAdmins = async () => {
      try {
         const response = await axios.get('/api/admin_approval.php?action=pending');
         if (response.data.success) {
            setPendingAdmins(response.data.admins);
         }
      } catch (error) {
         console.error('Error fetching pending admins:', error);
      } finally {
         setLoading(false);
      }
   };

   const handleApproval = async (adminId) => {
      try {
         const result = await Swal.fire({
            title: 'Confirm Approval',
            text: 'Are you sure you want to approve this admin account?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve',
         });

         if (result.isConfirmed) {
            const response = await axios.post('/api/admin_approval.php?action=approve', {
               adminId,
            });

            if (response.data.success) {
               Swal.fire('Approved!', 'The admin account has been approved.', 'success');
               fetchPendingAdmins();
            } else {
               Swal.fire('Error', response.data.message, 'error');
            }
         }
      } catch (error) {
         console.error('Error approving admin:', error);
         Swal.fire('Error', 'Failed to approve admin account', 'error');
      }
   };

   useEffect(() => {
      fetchPendingAdmins();
   }, []);

   if (loading) {
      return <div>Loading...</div>;
   }

   return (
      <div className="pending-admins-container">
         <h2>Pending Admin Approvals</h2>
         {pendingAdmins.length === 0 ? (
            <p>No pending admin approvals</p>
         ) : (
            <div className="pending-admins-list">
               {pendingAdmins.map((admin) => (
                  <div key={admin.id} className="pending-admin-item">
                     <div className="admin-info">
                        <h3>{admin.name}</h3>
                        <p>Email: {admin.email}</p>
                        <p>Phone: {admin.number}</p>
                        <p>Requested: {new Date(admin.created_at).toLocaleDateString()}</p>
                     </div>
                     <button onClick={() => handleApproval(admin.id)} className="approve-button">
                        Approve
                     </button>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}

export default PendingAdminApprovals;
