import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader/Loader';
import axios from '../helper/axios-helper';
import useLoading from '../hook/customHook';
import './SingleProduct.css';
const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const isLoading = useLoading();
    const storeData = useSelector(state => state.auth);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/products/${id}/`);
                setProduct(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);
    function renderStars(rating) {
        const stars = [];
        const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5

        for (let i = 1; i <= 5; i++) {
            if (i <= roundedRating) {
                // Full star
                stars.push(<span key={i} className="fas fa-star checked"></span>);
            } else if (i - 0.5 === roundedRating) {
                // Half star
                stars.push(<span key={i} className="fas fa-star-half-alt checked"></span>);
            } else {
                // No rating star
                stars.push(<span key={i} className="fa-regular fa-star checked"></span>);
            }
        }

        return stars;
    }
    const addToCart = (product) => {
        const email = storeData?.user?.email;
        let cartData = localStorage.getItem(email);
        if (!cartData) {
            cartData = {};
        } else {
            cartData = JSON.parse(cartData);
        }
        if (cartData[product.id]) {
            cartData[product.id].count += 1;
        } else {
            cartData[product.id] = {
                product: product,
                count: 1
            };
        }

        localStorage.setItem(email, JSON.stringify(cartData));
        toast.success(`${product.name} added to the cart`);
    };
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
                    {product &&
                        <div class="row">
                            <div class="col-md-5">
                                <div class="single-product-img">
                                    <img src={product.image} alt="" />
                                </div>
                            </div>
                            <div class="col-md-7">
                                <div class="single-product-content">
                                    <h3>{product.name}</h3>
                                    <div className='rating'>
                                        {renderStars(product.rating)}
                                    </div>
                                    <p class="single-product-pricing"><span></span> {product.price}</p>
                                    <p>{product.description}
                                    </p>
                                    <div class="single-product-form">
                                        <span onClick={() => addToCart(product)} class="cart-btn"> <i class="fas fa-shopping-cart"></i> Add to cart</span>

                                    </div>

                                </div>
                            </div>
                        </div>
                    }
                    {/* <div class="row">
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
                    </div> */}

                </div>
            </div>
        </>

    );
};

export default SingleProduct;