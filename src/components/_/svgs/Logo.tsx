import React from "react";

interface Props {
  fill?: string;
  bg?: string;
}

const Logo = ({ fill = "#000", bg = "#fff" }: Props) => {
  return (
    <svg width="150" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={bg} d="M0 0h150v80H0z" />
      <path d="m76.5 50-2.875 7.5H65l7.188 5-2.876 7.5 7.188-5 7.188 5-2.876-7.5 7.188-5h-8.625L76.5 50Z" fill={fill} />
      <path d="M5 66h49l22.5-53 22 53h48" stroke={fill} strokeWidth="6" />
      <path stroke={bg} strokeWidth="4" d="M112.907 15.782 4.472 70.968M112.907 24.782 20.514 71.804" />
    </svg>
  );
};

export default Logo;
