import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import useLoading from '../hook/customHook';
const Login = () => {
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
                                <h1>Log In</h1>
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
                                                    Enter Credentials For Login
                                                </button>
                                            </h5>
                                        </div>


                                        <div id="collapseOn" class="collapse show" aria-labelledby="headingOne"
                                            data-parent="#accordionExample">
                                            <div class="card-body">
                                                <div class="billing-address-form">
                                                    <form>
                                                        <p>
                                                            <input type="text" placeholder="Email" />
                                                        </p>
                                                        <p>
                                                            <input type="password" placeholder="Password" />
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
                                            <Link to="/shop">
                                                <h5 class='create-post-submit-btn'>
                                                    <span>
                                                        Login
                                                    </span>
                                                </h5>
                                            </Link>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-row-reverse justify-content-between">
                                        <div class="hero-btns">
                                            <Link to="/registration" class="boxed-btn" id="boxed-btn">Don't have an
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

export default Login;