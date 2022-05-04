import { useHistory, Link } from "react-router-dom";
import AddToCartButton from "./addtocartbutton";
import IncreaseAmountButton from "./increaseamountbutton";
import DecreaseAmountButton from "./decreaseamountbutton";
import RemoveFromCartButton from "./removefromcartbutton";
import { useDispatch, useSelector } from "react-redux";

export default function ProductListing(props) {
    // console.log("props from productlisting: ", props);
    // const history = useHistory();
    const item = useSelector((state) => state.cartReducer[props.id]);

    return (
        <div className={`product-listing ${props.cN || ""}`}>
            {!props.productView && (
                <>
                    {props.featuredView && (
                        <>
                            <Link
                                className="product-link"
                                to={`/product/${props.id}`}
                            >
                                <img
                                    src={
                                        props.img ||
                                        `https://loremflickr.com/500/500?random=${Math.floor(
                                            Math.random() * 1000
                                        )}`
                                        // "/default-product-image.png"
                                    }
                                    height={200}
                                    width={200}
                                ></img>
                                <p>{props.name}</p>
                            </Link>
                        </>
                    )}
                    {!props.featuredView && (
                        <>
                            <Link
                                className="product-link"
                                to={`/product/${props.id}`}
                            >
                                <img
                                    src={
                                        props.img ||
                                        `https://loremflickr.com/500/500?random=${Math.floor(
                                            Math.random() * 1000
                                        )}`
                                        // "/default-product-image.png"
                                    }
                                    height={50}
                                    width={50}
                                ></img>
                                <p>{props.name}</p>
                            </Link>
                        </>
                    )}
                </>
            )}

            {props.price && <p>{`$${props.price}`}</p>}
            <div className="shopicon-group">
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
                    </>
                )}
            </div>
            {item && item.amount > 0 && <span>In Cart: {item.amount}</span>}
        </div>
    );
}
