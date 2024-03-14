import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/img/White logo - no background.png';
import profile_pic from '../../assets/img/avaters/avatar1.png';
import './Header.css';
const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const isScrolled = currentScrollPos > 0;
            setIsScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const menuToggle = () => {
        console.log('clicked');
        const toggleMenu = document.querySelector(".menu");
        toggleMenu.classList.toggle("active");
    };
    return (
        <div id="sticker-sticky-wrapper" class="sticky-wrapper is-sticky">
            <div className={`top-header-area ${isScrolled ? 'scrolled' : ''}`} id="sticker" style={{ 'position': 'fixed', 'top': '0px', 'z-index': 'inherit' }}>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-sm-12 text-center">
                            <div class="main-menu-wrap">

                                <div class="site-logo">
                                    <Link to="/">
                                        <img src={logo} alt="" />
                                    </Link>
                                </div>



                                <nav class="main-menu">
                                    <ul>
                                        <li>
                                            <NavLink exact to="/"
                                                className={({ isActive }) => isActive ? "current-list-item" : ""}>Home</NavLink>
                                        </li>
                                        <li>
                                            <NavLink exact to="/shop"
                                                className={({ isActive }) => isActive ? "current-list-item" : ""}>Menu</NavLink>
                                        </li><li>
                                            <NavLink exact to="/orders"
                                                className={({ isActive }) => isActive ? "current-list-item" : ""}>My Orders</NavLink>
                                        </li><li>
                                            <NavLink exact to="/about"
                                                className={({ isActive }) => isActive ? "current-list-item" : ""}>About us</NavLink>
                                        </li>
                                        <li>
                                            <NavLink exact to="/contact"
                                                className={({ isActive }) => isActive ? "current-list-item" : ""}>Contact us</NavLink>
                                        </li>
                                        <li>
                                            <div class="header-icons">
                                                <Link class="shopping-cart" to="/cart">Cart <i class="fas fa-shopping-cart"></i> </Link>
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                                <div className='logout-button'>
                                    <div class="action" >
                                        <div class="profile">
                                            <img src={profile_pic} onClick={menuToggle} />
                                        </div>
                                        <div class="menu">
                                            <h3>Sourav Debnath<br />
                                                {/* <span> Acting as SelleR</span> */}
                                            </h3>
                                            <ul>

                                                <li>
                                                    {/* <img src={profile_pic} /> */}
                                                    <span>Logout</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="mobile-menu"></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;