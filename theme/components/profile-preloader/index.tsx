import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <div className="w-1/3 h-6 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-1/3 h-6 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-1/3 h-6 bg-gray-300 rounded animate-pulse"></div>
      </div>
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
      <div className="text-center mb-4">
        <div className="w-1/2 h-6 bg-gray-300 rounded mx-auto animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col">
          <div className="w-1/3 h-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-full h-6 bg-gray-300 rounded animate-pulse mt-2"></div>
        </div>
        <div className="flex flex-col">
          <div className="w-1/3 h-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-full h-6 bg-gray-300 rounded animate-pulse mt-2"></div>
        </div>
        <div className="flex flex-col">
          <div className="w-1/3 h-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-full h-6 bg-gray-300 rounded animate-pulse mt-2"></div>
        </div>
        <div className="flex flex-col">
          <div className="w-1/3 h-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-full h-6 bg-gray-300 rounded animate-pulse mt-2"></div>
        </div>
        <div className="flex flex-col">
          <div className="w-1/3 h-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-full h-6 bg-gray-300 rounded animate-pulse mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
