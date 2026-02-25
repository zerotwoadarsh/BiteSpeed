import type { Node } from 'reactflow';
import type { Edge } from 'reactflow';

export const validateFlow = (nodes: Node[], edges: Edge[]): boolean => {
  if (nodes.length <= 1) {
    return true;
  }

  const targetNodeIds = new Set(edges.map((edge) => edge.target));

  const nodesWithEmptyTargets = nodes.filter((node) => !targetNodeIds.has(node.id));

  if (nodesWithEmptyTargets.length > 1) {
    return false;
  }

  return true;
};