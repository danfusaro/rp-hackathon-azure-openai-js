"use client";
import React, { FC, useState } from "react";
import { ConversationStyle } from "../lib/types/ConversationStyle";

interface ToggleProps {
  onClick: (ConverSationStyle: ConversationStyle) => void;
}

interface ToggleItemProps {
  title: string;
  isSelected: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const ToggleItem = (props: ToggleItemProps) => {
  return (
    <li
      title={props.title}
      onClick={props.onClick}
      className={`border gap-2 border-transparent py-2 hover:bg-slate-800 cursor-pointer grow justify-center flex rounded-full flex-1 items-center  ${
        props.isSelected
          ? "border-x-slate-700 border-b-slate-700 border-t-slate-600 bg-slate-700 hover:bg-slate-700 hover:text-slate-50 fill-white px-3"
          : ""
      }`}
    >
      <span> {props.children}</span>
      {props.isSelected ? props.title : ""}
    </li>
  );
};

export const ConversationStyleToggle: FC<ToggleProps> = (props) => {
  const [selected, setSelected] = useState<ConversationStyle>("FUNNY");

  const onClick = (style: ConversationStyle) => {
    setSelected(style);
    props.onClick(style);
  };

  return (
    <div className="bg-slate-900 rounded-full p-1">
      <div className="flex justify-between gap-1 text-sm items-stretch">
        <ToggleItem
          title="Funny"
          isSelected={selected === "FUNNY"}
          onClick={() => onClick("FUNNY")}
        >
          🤣
        </ToggleItem>
        <ToggleItem
          title="Neutral"
          isSelected={selected === "NEUTRAL"}
          onClick={() => onClick("NEUTRAL")}
        >
          😐
        </ToggleItem>
        <ToggleItem
          title="Sad"
          isSelected={selected === "SAD"}
          onClick={() => onClick("SAD")}
        >
          😔
        </ToggleItem>
        <ToggleItem
          title="Angry"
          isSelected={selected === "ANGRY"}
          onClick={() => onClick("ANGRY")}
        >
          🤬
        </ToggleItem>
      </div>
    </div>
  );
};
