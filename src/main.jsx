import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Banner from './components/Banner'
import Account from './pages/Account.jsx'
import { ManhwaProvider } from './utils/Context.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ManhwaProvider>
        <Banner />
        <Routes>
          <Route path='/' element={<App />}/>
          <Route path="/account" element={<Account />}/>
        </Routes>
      </ManhwaProvider>
    </BrowserRouter>
  </StrictMode>,
)
