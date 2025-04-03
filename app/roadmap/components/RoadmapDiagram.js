import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';
import { useMemo } from 'react';

export const nodeContent = {
  prerequisites: {
    title: 'Prerequisites: Get Started with Development',
    content: 'Start your AI Engineering journey by mastering the fundamental development skills needed for building AI-powered applications.',
    resources: {
      free: [
        { type: 'Article', title: 'JavaScript & TypeScript Basics', link: '#' },
        { type: 'Video', title: 'ES6+ Features Tutorial', link: '#' }
      ],
      premium: [
        { type: 'Course', title: 'Complete Web Development Bootcamp', link: '#' },
        { type: 'Course', title: 'Node.js Masterclass', link: '#' }
      ]
    }
  },
  introduction: {
    title: 'Introduction',
    content: `React Native is an open-source framework developed by Facebook that allows developers to build mobile applications using JavaScript (or TypeScript) and React. It enables building apps for both iOS and Android platforms by offering a shared codebase, which significantly reduces development time and effort.`,
    resources: {
      free: [
        { type: 'Article', title: 'Official Website', link: 'https://reactnative.dev' },
        { type: 'Article', title: 'Official Getting Started to React Native', link: 'https://reactnative.dev/docs/getting-started' },
        { type: 'Video', title: 'React Native Course for Beginners in 2024 | Build a Full Stack React Native App', link: '#' }
      ],
      premium: [
        { type: 'Course', title: 'React Native - The Practical Guide 2024', link: '#' },
        { type: 'Course', title: 'Complete React Native Developer in 2024', link: '#' }
      ]
    }
  }
};

export const initialNodes = [
  // Main Path - Vertical Layout
  {
    id: 'setup',
    type: 'default',
    position: { x: 50, y: 20 },
    data: { label: 'Introduction' },
    style: { background: '#1eb853', padding: '12px', borderRadius: '4px', border: 'none', fontSize: '14px', color: 'white', width: 280 }
  },
  {
    id: 'fundamentals',
    type: 'default',
    position: { x: 50, y: 160 },
    data: { label: 'Mobile App Basics' },
    style: { background: '#1eb853', padding: '12px', borderRadius: '4px', border: 'none', fontSize: '14px', color: 'white', width: 280 }
  },
  {
    id: 'components',
    type: 'default',
    position: { x: 50, y: 300 },
    data: { label: 'Building Real Features' },
    style: { background: '#1eb853', padding: '12px', borderRadius: '4px', border: 'none', fontSize: '14px', color: 'white', width: 280 }
  },
  {
    id: 'data',
    type: 'default',
    position: { x: 50, y: 440 },
    data: { label: 'Advanced Development' },
    style: { background: '#1eb853', padding: '12px', borderRadius: '4px', border: 'none', fontSize: '14px', color: 'white', width: 280 }
  },
  {
    id: 'deployment',
    type: 'default',
    position: { x: 50, y: 580 },
    data: { label: 'Launch Your App' },
    style: { background: '#1eb853', padding: '12px', borderRadius: '4px', border: 'none', fontSize: '14px', color: 'white', width: 280 }
  },

  // Details for each section - Right side
  {
    id: 'node-setup',
    type: 'default',
    position: { x: 400, y: 20 },
    data: { label: 'Development Tools Setup' },
    style: { background: '#ffeb3b', padding: '8px', borderRadius: '4px', width: 200, color: 'black' }
  },
  {
    id: 'expo-cli',
    type: 'default',
    position: { x: 400, y: 70 },
    data: { label: 'Project Architecture' },
    style: { background: '#ffeb3b', padding: '8px', borderRadius: '4px', width: 200, color: 'black' }
  },

  // Mobile App Basics Details
  {
    id: 'jsx-basics',
    type: 'default',
    position: { x: 400, y: 160 },
    data: { label: 'UI Components & Styling' },
    style: { background: '#ffeb3b', padding: '8px', borderRadius: '4px', width: 200, color: 'black' }
  },
  {
    id: 'native-components',
    type: 'default',
    position: { x: 400, y: 210 },
    data: { label: 'Expo Router' },
    style: { background: '#ffeb3b', padding: '8px', borderRadius: '4px', width: 200, color: 'black' }
  },

  // Real Features Details
  {
    id: 'component-lifecycle',
    type: 'default',
    position: { x: 400, y: 300 },
    data: { label: 'User Authentication' },
    style: { background: '#ffeb3b', padding: '8px', borderRadius: '4px', width: 200, color: 'black' }
  },
  {
    id: 'state-management',
    type: 'default',
    position: { x: 400, y: 350 },
    data: { label: 'Data Storage & Sync' },
    style: { background: '#ffeb3b', padding: '8px', borderRadius: '4px', width: 200, color: 'black' }
  },

  // Advanced Development Details
  {
    id: 'async-operations',
    type: 'default',
    position: { x: 400, y: 440 },
    data: { label: 'Backend' },
    style: { background: '#ffeb3b', padding: '8px', borderRadius: '4px', width: 200, color: 'black' }
  },
  {
    id: 'api-integration',
    type: 'default',
    position: { x: 400, y: 490 },
    data: { label: 'AI Integration' },
    style: { background: '#ffeb3b', padding: '8px', borderRadius: '4px', width: 200, color: 'black' }
  },

  // Launch Details
  {
    id: 'expo-build',
    type: 'default',
    position: { x: 400, y: 580 },
    data: { label: 'App Store Approval' },
    style: { background: '#ffeb3b', padding: '8px', borderRadius: '4px', width: 200, color: 'black' }
  },
  {
    id: 'platform-deployment',
    type: 'default',
    position: { x: 400, y: 630 },
    data: { label: 'Testing & Publishing' },
    style: { background: '#ffeb3b', padding: '8px', borderRadius: '4px', width: 200, color: 'black' }
  }
];

export const initialEdges = [
  // Main Vertical Path
  { id: 'e1-2', source: 'setup', target: 'fundamentals', animated: true, type: 'smoothstep', style: { stroke: '#1eb853' } },
  { id: 'e2-3', source: 'fundamentals', target: 'components', animated: true, type: 'smoothstep', style: { stroke: '#1eb853' } },
  { id: 'e3-4', source: 'components', target: 'data', animated: true, type: 'smoothstep', style: { stroke: '#1eb853' } },
  { id: 'e4-5', source: 'data', target: 'deployment', animated: true, type: 'smoothstep', style: { stroke: '#1eb853' } },

  // Setup Connections
  { id: 'esp-1', source: 'setup', target: 'node-setup', animated: true, type: 'smoothstep', style: { stroke: '#1eb853' } },
  { id: 'esp-2', source: 'setup', target: 'expo-cli', animated: true, type: 'smoothstep', style: { stroke: '#1eb853' } },

  // Fundamentals Connections
  { id: 'ecb-1', source: 'fundamentals', target: 'jsx-basics', animated: true, type: 'smoothstep', style: { stroke: '#1eb853' } },
  { id: 'ecb-2', source: 'fundamentals', target: 'native-components', animated: true, type: 'smoothstep', style: { stroke: '#1eb853' } },

  // Component Architecture Connections
  { id: 'emd-1', source: 'components', target: 'component-lifecycle', animated: true, type: 'smoothstep', style: { stroke: '#1eb853' } },
  { id: 'emd-2', source: 'components', target: 'state-management', animated: true, type: 'smoothstep', style: { stroke: '#1eb853' } },

  // Data Management Connections
  { id: 'epa-1', source: 'data', target: 'async-operations', animated: true, type: 'smoothstep', style: { stroke: '#1eb853' } },
  { id: 'epa-2', source: 'data', target: 'api-integration', animated: true, type: 'smoothstep', style: { stroke: '#1eb853' } },

  // Deployment Connections
  { id: 'erp-1', source: 'deployment', target: 'expo-build', animated: true, type: 'smoothstep', style: { stroke: '#1eb853' } },
  { id: 'erp-2', source: 'deployment', target: 'platform-deployment', animated: true, type: 'smoothstep', style: { stroke: '#1eb853' } }
];

export default function RoadmapDiagram({ 
  nodes = initialNodes, 
  edges = initialEdges, 
  isMobile = false 
}) {
  // Memoize node types and edge types
  const nodeTypes = useMemo(() => ({}), []);
  const edgeTypes = useMemo(() => ({}), []);

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView={true}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          panOnScroll={false}
          panOnDrag={false}
          preventScrolling={true}
          minZoom={0.55}
          maxZoom={0.55}
          defaultzoom={0.55}
          fitViewOptions={{
            padding: 0.2,
            includeHiddenNodes: false,
          }}
          style={{ background: '#1a1a1a' }}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#2a2a2a" gap={16} />
        </ReactFlow>
      </div>
      {/* Transparent overlay to prevent any interactions */}
      <div 
        className="absolute inset-0 bg-transparent cursor-default" 
        style={{ pointerEvents: 'all' }}
      />
    </div>
  );
} 