import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Banner from './components/Banner'
import Account from './pages/Account.jsx'
import { AjoutListProvider, IsPlayingProvider, ManhwaProvider, OtherManhwaProvider, UserProvider } from './utils/Context.jsx'
import { AuthProvider } from './utils/AuthContext.jsx'
import User from './pages/User.jsx'
import Stat from './pages/Stat.jsx'
import Error from './pages/Error.jsx'
import Tag from './pages/Tag.jsx'
import ManhwaPage from './pages/ManhwaPage.jsx'
import UpdatePassword from './pages/UpdatePassword.jsx'
import Manhwa from './pages/Manhwa.jsx'
import Search from './pages/Search.jsx'
import ManhwaPagePublic from './pages/ManhwaPagePublic.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ManhwaProvider>
          <UserProvider>
            <OtherManhwaProvider>
              <AjoutListProvider>
                <IsPlayingProvider>
                  <Banner />
                  <Routes>
                    <Route path='/' element={<App />}/>
                    <Route path='/stat/:id?' element={<Stat />}/>
                    <Route path="/account" element={<Account />}/>
                    <Route path="/user/:id" element={<User />}/>
                    <Route path='/manhwa/:id/:titre' element={<ManhwaPage />}/>
                    <Route path='/manhwa-liste' element={<Manhwa />}/>
                    <Route path='/search/:titre' element={<Search />}/>
                    <Route path='/manhwa-p/:id/:titre' element={<ManhwaPagePublic />}/>
                    <Route path="/account/update-password" element={<UpdatePassword />}/>
                    <Route path="/*" element={<Error />}/>
                  </Routes>
                </IsPlayingProvider>
              </AjoutListProvider>
            </OtherManhwaProvider>
          </UserProvider>
        </ManhwaProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
