import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import App from '../src/App';

const root = document.getElementById('root');

const result = (
  <Suspense fallback={<span></span>}>
    <App />
  </Suspense>
);

const rootElement = ReactDOM.createRoot(root);
rootElement.render(result);
