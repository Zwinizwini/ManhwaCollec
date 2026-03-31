import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Banner from './components/Banner'
import Account from './pages/Account.jsx'
import { ManhwaProvider, UserProvider } from './utils/Context.jsx'
import { AuthProvider } from './utils/AuthContext.jsx'
import User from './pages/User.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ManhwaProvider>
          <UserProvider>
            <Banner />
            <Routes>
              <Route path='/' element={<App />}/>
              <Route path="/account" element={<Account />}/>
              <Route path="/user/:id" element={<User />}/>
            </Routes>
          </UserProvider>
        </ManhwaProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
