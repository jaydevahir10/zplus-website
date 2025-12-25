import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Runtime Version Integrity Check
const currentVersion = (React as any).version;
if (currentVersion !== "18.2.0") {
  console.error("CRITICAL: React version mismatch detected. Expected 18.2.0, found:", currentVersion);
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}