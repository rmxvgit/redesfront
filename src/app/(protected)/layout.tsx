import React from "react";
import Navbar from "@/components/navbar";

export default function LayoutNavBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
