import React from 'react';

interface TopbarProps {
  onSave: () => void;
}

export const Topbar = ({ onSave }: TopbarProps) => {
  return (
    <div className="h-16 bg-gray-100 flex justify-between items-center px-6 relative z-10 border-b border-gray-300 shadow-sm">
      <div className="font-bold text-gray-700 text-lg tracking-tight">BiteSpeed</div>
      <button
        onClick={onSave}
        className="border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 px-5 py-1.5 rounded-md font-semibold text-sm transition-colors shadow-sm"
      >
        Save Changes
      </button>
    </div>
  );
};