import { BrowserRouter, Routes, Route } from 'react-router-dom'

//importing components
import About from './components/About';
import AccountSettings from './components/AccountSettings';
import Blog from './components/Blog';
import Chat from './components/Chat';
import Contact from './components/Contact';
import Error404 from './components/Error404';
import Login from './components/Login';
import Map from './components/Map';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar';
import UserList from './components/UserList';

//importing context
import { AuthProvider } from './context/AuthContext.js'

import './css/styles.css';



function App() {

  return (
    <AuthProvider>
      <div id="app-container">
        <BrowserRouter>
          <Topbar />

          <div className="main-component">
            <Routes>
              <Route path='/about' element={<About />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/login' element={<Login />} />

              <Route path='/register' element={<Register />} />
              <Route path="/chat" element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              } />
              <Route path="/" element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              } />
              <Route path='/account-settings' element={
                <PrivateRoute>
                  <AccountSettings />
                </PrivateRoute>
              } />
              <Route path='/users' element={
                <PrivateRoute>
                  <UserList />
                </PrivateRoute>
              } />

              <Route path='/map' element={
                <PrivateRoute>
                  <Map />
                </PrivateRoute>
              } />

              <Route path="*" element={<Error404 />} />

            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
