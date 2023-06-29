import React from 'react'
import ReactDOM from 'react-dom/client'
import { MemoryRouter as Router } from 'react-router-dom';
import App from './App'
import Menu from './pages/Menu';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
)