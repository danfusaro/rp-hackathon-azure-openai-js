import { Inter } from "next/font/google";
import { Card } from "@/app/components/card";
import { LinkButton } from "@/app/components/link-button";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Card>
      <div className="relative w-full p-8">
        <p className="text-slate-50">
          Welcome to Eat to Live, your family meal planner.
        </p>
      </div>
      <div className="flex justify-end space-x-4 items-center">
        <LinkButton text="Begin" href="/configure/1" />
      </div>
    </Card>
  );
}
