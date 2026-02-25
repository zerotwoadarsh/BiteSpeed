import React from 'react';
import type { Node } from 'reactflow';
import type { TextNodeData } from '../../types/flow';
import { NodesPanel } from './NodesPanel';
import { SettingsPanel } from './SettingsPanel';

interface SidebarProps {
  selectedNode?: Node<TextNodeData>;
  updateNodeText: (id: string, newText: string) => void;
  clearSelection: () => void;
  deleteNode: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  selectedNode, 
  updateNodeText, 
  clearSelection,
  deleteNode
}) => {
  return (
    <aside className="h-full bg-slate-50/50 z-10 border-l border-slate-200 shadow-[-8px_0_30px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out flex-shrink-0 w-80 lg:w-96 flex flex-col backdrop-blur-sm">
      {selectedNode ? (
        <SettingsPanel
          selectedNode={selectedNode}
          updateNodeText={updateNodeText}
          onBack={clearSelection}
          onDelete={deleteNode}
        />
      ) : (
        <NodesPanel />
      )}
    </aside>
  );
};