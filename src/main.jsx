import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Banner from './components/Banner'
import Account from './pages/Account.jsx'
import { AjoutListProvider, ManhwaProvider, OtherManhwaProvider, UserProvider } from './utils/Context.jsx'
import { AuthProvider } from './utils/AuthContext.jsx'
import User from './pages/User.jsx'
import Stat from './pages/Stat.jsx'
import Error from './pages/Error.jsx'
// import UpdatePassword from './pages/UpdatePassword.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ManhwaProvider>
          <UserProvider>
            <OtherManhwaProvider>
              <AjoutListProvider>
                <Banner />
                <Routes>
                  <Route path='/' element={<App />}/>
                  <Route path='/stat/:id?' element={<Stat />}/>
                  <Route path="/account" element={<Account />}/>
                  <Route path="/user/:id" element={<User />}/>
                  <Route path="/*" element={<Error />}/>
                  {/* <Route path="/account/update-password" element={<UpdatePassword />}/> */}
                </Routes>
              </AjoutListProvider>
            </OtherManhwaProvider>
          </UserProvider>
        </ManhwaProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
