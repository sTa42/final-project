import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function OrderDetailed() {
    const params = useParams();
    const [order, setOrder] = useState(Object);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch(`/api/v1/order/${params.id}.json`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    setOrder(data.order);
                    setItems(data.items);
                }
            })
            .catch((err) => {
                console.log("ERROR FETCHING ORDER DETAILs: ", err);
            });
    }, []);
    return (
        <>
            <div>DETEILD ORDER HERE</div>
            {order && (
                <div>
                    <div key={order.order_id}>
                        {order.totalcost} {order.created_at}
                    </div>
                    {!!items.length && (
                        <div>
                            {items.map((item) => {
                                return (
                                    <div key={item.id}>
                                        {item.name} {item.amount} {item.price}{" "}
                                        {"Total: $"}
                                        {item.amount * item.price}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
