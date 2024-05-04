import React from "react";

export function CustomButton({ btnType, title, handleClick, styles }) {
  return (
    <button
      type={btnType}
      className={`text-white px-4 py-2 border border-0 rounded ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}
