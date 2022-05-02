import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductListing from "./productlisting";

export default function ProductPage() {
    const [product, setProduct] = useState(null);
    const params = useParams();
    const item = useSelector((state) => state.cartReducer[params.id]);
    console.log("from component", item);

    useEffect(() => {
        console.log(item);
        fetch(`/api/v1/product/${params.id}.json`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    setProduct(data.product);
                }
            })
            .catch((err) => {
                console.log("ERROR FETCHING PRODUCT DATA: ", err);
            });
    }, [params.id]);

    return (
        <>
            {product && (
                <div>
                    <ProductListing
                        key={product.id}
                        id={product.id}
                        name={product.name}
                    />
                    {product.id} {product.name} {product.description}
                </div>
            )}
        </>
    );
}
