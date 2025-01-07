import Header from "@/components/Header";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-950">
      <Header />

      {children}
    </div>
  );
};

export default DashboardLayout;
