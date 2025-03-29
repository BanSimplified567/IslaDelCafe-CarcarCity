import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function ProductManagement({ viewMode = 'grid', searchQuery = '', categoryFilter = 'all' }) {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [showAddModal, setShowAddModal] = useState(false);
   const [showEditModal, setShowEditModal] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [formData, setFormData] = useState({
      name: '',
      price: '',
      original_price: '',
      category: '',
      category_quality: '',
      description: '',
      default_size: '',
      default_temperature: '',
      image: null,
   });

   useEffect(() => {
      fetchProducts();
   }, []);

   const fetchProducts = async () => {
      try {
         const response = await axios.get('/api/products.php');
         if (response.data.success) {
            setProducts(response.data.products);
         }
      } catch (error) {
         console.error('Error fetching products:', error);
         Swal.fire('Error', 'Failed to fetch products', 'error');
      } finally {
         setLoading(false);
      }
   };

   const handleAddProduct = async (e) => {
      e.preventDefault();
      try {
         const formDataObj = new FormData();
         Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key]);
         });

         const response = await axios.post('/api/products.php?action=add', formDataObj, {
            headers: { 'Content-Type': 'multipart/form-data' },
         });

         if (response.data.success) {
            Swal.fire('Success', 'Product added successfully', 'success');
            setShowAddModal(false);
            fetchProducts();
         }
      } catch (error) {
         console.error('Error adding product:', error);
         Swal.fire('Error', 'Failed to add product', 'error');
      }
   };

   const handleDeleteProduct = async (productId) => {
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
            const response = await axios.post('/api/products.php?action=delete', {
               productId,
            });

            if (response.data.success) {
               Swal.fire('Deleted!', 'Product has been deleted.', 'success');
               fetchProducts();
            }
         }
      } catch (error) {
         console.error('Error deleting product:', error);
         Swal.fire('Error', 'Failed to delete product', 'error');
      }
   };

   const handleEditProduct = (productId) => {
      const product = products.find((p) => p.id === productId);
      setSelectedProduct(product);
      setShowEditModal(true);
   };

   const handleUpdateProduct = async (updatedData) => {
      try {
         const response = await axios.post('/api/products.php?action=update', {
            ...updatedData,
            id: selectedProduct.id,
         });

         if (response.data.success) {
            Swal.fire('Success', 'Product updated successfully', 'success');
            setShowEditModal(false);
            fetchProducts();
         }
      } catch (error) {
         console.error('Error updating product:', error);
         Swal.fire('Error', 'Failed to update product', 'error');
      }
   };

   // Filter products based on search and category
   const filteredProducts = products.filter((product) => {
      const matchesSearch =
         product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
   });

   // Render grid view
   const renderGridView = () => (
      <div className="products-grid">
         {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
               <img src={product.image} alt={product.name} />
               <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">₱{product.price}</p>
                  <p className="category">{product.category}</p>
                  <div className="product-actions">
                     <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                     <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );

   // Render list view
   const renderListView = () => (
      <div className="products-table">
         <table>
            <thead>
               <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quality</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {filteredProducts.map((product) => (
                  <tr key={product.id}>
                     <td>
                        <img src={product.image} alt={product.name} className="product-thumbnail" />
                     </td>
                     <td>{product.name}</td>
                     <td>{product.category}</td>
                     <td>₱{product.price}</td>
                     <td>{product.category_quality}</td>
                     <td>
                        <div className="table-actions">
                           <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                           <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );

   return (
      <div className="product-management">
         <div className="management-header">
            <button className="add-product-btn" onClick={() => setShowAddModal(true)}>
               Add New Product
            </button>
         </div>

         {loading ? (
            <div className="loading-spinner">Loading products...</div>
         ) : viewMode === 'grid' ? (
            renderGridView()
         ) : (
            renderListView()
         )}

         {/* Add/Edit Product Modals */}
         {showAddModal && (
            <ProductModal onClose={() => setShowAddModal(false)} onSubmit={handleAddProduct} />
         )}

         {showEditModal && (
            <ProductModal
               product={selectedProduct}
               onClose={() => setShowEditModal(false)}
               onSubmit={handleUpdateProduct}
            />
         )}
      </div>
   );
}

export default ProductManagement;
