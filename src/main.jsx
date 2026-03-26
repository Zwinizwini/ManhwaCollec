import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Banner from './components/Banner'
import Account from './components/Account.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Banner />
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path="/account" element={<Account />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
