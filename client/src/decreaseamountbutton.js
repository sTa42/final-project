import { useDispatch } from "react-redux";
import { decreaseAmount } from "./redux/cart/slice";
import RemoveIcon from "@mui/icons-material/Remove";

export default function DecreaseAmountButton(props) {
    const dispatch = useDispatch();

    // console.log("PROPS FROM DECREASE BUTTON: ", props);
    const increaseClickHandler = (e) => {
        e.stopPropagation();
        dispatch(decreaseAmount(props.id));
    };
    return (
        <RemoveIcon
            className="shoppingIcon"
            fontSize="large"
            onClick={increaseClickHandler}
        ></RemoveIcon>
    );
}
