// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BookshelfProvider } from './BookshelfContext';

ReactDOM.render(
  <React.StrictMode>
    <BookshelfProvider>
      <App />
    </BookshelfProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
