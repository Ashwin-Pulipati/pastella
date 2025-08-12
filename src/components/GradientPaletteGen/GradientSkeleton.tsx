import React from "react";

const GradientSkeleton = () => (
  <div className="space-y-8 rounded-2xl bg-card/50 p-4 animate-pulse">
    <div className="w-full h-72 rounded-xl bg-muted"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-28 rounded-xl bg-muted"></div>
      ))}
    </div>
  </div>
);

export default GradientSkeleton;
