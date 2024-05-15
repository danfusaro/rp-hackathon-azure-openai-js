"use client";
import { PropsWithChildren, useState } from "react";
import { Header } from "./header";

export const Card: React.FC<PropsWithChildren<{ title?: string }>> = ({
  children,
  title,
}) => {
  return (
    <div className="w-[800px] bg-slate-800 rounded-lg overflow-hidden text-slate-00 p-5 gap-5 flex flex-col border border-blue-800/40 shadow-xl shadow-black-900/50">
      <Header>Eat to Live{title ? `: ${title}` : ""}</Header>
      <div>{children}</div>
    </div>
  );
};
