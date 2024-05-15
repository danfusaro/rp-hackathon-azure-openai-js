import { HealthGoal } from "./HealthGoal";
import { Restriction } from "./Restriction";

export type Person = {
  name: string;
  age: number;
  height: number;
  sex: "Male" | "Female" | "Unspecified";
  weightAmount: number;
  analysis?: string;
  diet: string[];
  guid: string;
};
