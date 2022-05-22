import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './shared/Navbar';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import Register from './routes/Login/Register';
import Reset from './routes/Login/Reset';
import Blogs from './routes/Blog/Blogs';
import ErrorPage from './shared/ErrorPage/ErrorPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <Home />
          }
        />
        <Route
          path='/home'
          element={
            <Home />
          }
        />
        <Route
          path='/blog'
          element={
            <RequireAuth>
              <Blogs />
            </RequireAuth>
          }
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/reset'
          element={<Reset />}
        />
        <Route
          path='*'
          element={<ErrorPage />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
