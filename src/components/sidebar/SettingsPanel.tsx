import React from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import type { Node } from 'reactflow';
import type { TextNodeData } from '../../types/flow';

interface SettingsPanelProps {
  selectedNode: Node<TextNodeData>;
  updateNodeText: (id: string, newText: string) => void;
  onBack: () => void;
  onDelete: (id: string) => void;
}

export const SettingsPanel = ({ selectedNode, updateNodeText, onBack, onDelete }: SettingsPanelProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeText(selectedNode.id, e.target.value);
  };

  const handleDelete = () => {
    onDelete(selectedNode.id);
    onBack();
  };

  return (
    <div className="flex flex-col h-full border-l border-gray-200 bg-white w-80">
      <div className="flex items-center p-3 border-b border-gray-200 relative">
        <button
          onClick={onBack}
          className="p-1 hover:bg-gray-100 rounded-md absolute left-3 transition-colors"
        >
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h3 className="text-sm font-semibold flex-1 text-center text-gray-800">Message</h3>
        <button
          onClick={handleDelete}
          className="p-1 hover:bg-red-100 rounded-md absolute right-3 transition-colors"
        >
          <Trash2 size={18} className="text-red-600" />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <label className="text-sm text-gray-500 mb-2 font-medium">Text</label>
        <textarea
          value={selectedNode.data.text || ''}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none shadow-sm"
          rows={3}
        />
      </div>
    </div>
  );
};