import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter basename="/InvestIQ/">
      <App />
    </BrowserRouter>
    </ Provider>
  </StrictMode>,
)
