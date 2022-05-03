import ProductListing from "./productlisting";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { emptyCart } from "./redux/cart/slice";
import { useDispatch } from "react-redux";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

export default function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cartReducer);
    const [items, setItems] = useState([]);

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
                                />
                            );
                        })}
                    </div>
                    <div className="checkoutText">
                        <Link to={"/cart/checkout"}>Go to checkout</Link>
                        <span
                            className="clear-cart"
                            onClick={() => {
                                dispatch(emptyCart());
                            }}
                        >
                            Empty cart{" "}
                            <RemoveShoppingCartIcon fontSize="large" />
                        </span>
                    </div>
                </>
            )}
        </>
    );
}
