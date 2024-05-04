import React from "react";

export function FormField({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) {
  return (
    <label className="flex-1 w-100 d-flex flex-column">
      {labelName}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="p-1 mb-3 border border-1 bg-transparent rounded"
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="p-1 mb-3 border border-1 rounded bg-transparent rounded text-white"
        />
      )}
    </label>
  );
}
