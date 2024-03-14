import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import useLoading from '../hook/customHook';

const Registration = () => {
    const isLoading = useLoading();

    return (
        <>
            {isLoading && <Loader />}

            <div class="breadcrumb-section breadcrumb-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 offset-lg-2 text-center">
                            <div class="breadcrumb-text">
                                <p>Join With us </p>
                                <h1>Registration</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="checkout-section mt-100 mb-150">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-9 mx-auto text-center">
                            <div class="checkout-accordion-wrap">
                                <div class="accordion" id="accordionExample">
                                    <div class="card single-accordion">
                                        <div class="card-header" id="headingOne">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link" type="button" data-toggle="collapse"
                                                    data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Enter Details For Registration
                                                </button>
                                            </h5>
                                        </div>


                                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                                            data-parent="#accordionExample">
                                            <div class="card-body">
                                                <div class="billing-address-form">
                                                    <form>
                                                        <p>
                                                            <input type="text" placeholder="Email" />
                                                        </p>
                                                        <p>
                                                            <input type="tel" placeholder="Phone Number" />
                                                        </p>
                                                        <p>
                                                            <input type="password" placeholder="Password" />
                                                        </p>
                                                        <p>
                                                            <input type="password" placeholder="Confirm Password" />
                                                        </p>

                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">

                                    </div>

                                    <div class="card single-accordion">
                                        <div class="card-header" id="headingOne">
                                            <Link to="/login">
                                                <h5 class='create-post-submit-btn'>
                                                    <span>
                                                        Create Account
                                                    </span>
                                                </h5>
                                            </Link>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-row-reverse justify-content-between">
                                        <div class="hero-btns">
                                            <Link to="/login" class="boxed-btn" id="boxed-btn">Already have an
                                                account?</Link>
                                        </div>
                                        <div class="hero-btns">
                                            <Link to="/forget-password-start" class="boxed-btn" id="boxed-btn">Forget
                                                Password?</Link>

                                        </div>
                                    </div>



                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};

export default Registration;