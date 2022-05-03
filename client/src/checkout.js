import ProductListing from "./productlisting";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { emptyCart } from "./redux/cart/slice";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";

export default function Checkout() {
    const cart = useSelector((state) => state.cartReducer);
    const dispatch = useDispatch();
    const [addresses, setAddresses] = useState([]);
    const [selectedOption, setSelectedOption] = useState(-1);
    const [addressForOrder, setAddressForOrder] = useState(Object);
    const [items, setItems] = useState([]);
    const [checkedOut, setCheckedOut] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [predictedTotalCost, setPredictedTotalCost] = useState(0);

    useEffect(() => {
        fetch(`/api/v1/cart/view.json`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("cart data from server/session: ", data);
                if (data.success) {
                    setItems(data.items);
                    let totalcost = 0;
                    for (let i = 0; i < data.items.length; i++) {
                        console.log(data.items[i].price);
                        console.log(data.items[i].amount);
                        totalcost += data.items[i].price * data.items[i].amount;
                        // const value = Number.parseFloat(
                        //     data.items[i].price * data.items[i].amount
                        // ).toFixed(2);
                        // console.log(value);
                        // totalcost = totalcost + value;
                    }
                    console.log(totalcost);
                    setPredictedTotalCost(
                        Number.parseFloat(totalcost * 1).toFixed(2)
                    );
                }
            })
            .catch((err) => console.log(err));
        fetch(`/api/v1/address/all.json`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("cart data from server/session: ", data);
                if (data.success) {
                    setAddresses(data.addresses);
                    setAddressForOrder(data.addresses[0]);
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
            <h1 className="headline">Checkout</h1>
            {!checkedOut && !!items.length && (
                <>
                    <div>
                        <h4>Items</h4>
                        {items.map((item) => {
                            return (
                                <div key={item.id}>
                                    <p>
                                        {item.name}
                                        {": $"}
                                        {item.price}
                                        {" x"}
                                        <strong>{item.amount}</strong>

                                        {": Total: $"}
                                        <strong>
                                            {Number.parseFloat(
                                                item.amount * item.price
                                            ).toFixed(2)}
                                        </strong>
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    {!!addresses.length && (
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
                                            {`${address.street}, ${address.zipcode}, ${address.city}`}
                                        </option>
                                    );
                                })}
                            </select>
                            {/* {addressForOrder && <>{addressForOrder.id}</>} */}
                        </>
                    )}
                    <p>
                        Total:{" $"}
                        {predictedTotalCost && (
                            <>
                                <strong>
                                    {Number.parseFloat(
                                        predictedTotalCost * 1
                                    ).toFixed(2)}
                                </strong>
                            </>
                        )}
                    </p>
                </>
            )}
            {!addresses.length && (
                <>
                    <p className="">
                        You dont have any addresses yet. Please add one{" "}
                        <strong>
                            <Link className="inline-link" to="/addresses">
                                here
                            </Link>
                        </strong>
                    </p>
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
            {!checkedOut && !!addresses.length && !!items.length && (
                <>
                    <Button variant="contained" onClick={postOrder}>
                        Submit your order
                    </Button>
                </>
            )}{" "}
            {!checkedOut && (
                <>
                    <Link to={"/cart"}>
                        Go back to cart, if you want to change something.
                    </Link>
                </>
            )}
        </>
    );
}
