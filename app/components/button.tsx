import Link from "next/link";
import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

export const Button: FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
> = (props) => {
  return (
    <button
      {...props}
      className="bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    ></button>
  );
};
