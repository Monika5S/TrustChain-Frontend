import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function DisplayProduct({ products, store }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 6;

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNavigate = (product) => {
    const path = store
      ? `/store-dashboard/products/${product.name}`
      : `/user-dashboard/products/${product.name}`;
    navigate(path, { state: product });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="product-display w-100 p-4">
      <div className="search-bar mb-4 w-100 d-flex justify-content-around align-items-center">
        <h1 className="text-white">All Products 🛍️</h1>

        <input
          type="text"
          placeholder="Search products..."
          className="form-control w-50 rounded rounded-5"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="d-flex flex-wrap justify-content-around w-100 column-gap-3 p-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div
              className="w-25 border border-2 rounded mb-3"
              key={product.id}
              onClick={() => handleNavigate(product)}
              style={{ cursor: "pointer" }}
            >
              {product.img_url && (
                <img
                  src={product.img_url}
                  alt={product.name}
                  style={{ maxHeight: "200px" }}
                  className="rounded w-100"
                />
              )}
              <div className="p-2 text-white bg-transparent">
                <h3>{product.name}</h3>
                <p>{product.desc}</p>
                <div className="d-flex align-items-center justify-content-between column-gap-3">
                  <h6>Price: {product.price} ETH</h6>
                  <h6>Status: {product.status}</h6>
                  {product.status === "available" && <p>{product.more}</p>}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls mt-4 d-flex justify-content-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-primary mx-2"
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-primary mx-2"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
