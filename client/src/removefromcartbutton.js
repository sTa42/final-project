import { useDispatch } from "react-redux";
import { removeFromCart } from "./redux/cart/slice";

export default function RemoveFromCartButton(props) {
    const dispatch = useDispatch();
    console.log("PROPS FROM THE REMOVE: BUTTON: ", props);
    const removeFromCartClickHandler = (e) => {
        e.stopPropagation();
        dispatch(removeFromCart(props.id));
        // fetch(`/api/v1/cart/removeitem`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ item: props.id }),
        // })
        //     .then((resp) => resp.json())
        //     .then((data) => {
        //         if (data.success) {
        //             console.log("Remove item to cart was successful", data);
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("ERROR REMOVE ITEM FROM CART: ", err);
        //     });
    };
    return (
        <button onClick={removeFromCartClickHandler}>Remove From Cart</button>
    );
}
