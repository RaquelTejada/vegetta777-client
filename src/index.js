import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProviderWrapper } from './contexts/auth.context';
import { VideogameProviderWrapper } from './contexts/videogame.context'
import { MessageProviderWrapper } from './contexts/userMessage.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProviderWrapper>
      <MessageProviderWrapper>
        <VideogameProviderWrapper>
          <Router>
            <App />
          </Router>
        </VideogameProviderWrapper>
      </MessageProviderWrapper>
    </AuthProviderWrapper>
  </React.StrictMode>
)

export default App