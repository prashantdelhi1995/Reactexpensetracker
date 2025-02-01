import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './components/store/ContextProvider.jsx'
import { Provider } from 'react-redux'
import store from "./components/reduxStore/store.js"

createRoot(document.getElementById('root')).render(
  <StrictMode >
    <Provider store={store}>
    <ContextProvider>
    <App />
    </ContextProvider>
    </Provider>
  </StrictMode>,
)
