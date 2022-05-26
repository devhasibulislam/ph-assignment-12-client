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
import AllProducts from './routes/Dashboard/User/AllProducts';
import Welcome from './routes/Dashboard/Welcome';
import Portfolio from './routes/Portfolio/Portfolio';
import PortfolioHome from './routes/Portfolio/PortfolioHome';
import AboutMe from './routes/Portfolio/AboutMe';
import Education from './routes/Portfolio/Education';
import Project from './routes/Portfolio/Project';
import Technology from './routes/Portfolio/Technology';

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

        <Route
          path='/allProducts'
          element={<AllProducts />}
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
          <Route
            index
            element={<Welcome />}
          />

          <Route
            path='myProfile'
            element={<MyProfile />}
          />
          
          {/* user segment */}
          <Route
            path='myOrder'
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
        {/* portfolio */}
        <Route path='/portfolio' element={<Portfolio />}>
          <Route index element={<PortfolioHome />}></Route>
          <Route path='aboutMe' element={<AboutMe />}></Route>
          <Route path='education' element={<Education />}></Route>
          <Route path='project' element={<Project />}></Route>
          <Route path='technology' element={<Technology />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
