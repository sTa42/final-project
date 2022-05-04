import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Moment from "react-moment";

export default function OrderDetailed() {
    const params = useParams();
    const [order, setOrder] = useState(Object);
    const [items, setItems] = useState([]);
    const [address, setAddress] = useState(Object);
    useEffect(() => {
        fetch(`/api/v1/order/${params.id}.json`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    setOrder(data.order);
                    setItems(data.items);
                    setAddress(data.address);
                }
            })
            .catch((err) => {
                console.log("ERROR FETCHING ORDER DETAILs: ", err);
            });
    }, []);
    return (
        <>
            {order.order_id && (
                <>
                    <h1 className="orderheadline">Details for order</h1>
                    <h3 className="orderheadline-sub">{order.order_id}</h3>
                    <div className="order-single-view-container">
                        <div className="order-single-view-sub-container">
                            <h4>Contents</h4>
                            <h4>
                                Ordered on{" "}
                                <Moment
                                    format="HH:mm, DD.MM.YYYY"
                                    date={order.created_at}
                                />
                            </h4>
                        </div>
                        <div>
                            {/* <div key={order.order_id}>
                                {order.totalcost} {order.created_at}
                            </div> */}
                            {!!items.length && (
                                <>
                                    <div className="order-layout-container">
                                        <div className="order-layout-item items-container">
                                            {items.map((item) => {
                                                return (
                                                    <div
                                                        key={item.id}
                                                        className="item-single-container"
                                                    >
                                                        <img
                                                            height={50}
                                                            width={50}
                                                            src={
                                                                item.picture_url ||
                                                                "/default-product-image.png"
                                                            }
                                                        ></img>
                                                        <p>{item.name}</p>
                                                        <p>
                                                            Amount:{" "}
                                                            {item.amount}
                                                        </p>
                                                        <p>
                                                            Total:{" $"}
                                                            {Number.parseFloat(
                                                                item.amount *
                                                                    item.price
                                                            ).toFixed(2)}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="order-layout-item address-order">
                                            {address && (
                                                <div>
                                                    <h4>Address</h4>
                                                    <p>{address.street}</p>
                                                    <p>{address.zipcode}</p>
                                                    <p>{address.city}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p>
                                        STATUS: <strong>{order.status}</strong>
                                    </p>
                                    <p>
                                        Total cost of order: $
                                        <strong>{order.totalcost}</strong>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
