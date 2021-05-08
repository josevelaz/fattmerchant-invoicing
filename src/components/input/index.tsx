import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  classes?: string;
}

export const StyledInput: React.FC<InputProps> = (props) => {
  const { label, classes, ...rest } = props;
  return (
    <div className={classes}>
      <label className="text-gray-700">
        {label}
        <span className="text-red-500 required-dot">*</span>
      </label>
      <input
        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        {...rest}
      />
    </div>
  );
};
