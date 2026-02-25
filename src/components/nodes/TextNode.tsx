import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { MessageSquare } from 'lucide-react';
import type { TextNodeData } from '../../types/flow';

export const TextNode = ({ data, selected }: NodeProps<TextNodeData>) => {
  return (
    <div
      className={`shadow-lg rounded-[8px] bg-white min-w-[250px] transition-all duration-200 ${
        selected ? 'border-2 border-blue-500 ring-4 ring-blue-500/20' : 'border-2 border-transparent'
      }`}
    >
      <div className="bg-teal-100 px-3 py-1.5 rounded-t-[6px] flex items-center justify-between text-xs font-bold text-teal-800 border-b border-teal-200">
        <div className="flex items-center gap-2">
          <MessageSquare size={14} className="text-teal-700" />
          <span>Send Message</span>
        </div>
        <div className="bg-white rounded-full flex items-center justify-center shadow-sm h-5 w-5">
           <MessageSquare size={10} className="text-teal-700" />
        </div>
      </div>

      <div className="p-3 text-sm text-gray-700 min-h-[40px] whitespace-pre-wrap">
        {data.text || 'text message'}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="w-2.5 h-2.5 !bg-gray-200 border-2 border-white shadow-sm"
      />
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-2.5 h-2.5 !bg-gray-200 border-2 border-white shadow-sm"
      />
    </div>
  );
};