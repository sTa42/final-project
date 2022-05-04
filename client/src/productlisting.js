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
        // <div className={`product-listing ${props.cN || ""}`}>
        <div className={props.cN || ""}>
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
                                        "/default-product-image.png"
                                    }
                                    height={200}
                                    width={200}
                                ></img>
                                <p>
                                    <strong>{props.name}</strong>
                                </p>
                            </Link>
                        </>
                    )}
                    {!props.featuredView && !props.searchresult && (
                        <>
                            <Link
                                className="product-link"
                                to={`/product/${props.id}`}
                            >
                                <img
                                    src={
                                        props.img ||
                                        "/default-product-image.png"
                                    }
                                    height={50}
                                    width={50}
                                ></img>
                                <p>
                                    <strong>{props.name}</strong>
                                </p>
                            </Link>
                        </>
                    )}
                    {props.searchresult && (
                        <>
                            <Link
                                className="product-link"
                                to={`/product/${props.id}`}
                            >
                                <img
                                    src={
                                        props.img ||
                                        "/default-product-image.png"
                                    }
                                    height={150}
                                    width={150}
                                ></img>
                                <p>
                                    <strong>{props.name}</strong>
                                </p>
                            </Link>
                        </>
                    )}
                </>
            )}

            {props.price && <p className="priceTag">{`$${props.price}`}</p>}
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
            {item && item.amount > 0 && (
                <p className="priceTag">In Cart: {item.amount}</p>
            )}
        </div>
    );
}
