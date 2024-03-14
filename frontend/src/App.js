import "react-toastify/dist/ReactToastify.css";
import "./assets/bootstrap/css/bootstrap.min.css";
import './assets/css/all.min.css';
import "./assets/css/animate.css";
import "./assets/css/magnific-popup.css";
import "./assets/css/main.css";
import "./assets/css/meanmenu.min.css";
import "./assets/css/owl.carousel.css";
import "./assets/css/responsive.css";

import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import ForgetPasswordConfirm from "./pages/ForgetPasswordConfirm";
import ForgetPasswordStart from "./pages/ForgetPasswordStart";
import HomePage from './pages/HomePage';
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Registration from "./pages/Registration";
import Shop from "./pages/Shop";
import SinglePackage from "./pages/SinglePackage";
import SinglePackageBuild from "./pages/SinglePackageBuild";
import SingleProduct from "./pages/SingleProduct";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path='/single-package-build/:id' element={<SinglePackageBuild />} />
        <Route exact path='/single-package/:id' element={<SinglePackage />} />
        <Route exact path='/single-product/:id' element={<SingleProduct />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/orders' element={<Orders />} />

        <Route exact path='/about' element={<About />} />
        <Route exact path='/checkout' element={<Checkout />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/shop' element={<Shop />} />
        <Route exact path='/forget-password-confirm' element={<ForgetPasswordConfirm />} />
        <Route exact path='/forget-password-start' element={<ForgetPasswordStart />} />
        <Route exact path='/registration' element={<Registration />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/' element={<HomePage />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
