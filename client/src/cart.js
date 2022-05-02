import ProductListing from "./productlisting";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { emptyCart } from "./redux/cart/slice";
import { useDispatch } from "react-redux";

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
            <span>HELLO FROM THE CART</span>
            {!!items.length && (
                <>
                    <div>
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
                    <Link to={"/cart/checkout"}>Go to checkout</Link>
                    <button
                        onClick={() => {
                            dispatch(emptyCart());
                        }}
                    >
                        {"DELETE CART"}
                    </button>
                </>
            )}
        </>
    );
}
