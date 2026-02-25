import React from 'react';

export interface ToastProps {
  type: 'error' | 'success';
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ type, message }) => {
  const isError = type === 'error';

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 flex justify-center w-full max-w-sm transition-all">
      <div
        className={`px-6 py-2.5 rounded-md shadow-md text-sm font-semibold w-full text-center ${
          isError
            ? 'bg-red-200 text-red-800 border border-red-300'
            : 'bg-green-200 text-green-800 border border-green-300'
        }`}
      >
        {message}
      </div>
    </div>
  );
};