import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Menu from './MenuComponent';
import Inform from './InformComponent';
import Home from './HomeComponent';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Product from './ProductComponent';
import ProductDetail from './ProductDetailComponent';
import Signup from './SignupComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent';
import Myprofile from './MyprofileComponent';
import Mycart from './MycartComponent';
import Myorders from './MyordersComponent';
import TawkMessenger from './TawkMessengerComponent';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Resetpwd from './ResetpwdComponent';

const Main = () => {
  const location = useLocation();

  const bannerImages = [
    'banner1.jpg',
    'banner2.jpg',
    'banner3.jpg',
  ];

  // Kiểm tra xem URL hiện tại có phải là "/myprofile" hay không
  const isProfilePage = location.pathname === '/myprofile';

  return (
    <div className="body-customer">
      <ToastContainer autoClose={2000} />
      
      {/* Chỉ render Carousel, Menu, và Inform nếu không phải là trang MyProfile */}
      {!isProfilePage && (
        <>
          <div className="main-container">
            <Carousel autoPlay interval={2000} infiniteLoop showThumbs={false}>
              {bannerImages.map((url, index) => (
                <div key={index}>
                  <img src={url} alt={`Banner ${index + 1}`} className="img-responsive" />
                </div>
              ))}
            </Carousel>
          </div>
          <Menu />
          <Inform />
        </>
      )}
      
      <Routes>
        <Route path='/' element={<Navigate replace to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/product/category/:cid' element={<Product />} />
        <Route path='/product/search/:keyword' element={<Product />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/active' element={<Active />} />
        <Route path='/login' element={<Login />} />
        {/* Trang MyProfile */}
        <Route path='/myprofile' element={<Myprofile />} />
        <Route path='/mycart' element={<Mycart />} />
        <Route path='/myorders' element={<Myorders />} />
        <Route path='/resetpwd' element={<Resetpwd />} />
      </Routes>

      {/* Chỉ render TawkMessenger nếu không phải là trang MyProfile */}
      {!isProfilePage && <TawkMessenger />}
    </div>
  );
}

export default Main;
