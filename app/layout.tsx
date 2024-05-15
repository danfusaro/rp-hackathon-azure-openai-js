import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eat to Live",
  description: "This example shows Azure Open AI integration with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-white bg-slate-900">
        <div className="min-h-screen flex items-center place-content-center overflow-hidden relative">
          <div
            className="absolute inset-0 bg-slate-950 bg-cover bg-center"
            style={{
              backgroundImage: "url('/food_mural.png')",
              opacity: "0.3",
            }}
          ></div>
          <div className={`relative z-10 ${inter.className}`}>{children}</div>
        </div>
      </body>
    </html>
  );
}
