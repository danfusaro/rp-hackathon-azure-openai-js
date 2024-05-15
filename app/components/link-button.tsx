import Link from "next/link";
import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

export const LinkButton: FC<
  PropsWithChildren<
    { href: string; text?: string } & ButtonHTMLAttributes<HTMLButtonElement>
  >
> = ({ href, text, disabled, ...rest }) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={`bottom-0 right-0 ${
        disabled ? "bg-gray-900" : "bg-blue-500"
      } ${
        !disabled ? "hover:bg-blue-700" : ""
      } text-white font-bold py-2 px-4 rounded`}
    >
      {!disabled ? <Link href={href}>{text}</Link> : text}
    </button>
  );
};
