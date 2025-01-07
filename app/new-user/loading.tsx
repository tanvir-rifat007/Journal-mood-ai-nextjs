import React from "react";

const loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-950">
      <h1
        className="
        text-slate-50 text-4xl
        animate-pulse



       
      "
      >
        creating a new user...
      </h1>
    </div>
  );
};

export default loading;
