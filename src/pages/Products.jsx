import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

function Products() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 10;

  const [error, setError] = useState("");
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [productToDeleteIndex, setProductToDeleteIndex] = useState(null);

  const [currentProduct, setCurrentProduct] = useState({
    barcode: "",
    name: "",
    price: "",
    category: "",
    unit: "pcs",
    image: ""
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const showPopup = () => {
    setIsPopupVisible(true);
    setIsEditMode(false);
    setCurrentProduct({ barcode: "", name: "", price: "", category: "", unit: "pcs", image: "" });
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setError("");
    setShowUpload(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({ ...prev, [name]: value }));
  };

  const isBarcodeUnique = (barcode, excludeIndex = null) => {
    const normalized = barcode.trim().toLowerCase();
    return !products.some((product, index) => {
      if (excludeIndex !== null && index === excludeIndex) return false;
      const existing = product.barcode.trim().toLowerCase();
      return existing === normalized || existing.includes(normalized) || normalized.includes(existing);
    });
  };

  const handleSubmit = () => {
    if (!currentProduct.barcode || !currentProduct.name || !currentProduct.price || !currentProduct.category) {
      setError("All fields must be filled out.");
      return;
    }

    const trimmedBarcode = currentProduct.barcode.trim();
    if (!isBarcodeUnique(trimmedBarcode, isEditMode ? productToDeleteIndex : null)) {
      setError("The entered barcode matches another product. Barcode must be unique and not similar to existing ones.");
      return;
    }

    if (isEditMode) {
      const updated = [...products];
      updated[productToDeleteIndex] = { ...currentProduct, barcode: trimmedBarcode };
      setProducts(updated);
    } else {
      setProducts([...products, { ...currentProduct, barcode: trimmedBarcode }]);
    }

    closePopup();
  };

  const handleEdit = (index) => {
    const actualIndex = (currentPage - 1) * PRODUCTS_PER_PAGE + index;
    setCurrentProduct(products[actualIndex]);
    setProductToDeleteIndex(actualIndex);
    setIsPopupVisible(true);
    setIsEditMode(true);
  };

  const showConfirmDelete = (index) => {
    const actualIndex = (currentPage - 1) * PRODUCTS_PER_PAGE + index;
    setIsConfirmVisible(true);
    setProductToDeleteIndex(actualIndex);
  };

  const handleDelete = () => {
    const barcodeToDelete = products[productToDeleteIndex].barcode;
    const updatedProducts = products.filter((_, i) => i !== productToDeleteIndex);
    setProducts(updatedProducts);

    const stocks = JSON.parse(localStorage.getItem("stocks")) || [];
    const updatedStocks = stocks.filter(stock => stock.barcode !== barcodeToDelete);
    localStorage.setItem("stocks", JSON.stringify(updatedStocks));

    setIsConfirmVisible(false);
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentProduct((prev) => ({ ...prev, image: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Layout>
      <b className="content-header">List of Products</b>
      <div className="stock-nav">
        <input type="text" placeholder="🔍︎ Search" />
        <select className="filter">
          <option value="all">All</option>
          <option value="food">Food</option>
          <option value="school supplies">School Supplies</option>
          <option value="hardware">Hardware</option>
        </select>
        <button onClick={showPopup} className="edit-button">Add Product</button>
      </div>

      {isPopupVisible && (
        <div className="hidden-overlay" style={{ display: 'flex' }}>
          <div className="popup-content" style={{ marginLeft: "40px", marginRight: "40px" }}>
            <h3>{isEditMode ? "Edit Product" : "Add Product"}</h3>
            <div className="product-form">
              {error && <p style={{ color: "red" }}>{error}</p>}
              <input type="text" name="barcode" placeholder="Barcode" value={currentProduct.barcode} onChange={handleInputChange} />
              <input type="text" name="name" placeholder="Product Name" value={currentProduct.name} onChange={handleInputChange} />
              <input type="number" name="price" placeholder="Price" value={currentProduct.price} onChange={handleInputChange} />
              <select name="category" className="product-category" placeholder="Category" value={currentProduct.category} onChange={handleInputChange}>
                <option value="" disabled hidden>Select Category</option>
                <option value="Food">Food</option>
                <option value="School Supplies">School Supplies</option>
                <option value="Hardware">Hardware</option>
              </select>
              <div className="button-container">
                <button onClick={() => setShowUpload(!showUpload)}>Add/Change Photo</button>
              </div>
              {showUpload && (
                <div>
                  <div {...getRootProps()} className="upload-box">
                    <input {...getInputProps()} />
                    <div className="upload-content text-center">
                      <UploadCloud className="w-10 h-10 text-gray-500 mx-auto" />
                      <p className="text-gray-600">Drag & drop or click to upload</p>
                      <button className="mt-3">Choose File</button>
                    </div>
                  </div>
                  {currentProduct.image && (
                    <div className="image-preview text-center mt-3" style={{ justifyItems: "center" }}>
                      <img
                        src={currentProduct.image}
                        alt="Preview"
                        style={{ marginTop: "10px", maxWidth: "150px", maxHeight: "150px", objectFit: "contain" }}
                      />
                      <p className="text-sm text-gray-600" style={{ marginTop: "5px" }}>Image Preview</p>
                    </div>
                  )}
                </div>
              )}
              <button style={{ marginTop: "15px" }} onClick={handleSubmit}>{isEditMode ? "Save Changes" : "Add Product"}</button>
              <button style={{ marginTop: "15px" }} onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isConfirmVisible && (
        <div className="hidden-overlay" style={{ display: 'flex' }}>
          <div className="popup-content" style={{ justifyItems: "center" }} >
            <p>Are you sure you want to delete this product?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setIsConfirmVisible(false)}>No</button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Product</th>
            <th>Unit Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="6">No products added yet</td></tr>
          ) : (
            products.map((product, index) => (
              <tr key={index}>
                <td>{product.barcode}</td>
                <td>{product.name}</td>
                <td>₱{product.price}</td>
                <td>{product.category}</td>
                <td><img src={product.image || "/src/images/product-image_placeholder.png"} className="product-image" alt={product.name} /></td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
                  <button className="edit-button delete-button" onClick={() => showConfirmDelete(index)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="prev-next-button" style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "20px" }}>
        <button className="previous" onClick={handlePrevious} disabled={currentPage === 1}>&laquo; Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button className="next" onClick={handleNext} disabled={currentPage === totalPages} >Next &raquo;</button>
      </div>
    </Layout>
  );
}

export default Products;