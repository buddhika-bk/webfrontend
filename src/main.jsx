import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Get root element
const rootElement = document.getElementById('root')

// Render React app
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
