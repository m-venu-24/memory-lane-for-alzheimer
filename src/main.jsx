import React from 'react';
import ReactDOM from 'react-dom/client';
import MemoryLaneApp from './MemoryLaneApp';
import './index.css';
import './firebase';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MemoryLaneApp />
  </React.StrictMode>,
);
