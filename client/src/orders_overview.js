import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Moment from "react-moment";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
export default function Orders() {
    const history = useHistory();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`/api/v1/order/all.json`)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.orders);
                    setOrders(data.orders);
                }
            })
            .catch((err) => {
                console.log("ERROR FETCHING ALL ORDERS: ", err);
            });
    }, []);
    return (
        <>
            <h1 className="headline">Your orders</h1>

            {!!orders.length && (
                <div className="all-orders-view-container">
                    {orders.map((order) => {
                        return (
                            <div
                                className="order-card-view"
                                key={order.order_id}
                            >
                                <h6>{order.order_id}</h6>
                                <div className="order-card-view-sub-container">
                                    <div>
                                        <span>STATUS: </span>
                                        <span>
                                            <strong>{order.status}</strong>
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            Date of order:{" "}
                                            <Moment
                                                format="HH:MM, DD.MM.YYYY"
                                                date={order.created_at}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="order-card-view-sub-container">
                                    <div
                                        className="order-detail-container"
                                        onClick={() => {
                                            history.replace(
                                                `/order/${order.order_id}`
                                            );
                                        }}
                                    >
                                        <span>
                                            <strong>Detailed view</strong>
                                        </span>
                                        <ReadMoreIcon fontSize="large" />
                                    </div>
                                    <span>
                                        {"Cost: $"}
                                        <strong>{order.totalcost}</strong>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}
