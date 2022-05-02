import { useDispatch } from "react-redux";
import { increaseAmount } from "./redux/cart/slice";

export default function IncreaseAmountButton(props) {
    const dispatch = useDispatch();

    console.log("PROPS FROM Increase BUTTON: ", props);
    const increaseClickHandler = (e) => {
        e.stopPropagation();
        dispatch(increaseAmount(props.id));
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
    return <button onClick={increaseClickHandler}>Add one</button>;
}
