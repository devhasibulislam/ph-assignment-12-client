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
import ErrorPage from './routes/ErrorPage/ErrorPage';
import Purchase from './shared/Purchase';
import Dashboard from './routes/Dashboard/Dashboard';
import MyOrders from './routes/Dashboard/User/MyOrders';
import AddingReview from './routes/Dashboard/User/AddingReview';
import AddProduct from './routes/Dashboard/Admin/AddProduct';
import MakeAdmin from './routes/Dashboard/Admin/MakeAdmin';
import ManageOrders from './routes/Dashboard/Admin/ManageOrders';
import ManageProducts from './routes/Dashboard/Admin/ManageProducts';
import MyProfile from './components/MyProfile';
import AllReview from './routes/Home/AllReview';
import Payment from './routes/Dashboard/User/Payment';

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
          path='/purchase/:id'
          element={
            <RequireAuth>
              <Purchase />
            </RequireAuth>
          }
        />

        {/* nested route */}
        <Route
          path='/dashboard'
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          {/* user segment */}
          <Route
            index
            element={<MyOrders />}
          />
          <Route
            path='addingReview'
            element={<AddingReview />}
          />
          <Route
            path='payment/:id'
            element={<Payment />}
          />

          {/* admin segment */}
          <Route
            path='addProduct'
            element={<AddProduct />}
          />
          <Route
            path='makeAdmin'
            element={<MakeAdmin />}
          />
          <Route
            path='manageOrders'
            element={<ManageOrders />}
          />
          <Route
            path='manageProducts'
            element={<ManageProducts />}
          />
        </Route>

        <Route
          path='/myProfile'
          element={<MyProfile />}
        />

        <Route
          path='/allReviews'
          element={<AllReview />}
        />

        <Route
          path='/blog'
          element={
            <Blogs />
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
