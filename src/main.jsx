import React from 'react'
import ReactDOM from 'react-dom/client'
import ContextProvider from './context/context.jsx'
import HomePage from './homepage.jsx'
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
    <HomePage />
    </ContextProvider>
  </React.StrictMode>,
)
