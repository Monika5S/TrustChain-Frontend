import React from "react";
import { useNavigate } from "react-router-dom";

export function DisplayProduct({ products, store }) {
  const navigate = useNavigate();

  const handleNavigate = (product) => {
    if (store) {
      navigate(`/store-dashboard/products/${product.name}`, {
        state: product,
      });
    } else {
      navigate(`/user-dashboard/products/${product.name}`, {
        state: product,
      });
    }
  };

  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="d-flex flex-wrap justify-content-around w-100 column-gap-3">
      {products.map((product) => (
        <div
          className="w-25 border border-2 rounded mb-3"
          key={product.id} // Use product.id for a unique key
          onClick={() => handleNavigate(product)}
          style={{ cursor: "pointer" }} // Add cursor pointer for better UX
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
      ))}
    </div>
  );
}
