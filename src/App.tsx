import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MarkerType,
  type Connection,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { Topbar } from './components/Topbar';
import { NodesPanel } from './components/sidebar/NodesPanel';
import { SettingsPanel } from './components/sidebar/SettingsPanel';
import { customNodeTypes } from './components/nodes';
import { validateFlow } from './utils/flowValidator';

const FlowBuilder = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  const [toast, setToast] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const selectedNode = nodes.find((n) => n.selected);

  const showToast = (type: 'error' | 'success', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const onConnect = useCallback(
    (params: Connection) => {
      const hasOutgoingEdge = edges.some((edge) => edge.source === params.source);
      
      if (hasOutgoingEdge) {
        showToast('error', 'A source handle can only connect to one target.');
        return;
      }

      setEdges((eds) =>
        addEdge(
          { 
            ...params, 
            markerEnd: { type: MarkerType.ArrowClosed, color: '#b1b1b7' },
            style: { strokeWidth: 2, stroke: '#b1b1b7' } 
          },
          eds
        )
      );
    },
    [edges, setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `node_${new Date().getTime()}`,
        type,
        position,
        data: { text: `test message ${nodes.length + 1}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, nodes.length, setNodes]
  );

  const updateNodeText = (id: string, newText: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data = { ...node.data, text: newText };
        }
        return node;
      })
    );
  };

  const clearSelection = () => {
    setNodes((nds) => nds.map((n) => ({ ...n, selected: false })));
  };

  const deleteNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    showToast('success', 'Node deleted successfully!');
  }, [setNodes, setEdges]);

  const handleSave = () => {
    if (nodes.length === 0) {
       showToast('error', 'Please add nodes to save the flow.');
       return;
    }

    const isValid = validateFlow(nodes, edges);
    if (!isValid) {
      showToast('error', 'Cannot save Flow');
    } else {
      showToast('success', 'Flow saved successfully!');
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#f3f4f6] font-sans">
      <Topbar onSave={handleSave} />

      {toast && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 flex justify-center w-full max-w-sm transition-all animate-in fade-in slide-in-from-top-4">
          <div
            className={`px-6 py-2.5 rounded-md shadow-lg text-sm font-semibold w-full text-center ${
              toast.type === 'error'
                ? 'bg-red-200 text-red-800 border border-red-300'
                : 'bg-green-200 text-green-800 border border-green-300'
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden relative">
        
        <div className="flex-1 h-full" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={(instance) => instance.fitView()}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={customNodeTypes}
            className="bg-gray-50"
          >
            <Background color="#ccc" gap={16} size={1} />
            <Controls />
          </ReactFlow>
        </div>

        <div className="h-full bg-white z-10 shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)] transition-all flex-shrink-0">
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
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  );
}