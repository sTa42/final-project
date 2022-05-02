import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
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
            <div>Orders Component</div>
            <div>
                {!!orders.length && (
                    <div>
                        {orders.map((order) => {
                            return (
                                <div key={order.order_id}>
                                    {order.order_id} {order.status}{" "}
                                    {order.created_at} {order.totalcost}
                                    <button
                                        onClick={() => {
                                            history.replace(
                                                `/order/${order.order_id}`
                                            );
                                        }}
                                    >
                                        See details
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
