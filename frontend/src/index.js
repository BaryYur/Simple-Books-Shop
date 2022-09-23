import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';
import { BookItemsContextProvider } from './store/items-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BookItemsContextProvider>
      <AuthContextProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </AuthContextProvider>
  </BookItemsContextProvider>
);
