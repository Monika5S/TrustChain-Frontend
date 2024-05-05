import React from "react";
import { useNavigate } from "react-router-dom";

//passing state of product to campaign page to support 5% of price to them
export function DisplayProduct({ products }) {
  const navigate = useNavigate();
  function handleNavigate(product) {
    navigate(`/cooperative-store/${product.name}`, { state: product });
  }

  return (
    <div className="d-flex justify-content-around w-100 column-gap-3">
      {products.map((product, index) => (
        <div
          className="w-25 border border-2 rounded"
          key={index}
          onClick={() => handleNavigate(product)}
        >
          {/* condition to check If img_url is provided then render the image */}

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
              {!product.status ? product.more : ""}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
