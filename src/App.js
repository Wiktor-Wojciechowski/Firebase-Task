import { BrowserRouter, Routes, Route } from 'react-router-dom'

//importing components
import Topbar from './components/Topbar';
import About from './components/About';
import AccountManagement from './components/AccountManagement';
import Blog from './components/Blog';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import PrivateRoute from './components/PrivateRoute';
import Error404 from './components/Error404';
import Sidebar from './components/Sidebar'
import Map from './components/Map';

//importing context
import { AuthProvider } from './context/AuthContext.js'

import './css/styles.css';
import Contact from './components/Contact';


function App() {

  return (
    <AuthProvider>
      <div id="app-container">
        <BrowserRouter>
          <Topbar />
          <Sidebar />
          <div className="main-component">
            <Routes>
              <Route path='/about' element={<About />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/login' element={<Login />} />
              <Route path='/map' element={<Map />} />
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
              <Route path='/account-management' element={
                <PrivateRoute>
                  <AccountManagement />
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
