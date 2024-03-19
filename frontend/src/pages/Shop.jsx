import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productImage from '../assets/img/products/product-img-4.jpg';
import Loader from '../components/Loader/Loader';
import axios from '../helper/axios-helper.js';
import useLoading from '../hook/customHook';
import './SingleProduct.css';
const Shop = () => {
    const isLoading = useLoading();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [packages, setPackages] = useState([]);
    useEffect(() => {
        setLoading(true);
        axios.get('/products/')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });

        axios.get('/packages/')
            .then(response => {
                setPackages(response.data);
            })
            .catch(error => {
                console.error('Error fetching packages:', error);
            });
        setLoading(false);

    }, []);
    console.log(products, packages);
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
                        <div class="latest-news mb-20">
                            <div class="container">
                                <div class="row">
                                    {
                                        packages.map(pkg => (
                                            <div key={pkg.id} className="col-lg-6 col-md-6">
                                                <div className="single-latest-news">
                                                    <Link to={`/single-package/${pkg.id}`}>
                                                        <div class="latest-news-bg"
                                                            style={{ backgroundImage: `url(${pkg.image})` }}
                                                        >
                                                        </div>
                                                    </Link>
                                                    <div className="news-text-box">
                                                        <div class="news-text-box">
                                                            <h3><Link to={`/single-package/${pkg.id}`}>{pkg.name}</Link></h3>

                                                            <p class="excerpt">{pkg.description}</p>
                                                            <Link to={`/single-package/${pkg.id}`} class="read-more-btn">Purchase Package <i
                                                                class="fas fa-angle-right"></i></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
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
                            {products.map(product => (
                                <div key={product.id} className="col-lg-4 col-md-6 text-center">
                                    <div className="single-product-item">
                                        <div className="product-image">
                                            <Link to={`/single-product/${product.id}`}><img src={product.image} alt={product.name} /> </Link>
                                        </div>
                                        <h3>{product.name}</h3>
                                        <p className="product-price">${product.price}</p>
                                        <div className="rating">
                                            {/* Render the star icons based on the rating */}
                                            {renderStars(product.rating)}
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                                    <p class="product-price"><span>per Kg</span> 50 tk </p>
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