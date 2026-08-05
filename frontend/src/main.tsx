import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google'

const CLIETN_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/InvestIQ/">
        <GoogleOAuthProvider clientId={CLIETN_ID}>
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </ Provider>
  </StrictMode>,
)
