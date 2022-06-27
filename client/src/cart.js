import ProductListing from "./productlisting";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

import { emptyCart } from "./redux/cart/slice";
import { useDispatch } from "react-redux";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import LoggedOutButton from "./hooks/loggedOut-button";

export default function Cart() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer);
    const cart = useSelector((state) => state.cartReducer);
    const [items, setItems] = useState([]);
    const history = useHistory();

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
    }, [cart]);

    return (
        <>
            <h1 className="headline">Items currently in cart</h1>
            {!items.length && (
                <p>You dont have any items added to your cart yet.</p>
            )}
            {!!items.length && (
                <>
                    <div className="cart-view-container">
                        {items.map((product) => {
                            return (
                                <ProductListing
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    img={product.picture_url}
                                    cN={"product-listing"}
                                />
                            );
                        })}
                    </div>
                    <div className="checkoutText">
                        {/* <Link to={"/cart/checkout"}>Go to checkout</Link> */}
                        {user.id ? (
                            <Button
                                variant="contained"
                                onClick={() => {
                                    history.replace("/cart/checkout");
                                }}
                            >
                                Go to checkout
                            </Button>
                        ) : (
                            <LoggedOutButton />
                        )}

                        <Button
                            variant="contained"
                            onClick={() => {
                                dispatch(emptyCart());
                            }}
                        >
                            Empty Cart{" "}
                            <RemoveShoppingCartIcon fontSize="large" />
                        </Button>
                        {/* <span
                            className="clear-cart"
                            onClick={() => {
                                dispatch(emptyCart());
                            }}
                        >
                            Empty cart{" "}
                            <RemoveShoppingCartIcon fontSize="large" />
                        </span> */}
                    </div>
                </>
            )}
        </>
    );
}
