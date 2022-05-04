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
                <>
                    <h1 className="headline">{product.name}</h1>
                    <div className="product-single-view-container">
                        <div className="product-single-view-item description">
                            {product.description}
                        </div>

                        <div className="product-single-view-item product-view">
                            <img
                                height={400}
                                width={400}
                                src={
                                    product.picture_url ||
                                    "/default-product-image.png"
                                }
                            ></img>
                            {`$${product.price}`}
                            {/* {product.id} {product.name} {product.description} */}
                        </div>
                        <div className="product-view-buttons">
                            <div className="product-view-buttons-item"></div>
                            <div className="product-view-buttons-item">
                                <ProductListing
                                    productView={true}
                                    key={product.id}
                                    id={product.id}
                                    // name={product.name}
                                    // price={product.price}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
