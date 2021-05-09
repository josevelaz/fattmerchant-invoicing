import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | Element;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { label, ...rest } = props;
  return (
    <button
      type="button"
      className="py-2 px-4 disabled:opacity-50 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-1/4 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
      {...rest}
    >
      {label}
    </button>
  );
};
