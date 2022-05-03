import { useDispatch } from "react-redux";
import { removeFromCart } from "./redux/cart/slice";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

export default function RemoveFromCartButton(props) {
    const dispatch = useDispatch();
    // console.log("PROPS FROM THE REMOVE: BUTTON: ", props);
    const removeFromCartClickHandler = (e) => {
        e.stopPropagation();
        dispatch(removeFromCart(props.id));
    };
    return (
        <RemoveShoppingCartIcon
            className="shoppingIcon"
            fontSize="large"
            onClick={removeFromCartClickHandler}
        ></RemoveShoppingCartIcon>
    );
}
