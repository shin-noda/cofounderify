import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ children, className, ...props }) => {
  return (
    <label
      className={`text-xs text-gray-600 font-medium ${className ?? ""}`}
      {...props}
    >
      {children}
    </label>
  );
};