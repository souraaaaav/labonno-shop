import { Link } from 'react-router-dom';
import avatar from '../assets/img/avaters/avatar1.png';
import avatar2 from '../assets/img/avaters/avatar2.png';
import productImage from '../assets/img/products/product-img-1.png';
import Loader from '../components/Loader/Loader';
import useLoading from '../hook/customHook';
import './SingleProduct.css';
const SingleProduct = () => {
    const isLoading = useLoading();

    return (

        <>
            {isLoading && <Loader />}

            <div class="breadcrumb-section breadcrumb-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 offset-lg-2 text-center">
                            <div class="breadcrumb-text">
                                <p>See more Details</p>
                                <h1>Single Package</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="single-product mt-150 mb-150">
                <div class="container">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="single-product-img">
                                <img src={productImage} alt="" />
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="single-product-content">
                                <h3>Chicken curry</h3>
                                <div className='rating'>
                                    <span class="fas fa-star checked"></span>
                                    <span class="fas fa-star checked"></span>
                                    <span class="fas fa-star checked"></span>
                                    <span class="fas fa-star-half-alt checked"></span>
                                    <span class="fa-regular fa-star checked"></span>
                                </div>
                                <p class="single-product-pricing"><span></span> 85tk</p>
                                <p>Our delicious curry specially crafted for large gatherings.Our curry is sure to satisfy every palate.
                                </p>
                                <div class="single-product-form">
                                    <Link to="/cart" class="cart-btn"> <i class="fas fa-shopping-cart"></i> Add to cart</Link>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="comments-list-wrap">
                            <h3 class="comment-count-title">3 Comments</h3>
                            <div class="comment-list">
                                <div class="single-comment-body">
                                    <div class="comment-user-avater">
                                        <img src={avatar} alt="" />
                                    </div>
                                    <div class="comment-text-body">
                                        <h4>Jenny Joe <span class="comment-date">May 11, 2020</span> </h4>
                                        <p>Best biriyani ever. Our delicious Biriyani specially crafted for large gatherings.Our Biriyani for Auditorium package is sure to satisfy every palate
                                        </p>
                                    </div>
                                </div>
                                <div class="single-comment-body">
                                    <div class="comment-user-avater">
                                        <img src={avatar2} alt="" />

                                    </div>
                                    <div class="comment-text-body">
                                        <h4>Addy Aoe <span class="comment-date">May 12, 2020</span></h4>
                                        <p>Best biriyani ever.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="col-lg-12">
                        <div class="comment-template">
                            <h4>Leave a comment</h4>
                            <p>If you have a comment dont feel hesitate to send us your opinion.</p>
                            <form action="index.html">

                                <p><textarea name="comment" id="comment" cols="20" rows="3" placeholder="Your Message"></textarea></p>
                                <p><input type="submit" value="Submit" /></p>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>

    );
};

export default SingleProduct;