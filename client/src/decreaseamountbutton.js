import { useDispatch } from "react-redux";
import { decreaseAmount } from "./redux/cart/slice";

export default function DecreaseAmountButton(props) {
    const dispatch = useDispatch();

    console.log("PROPS FROM DECREASE BUTTON: ", props);
    const increaseClickHandler = (e) => {
        e.stopPropagation();
        dispatch(decreaseAmount(props.id));
    };
    return <button onClick={increaseClickHandler}>Remove one</button>;
}
