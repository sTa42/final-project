import { useHistory, Link } from "react-router-dom";
import AddToCartButton from "./addtocartbutton";
import IncreaseAmountButton from "./increaseamountbutton";
import DecreaseAmountButton from "./decreaseamountbutton";
import RemoveFromCartButton from "./removefromcartbutton";
import { useDispatch, useSelector } from "react-redux";

export default function ProductListing(props) {
    console.log("props from productlisting: ", props);
    // const history = useHistory();
    const item = useSelector((state) => state.cartReducer[props.id]);

    return (
        <div>
            <Link to={`/product/${props.id}`}></Link>
            <div>{props.name}</div>
            {!item && <AddToCartButton id={props.id} />}

            {item && (
                <>
                    <IncreaseAmountButton id={props.id} />

                    {item.amount > 0 && (
                        <>
                            {item.amount > 1 && (
                                <DecreaseAmountButton id={props.id} />
                            )}
                            <RemoveFromCartButton id={props.id} />
                        </>
                    )}
                    <span>AMOUNT: {item.amount}</span>
                </>
            )}
        </div>
    );
}
