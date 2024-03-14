import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import useLoading from '../hook/customHook';

const Checkout = () => {

    const isLoading = useLoading();
    const navigate = useNavigate();

    return (
        <>
            {isLoading && <Loader />}

            <div class="breadcrumb-section breadcrumb-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 offset-lg-2 text-center">
                            <div class="breadcrumb-text">
                                <p>Fresh and Organic</p>
                                <h1>Check Out Product</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="checkout-section mt-150 mb-150">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="checkout-accordion-wrap">
                                <div class="accordion" id="accordionExample">
                                    <div class="card single-accordion">
                                        <div class="card-header" id="headingOne">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link" type="button" data-toggle="collapse"
                                                    data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Billing Address
                                                </button>
                                            </h5>
                                        </div>

                                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                                            data-parent="#accordionExample">
                                            <div class="card-body">
                                                <div class="billing-address-form">
                                                    <form action="index.html">
                                                        <p><input type="text" placeholder="Name" /></p>
                                                        <p><input type="email" placeholder="Email" /></p>
                                                        <p><input type="text" placeholder="Address" /></p>
                                                        <p><input type="tel" placeholder="Phone" /></p>
                                                        <p><textarea name="bill" id="bill" cols="30" rows="10"
                                                            placeholder="Say Something"></textarea></p>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card single-accordion">
                                        <div class="card-header" id="headingTwo">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                                    data-target="#collapseTwo" aria-expanded="false"
                                                    aria-controls="collapseTwo">
                                                    Shipping Address
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                                            data-parent="#accordionExample">
                                            <div class="card-body">
                                                <div class="shipping-address-form">
                                                    <p>Your shipping address form is here.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card single-accordion">
                                        <div class="card-header" id="headingThree">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                                    data-target="#collapseThree" aria-expanded="false"
                                                    aria-controls="collapseThree">
                                                    Confirm Payment & Place Order
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree"
                                            data-parent="#accordionExample">
                                            <div class="card-body">
                                                <div class="card-details">

                                                    <PayPalScriptProvider options={{ "client-id": "AXFehoPpdZVzLMN4eU4bygIsn5cm3PBjaj35f48akBld5o9jV7AxswMTo8e5UUiDCBGCbK0C4I5S9JCr" }}>
                                                        <PayPalButtons
                                                            createOrder={(data, actions) => {
                                                                return actions.order.create({
                                                                    purchase_units: [
                                                                        {
                                                                            amount: {
                                                                                value: 20,
                                                                            },
                                                                        },
                                                                    ],
                                                                });
                                                            }}
                                                            onApprove={async (data, actions) => {
                                                                try {
                                                                    const details = await actions.order.capture();
                                                                    console.log(details);
                                                                    window.location.href = '/orders';
                                                                } catch (error) {
                                                                    console.error("Error capturing PayPal payment:", error);
                                                                    window.location.href = '/orders';

                                                                }
                                                            }}
                                                            onCancel={() => {
                                                                window.location.href = '/orders';
                                                            }}
                                                        />
                                                    </PayPalScriptProvider>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="order-details-wrap">
                                <table class="order-details">
                                    <thead>
                                        <tr>
                                            <th>Your order Details</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody class="order-details-body">

                                        <tr>
                                            <td>Chicken Curry</td>
                                            <td>85 tk</td>
                                        </tr>
                                        <tr>
                                            <td>Dal</td>
                                            <td>20 tk</td>
                                        </tr>
                                        <tr>
                                            <td>Doichira</td>
                                            <td>35 tk</td>
                                        </tr>
                                    </tbody>
                                    <tbody class="checkout-details">
                                        <tr>
                                            <td>Subtotal</td>
                                            <td>140 tk</td>
                                        </tr>
                                        <tr>
                                            <td>Shipping</td>
                                            <td>45 tk</td>
                                        </tr>
                                        <tr>
                                            <td>Total</td>
                                            <td>185 tk</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;