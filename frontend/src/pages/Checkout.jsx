import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Loader from '../components/Loader/Loader';
import axios from '../helper/axios-helper.js';
import useLoading from '../hook/customHook';

const Checkout = () => {

    const isLoading = useLoading();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const storeData = useSelector(state => state.auth);
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        bill: ''
    });


    useEffect(() => {
        if (storeData && storeData?.user) {
            const cartData = localStorage.getItem(storeData.user.email);

            if (cartData) {
                const parsedCart = JSON.parse(cartData);
                const items = Object.values(parsedCart);
                setCartItems(items);
            }
        }
    }, [storeData]);
    const subtotal = cartItems.reduce((total, item) => {
        return total + item.count * parseFloat(item.product.price);
    }, 0);

    const shippingCost = 45;

    const total = subtotal + shippingCost;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    console.log(formData);

    const handleSubmit = async (payment_id) => {
        const orderData = JSON.stringify({
            name: formData.name,
            address: formData.address,
            phone: formData.phone,
            bill: formData.bill,
            payment_id: payment_id,
            total_price: total,
            cart_items: cartItems.map(item => ({
                product_id: item.product.id,
                quantity: item.count
            }))
        });
        console.log('order', orderData);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${storeData.token}`
            }
        };
        axios.post('/create_order/', orderData, config)
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Successfully placed the order!!!");
                    localStorage.removeItem(storeData.user.email);
                    navigate('/orders');
                }
            })
            .catch(err => {
                toast.error("Something went wrong!!!");
            });
    };
    return (
        <>
            {(isLoading || loading) && <Loader />}

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
                                                    Billing & Shipping Address
                                                </button>
                                            </h5>
                                        </div>

                                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                                            data-parent="#accordionExample">
                                            <div class="card-body">
                                                <div class="billing-address-form">
                                                    <form>
                                                        <p><input
                                                            type="text"
                                                            name="name"
                                                            placeholder="Name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            required
                                                        /></p>
                                                        <p><input
                                                            type="text"
                                                            name="address"
                                                            placeholder="Address"
                                                            value={formData.address}
                                                            onChange={handleChange}
                                                            required
                                                        /></p>
                                                        <p><input
                                                            type="tel"
                                                            name="phone"
                                                            placeholder="Phone"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            required
                                                        /></p>
                                                        <p><textarea
                                                            name="bill"
                                                            id="bill"
                                                            cols="30"
                                                            rows="10"
                                                            placeholder="Say Something"
                                                            value={formData.bill}
                                                            onChange={handleChange}
                                                        ></textarea></p>

                                                    </form>
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
                                                                                value: total,
                                                                            },
                                                                        },
                                                                    ],
                                                                });
                                                            }}
                                                            onApprove={async (data, actions) => {
                                                                try {
                                                                    const details = await actions.order.capture();
                                                                    await handleSubmit(details.id);

                                                                } catch (error) {
                                                                    toast.error("Something went wrong!!!");
                                                                }
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
                                            <th>Product</th>
                                            <th>Count</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody class="order-details-body">
                                        {Object.keys(cartItems).map((key) => {
                                            const item = cartItems[key];
                                            return (
                                                <tr key={key} className="order-details-row">
                                                    <td>{item.product.name}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.count}</td>
                                                    <td>{(item.count * parseFloat(item.product.price)).toFixed(2)} tk</td>
                                                </tr>
                                            );
                                        })}

                                    </tbody>
                                    <tbody class="checkout-details">

                                        <tr>
                                            <td>Shipping</td>
                                            <td></td>

                                            <td>45 tk</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Total: </strong></td>
                                            <td></td>

                                            <td>{total.toFixed(2)} tk</td>
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