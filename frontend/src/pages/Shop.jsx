import React from 'react';
import { Link } from 'react-router-dom';
import productImage from '../assets/img/products/product-img-4.jpg';
import Loader from '../components/Loader/Loader';
import useLoading from '../hook/customHook';

import './SingleProduct.css';
const Shop = () => {
    const isLoading = useLoading();

    return (
        <>
            {isLoading && <Loader />}

            <div class="breadcrumb-section breadcrumb-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 offset-lg-2 text-center">
                            <div class="breadcrumb-text">
                                <p>Fresh and Organic</p>
                                <h1>Shop</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-section mt-100 mb-150">
                <div class="container">

                    <div class="row">
                        <div class="col-lg-8 offset-lg-2 text-center">
                            <div class="section-title">
                                <h3><span class="orange-text">Our</span> Packages</h3>
                            </div>
                        </div>
                        <div class="latest-news  mb-20">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6">
                                        <div class="single-latest-news">
                                            <Link to="/single-package/1">
                                                <div class="latest-news-bg news-bg-3">
                                                </div>
                                            </Link>
                                            <div className="news-text-box">
                                                <div class="news-text-box">
                                                    <h3><Link to="/single-package/1">Items for Choruivati and Picnic</Link></h3>
                                                    <p class="blog-meta">
                                                        <span class="author"><i class="fas fa-user"></i> Chef Charcoal</span>
                                                        <span class="date"><i class="fas fa-calendar"></i> March 17, 2024</span>
                                                    </p>
                                                    <p class="excerpt">All items for Chorui vati in one corner for purchasing without tension.</p>
                                                    <Link to="/single-package/1" class="read-more-btn">Purchase Package <i
                                                        class="fas fa-angle-right"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="single-latest-news">
                                            <Link to="/single-package/2">
                                                <div class="latest-news-bg news-bg-2"></div>
                                            </Link>
                                            <div class="news-text-box">
                                                <div class="news-text-box">
                                                    <h3><Link to="/single-package/2"> Biriyani for
                                                        Auditorium Package!</Link></h3>
                                                    <p class="blog-meta">
                                                        <span class="author"><i class="fas fa-user"></i> Admin</span>
                                                        <span class="date"><i class="fas fa-calendar"></i> 27 December, 2024</span>
                                                    </p>
                                                    <p class="excerpt">Our Biriyani for Auditorium package is sure to satisfy every
                                                        palate in a juicy matters.
                                                    </p>
                                                    <Link to="/single-package/2" class="read-more-btn">Purchase Package <i
                                                        class="fas fa-angle-right"></i></Link>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-8 offset-lg-2 text-center" style={{ marginTop: '50px' }}>
                            <div class="section-title">
                                <h3><span class="orange-text">Our</span> Daily Products</h3>
                            </div>
                        </div>
                        <div class="col-md-12 mb-20">
                            <div class="product-filters">
                                <ul>
                                    <li class="active">All</li>
                                    <li >Breakfast</li>
                                    <li>Lanch</li>
                                    <li>Dinner</li>
                                </ul>
                            </div>
                        </div>

                        <div class="row product-lists">

                            <div class="col-lg-4 col-md-6 text-center">
                                <div class="single-product-item">
                                    <div class="product-image">
                                        <Link to="/single-product/2"><img src={productImage} alt="" /></Link>
                                    </div>
                                    <h3>Rice</h3>
                                    <div className='rating'>
                                        <span class="fas fa-star checked"></span>
                                        <span class="fas fa-star checked"></span>
                                        <span class="fas fa-star checked"></span>
                                        <span class="fas fa-star-half-alt checked"></span>
                                        <span class="fa-regular fa-star checked"></span>
                                    </div>
                                    <p class="product-price"><span></span> 50tk </p>
                                    <Link to="/cart" class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</Link>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 text-center">
                                <div class="single-product-item">
                                    <div class="product-image">
                                        <Link to="/single-product/2"><img src={productImage} alt="" /></Link>
                                    </div>
                                    <h3>Rice</h3>
                                    <div className='rating'>
                                        <span class="fas fa-star checked"></span>
                                        <span class="fas fa-star checked"></span>
                                        <span class="fas fa-star checked"></span>
                                        <span class="fas fa-star-half-alt checked"></span>
                                        <span class="fa-regular fa-star checked"></span>
                                    </div>
                                    <p class="product-price"><span></span> 50tk </p>
                                    <Link to="/cart" class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</Link>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 text-center">
                                <div class="single-product-item">
                                    <div class="product-image">
                                        <Link to="/single-product/2"><img src={productImage} alt="" /></Link>
                                    </div>
                                    <h3>Rice</h3>
                                    <div className='rating'>
                                        <span class="fas fa-star checked"></span>
                                        <span class="fas fa-star checked"></span>
                                        <span class="fas fa-star checked"></span>
                                        <span class="fas fa-star-half-alt checked"></span>
                                        <span class="fa-regular fa-star checked"></span>
                                    </div>
                                    <p class="product-price"><span></span> 50tk </p>
                                    <Link to="/cart" class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</Link>
                                </div>
                            </div>

                        </div>

                        <div class="row w-100">
                            <div class="col-lg-12 text-center">
                                <div class="pagination-wrap">
                                    <ul>
                                        <li><a href="#">Prev</a></li>
                                        <li><a href="#">1</a></li>
                                        <li><a class="active" href="#">2</a></li>
                                        <li><a href="#">3</a></li>
                                        <li><a href="#">Next</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Shop;