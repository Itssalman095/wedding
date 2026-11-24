import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { motionOverride } from './lib/motion';
import './styles/global.css';
import './styles/content.css';

if (motionOverride() === 'full') {
  document.documentElement.classList.add('force-motion');
}

// A shared wedding link should always open at the envelope, never mid-page.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
