import React from 'react';
import { MessageSquare } from 'lucide-react';

export const NodesPanel = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="p-4 bg-white h-full border-l border-gray-200 w-80">
      <div className="text-gray-500 mb-4 text-xs font-semibold uppercase tracking-wider text-center border-b pb-2">
        Nodes Panel
      </div>
      
      <div
        className="border-2 border-blue-500 text-blue-500 flex flex-col items-center justify-center p-4 rounded-md cursor-grab bg-white hover:bg-blue-50 transition-colors w-full"
        onDragStart={(event) => onDragStart(event, 'textNode')}
        draggable
      >
        <MessageSquare size={24} className="mb-2" />
        <span className="font-semibold text-sm">Message</span>
      </div>
    </div>
  );
};