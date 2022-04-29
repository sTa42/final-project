import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function ProductPage() {
    const [product, setProduct] = useState(null);
    const params = useParams();

    useEffect(() => {
        fetch(`/api/v1/product/${params.id}.json`)
            .then((resp) => resp.json())
            .then((data) => {
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
                    {product.id} {product.name} {product.description}
                </div>
            )}
        </>
    );
}
