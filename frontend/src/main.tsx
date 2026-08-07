import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { store, persistor } from './redux/store.ts'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/InvestIQ/">
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)