import { useDispatch } from "react-redux";
import { increaseAmount } from "./redux/cart/slice";
import AddIcon from "@mui/icons-material/Add";

export default function IncreaseAmountButton(props) {
    const dispatch = useDispatch();

    // console.log("PROPS FROM Increase BUTTON: ", props);
    const increaseClickHandler = (e) => {
        e.stopPropagation();
        dispatch(increaseAmount(props.id));
    };
    return (
        <AddIcon
            className="shoppingIcon"
            fontSize="large"
            onClick={increaseClickHandler}
        ></AddIcon>
    );
}
