# BiteSpeed Frontend Task: Chatbot Flow Builder

A modern, highly interactive Chatbot Flow Builder built with React and React Flow. This application allows users to visually design chatbot conversation paths using a drag-and-drop interface, complete with robust connection validation, state management, and a premium UI.

## Project Explanation

The goal of this project is to build an extensible and user-friendly flow builder for chatbot message sequences. Users can drag message blocks onto a canvas, connect them to dictate the flow of conversation, and configure the content of each message.

To ensure data integrity, the application implements strict validation rules:

1. A single source handle can only output one connection (preventing invalid branching).

2. Target handles can receive multiple incoming connections.

3. The flow cannot be saved if there are disconnected nodes (specifically, more than one node lacking an incoming target connection).

Bonus Features Implemented:

1. Persistent Storage: Flows are saved directly to the browser's Local Storage.

2. Premium UX/UI: Polished styling with Tailwind CSS, featuring glassmorphism effects, interactive hover states, and smooth animations.

3. Delete Functionality: Easily remove nodes and their associated edges via the settings panel.

## Tech Stack

1. Framework: React.js (with Vite for fast compilation)

2. Language: TypeScript

3. Flow Library: React Flow (reactflow)

4. Styling: Tailwind CSS

5. Icons: Lucide React


## Application Usage Steps

Here is how to use the Chatbot Flow Builder:

 Adding Nodes to the Canvas:

  1. Look at the Block Library in the right-hand sidebar.

2. Click and hold the Text Message block.

3. Drag it over to the grid canvas and drop it to create a new message node.

 Editing Message Content:

1. Click on any message node on the canvas.

2. The right sidebar will transition into the Settings Panel.

3. Type your desired message into the text area. The node on the canvas will update in real-time.

4. Click the Back Arrow at the top of the Settings Panel (or click on the empty canvas) to return to the Block Library.

Connecting Nodes:

1. Hover over a node to reveal its connection handles (small dots on the left and right).

2. Click and drag from the Right Handle (Source) of your first message.

3. Drop the connection line onto the Left Handle (Target) of your second message.

Note: If you try to drag a second line from a Source handle that is already connected, the app will show an error notification.

Deleting Nodes

1. Select the node you wish to delete by clicking on it.

2. In the Settings Panel, click the red Delete Message button at the bottom.

3. Any edges connected to this node will be automatically cleaned up.

## Installation

If you wish to run this project locally:

1. Clone the repository:

```bash
https://github.com/zerotwoadarsh/BiteSpeed.git
```

2. Navigate to the project directory:

```bash
cd bitespeed
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to http://localhost:5173.

## Deployed Link


https://bite-speed-two.vercel.app/
