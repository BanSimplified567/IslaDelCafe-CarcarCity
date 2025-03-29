import { useAuth } from '@context/AuthContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AdminApprovals() {
   const [pendingAdmins, setPendingAdmins] = useState([]);
   const [loading, setLoading] = useState(true);
   const { admin } = useAuth();
   const navigate = useNavigate();

   // Protect this route for super admins only
   useEffect(() => {
      if (!admin || admin.role !== 'super_admin') {
         navigate('/dashboard');
      }
   }, [admin, navigate]);

   const fetchPendingAdmins = async () => {
      try {
         const response = await axios.get('/api/admin_approval.php?action=pending');
         if (response.data.success) {
            setPendingAdmins(response.data.admins);
         }
      } catch (error) {
         console.error('Error fetching pending admins:', error);
         Swal.fire('Error', 'Failed to fetch pending admins', 'error');
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
            }
         }
      } catch (error) {
         console.error('Error approving admin:', error);
         Swal.fire('Error', 'Failed to approve admin account', 'error');
      }
   };

   const handleReject = async (adminId) => {
      try {
         const result = await Swal.fire({
            title: 'Confirm Rejection',
            text: 'Are you sure you want to reject this admin account?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, reject',
         });

         if (result.isConfirmed) {
            const response = await axios.post('/api/admin_approval.php?action=reject', {
               adminId,
            });

            if (response.data.success) {
               Swal.fire('Rejected!', 'The admin account has been rejected.', 'success');
               fetchPendingAdmins();
            }
         }
      } catch (error) {
         console.error('Error rejecting admin:', error);
         Swal.fire('Error', 'Failed to reject admin account', 'error');
      }
   };

   useEffect(() => {
      fetchPendingAdmins();
   }, []);

   if (loading) {
      return (
         <div className="admin-approvals-loading">
            <div className="spinner"></div>
            <p>Loading pending approvals...</p>
         </div>
      );
   }

   return (
      <div className="admin-approvals-container">
         <h1 className="admin-approvals-title">Pending Admin Approvals</h1>

         {pendingAdmins.length === 0 ? (
            <div className="admin-approvals-empty">
               <p>No pending admin approvals</p>
            </div>
         ) : (
            <div className="admin-approvals-grid">
               {pendingAdmins.map((admin) => (
                  <div key={admin.id} className="admin-approval-card">
                     <div className="admin-approval-header">
                        <h3>{admin.name}</h3>
                        <span className="admin-approval-date">
                           {new Date(admin.created_at).toLocaleDateString()}
                        </span>
                     </div>

                     <div className="admin-approval-details">
                        <p>
                           <strong>Email:</strong> {admin.email}
                        </p>
                        <p>
                           <strong>Phone:</strong> {admin.number || 'Not provided'}
                        </p>
                     </div>

                     <div className="admin-approval-actions">
                        <button onClick={() => handleApproval(admin.id)} className="approve-button">
                           Approve
                        </button>
                        <button onClick={() => handleReject(admin.id)} className="reject-button">
                           Reject
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}

export default AdminApprovals;
