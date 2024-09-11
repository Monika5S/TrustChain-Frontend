import React from "react";
import { useLocation } from "react-router-dom";

export function StoreProductDetails() {
  const { state } = useLocation();

  return (
    <div className="px-5 py-3 my-3 mx-5 border border-3 rounded-5 text-white">
      <div className="w-100 d-flex justify-content-around align-items-center mt-2 column-gap-5">
        <div className="flex-1 w-50">
          <img
            src={state.img_url}
            alt="product"
            className="w-100 object-fit-cover rounded-5"
          />
        </div>

        <div className="w-50 text-align-left px-3">
          <h4>Price: {state.price} ETH</h4>
          <h6 className="py-3">product details</h6>
        </div>
      </div>

      <div className="flex-2 d-flex flex-column p-4">
        <div>
          <h4 className="text-white text-uppercase">{state.name}</h4>

          <div className="mt-1">
            <p className="">{state.more}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
