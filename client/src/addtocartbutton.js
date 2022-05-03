import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cart/slice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function AddToCartButton(props) {
    const dispatch = useDispatch();

    // console.log("PROPS FROM THE BUTTON: ", props);
    const addToCartClickHandler = (e) => {
        e.stopPropagation();
        dispatch(addToCart(props.id));
    };
    return (
        <AddShoppingCartIcon
            className="shoppingIcon"
            fontSize="large"
            onClick={addToCartClickHandler}
        ></AddShoppingCartIcon>
    );
}
