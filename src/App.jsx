
import './App.css';
import { NavbarComponent } from './component/Pages/NavbarComponent';
import { ProductList } from './component/Pages/ProductList';
import { Login } from './component/Auth/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { EditProductList } from './component/Pages/EditProductList';
import { Register } from './component/Auth/Register';
import PrivateRoute from './component/Auth/PrivateRoute';
import PublicRoute from './component/Auth/publicRoute';
import { AddProduct } from './component/Pages/AddProduct';


function App() {

  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/sign-up";

  

  return (
    // <>
    // {/* <Login /> */}
    // <div className="container mt-4">
    // <ProductList />
    // </div>
    // </>

    <>

      <ToastContainer position="top-left" autoClose={2000} />

      {!hideNavbar && <NavbarComponent />}
      {/* {!hideNavbar && <Register />} */}
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
               <Login />
            </PublicRoute>
            } />
          <Route path="/sign-up" element={
            <PublicRoute>
            <Register />
            </PublicRoute>
            } />
          <Route path="/" element={
           

              <ProductList />} />

          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProductList />} />
        </Routes>
      </div>
    </>
  )
}

export default App
