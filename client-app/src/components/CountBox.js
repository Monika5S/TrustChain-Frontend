import React from "react";

export function CountBox({ title, value }) {
  return (
    <div className="d-flex flex-column align-items-center w-25">
      <h4 className="text-white p-3 rounded-3 w-100 text-center">{value}</h4>
      <p className="px-3 py-2 w-100 rounded-3 text-center">{title}</p>
    </div>
  );
}

export default CountBox;
