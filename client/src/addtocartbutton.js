import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cart/slice";

export default function AddToCartButton(props) {
    const dispatch = useDispatch();

    console.log("PROPS FROM THE BUTTON: ", props);
    const addToCartClickHandler = (e) => {
        e.stopPropagation();
        dispatch(addToCart(props.id));
        // fetch(`/api/v1/cart/additem`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ item: props.id }),
        // })
        //     .then((resp) => resp.json())
        //     .then((data) => {
        //         if (data.success) {
        //             // dispatch(receiveCart());

        //             console.log("Added item to cart was successful", data);
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("ERROR POSTING ITEM TO CART: ", err);
        //     });
    };
    return <button onClick={addToCartClickHandler}>Add To Cart</button>;
}
