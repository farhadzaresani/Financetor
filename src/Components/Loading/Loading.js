import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen  min-w-screen flex">
      <div className="m-auto flex opacity-50 gap-2">
        <h1 className="text-4xl text-sefid font-bold font-[fantasy] uppercase">
          loading
        </h1>
        <div className="w-10 h-10 border-[.5em] animate-spin border-sefid border-t-tosi  rounded-full"></div>
      </div>
    </div>
  );
}
