import ProductListing from "./productlisting";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { emptyCart } from "./redux/cart/slice";
import { useDispatch } from "react-redux";

export default function () {
    const cart = useSelector((state) => state.cartReducer);
    const dispatch = useDispatch();
    const [addresses, setAddresses] = useState([]);
    const [selectedOption, setSelectedOption] = useState(-1);
    const [addressForOrder, setAddressForOrder] = useState(Object);
    const [items, setItems] = useState([]);
    const [checkedOut, setCheckedOut] = useState(false);
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        fetch(`/api/v1/cart/view.json`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("cart data from server/session: ", data);
                if (data.success) {
                    setItems(data.items);
                }
            })
            .catch((err) => console.log(err));
        fetch(`/api/v1/address/all.json`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("cart data from server/session: ", data);
                if (data.success) {
                    setAddresses(data.addresses);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const postOrder = () => {
        fetch(`/api/v1/order/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart, address: addressForOrder }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Data after posting order,", data);
                if (data.success) {
                    setCheckedOut(true);
                    setItems([]);
                    setOrderId(data.order_id);

                    dispatch(emptyCart());
                }
            })
            .catch((err) => {
                console.log("ERROR POSTING ORDER: ", err);
            });
    };

    return (
        <>
            <span>Checkout</span>

            {!checkedOut && !!items.length && (
                <>
                    {items.map((item) => {
                        return (
                            <div key={item.id}>
                                {item.name} {item.amount} {item.price}
                            </div>
                        );
                    })}
                    {addresses && (
                        <>
                            <select
                                value={selectedOption}
                                onChange={(e) => {
                                    console.log(e.target.value);

                                    setSelectedOption(e.target.value);
                                    setAddressForOrder(
                                        addresses[e.target.value]
                                    );
                                }}
                            >
                                {addresses.map((address, index) => {
                                    return (
                                        <option key={address.id} value={index}>
                                            {`${address.id}: ${address.street}, ${address.zipcode}, ${address.city}`}
                                        </option>
                                    );
                                })}
                            </select>
                            {addressForOrder && <>{addressForOrder.id}</>}
                        </>
                    )}
                </>
            )}
            {checkedOut && orderId && (
                <div>
                    <p>Thank you for your order!</p>
                    <Link to={`/order/${orderId}`}>
                        See your status of your order here
                    </Link>
                </div>
            )}
            {!checkedOut && (
                <>
                    <button onClick={postOrder}>Confirm Order</button>
                    <Link to={"/cart"}>
                        Go back to cart, if you want to change something.
                    </Link>
                </>
            )}
        </>
    );
}
