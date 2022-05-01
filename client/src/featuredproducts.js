import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddToCartButton from "./addtocartbutton";

export default function FeaturedProducts() {
    const history = useHistory();
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        fetch(`/api/v1/product/featured.json`)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    setFeaturedProducts(data.products);
                }
            })
            .catch((err) => {
                console.log("ERROR FETCHING FEATURED PRODUCTS: ", err);
            });
    }, []);
    return (
        <div>
            <h1>FEATURED PRODUCTS</h1>
            <div className={"featuredProductsContainer"}></div>
            {featuredProducts && (
                <>
                    {featuredProducts.map((product) => {
                        return (
                            <div
                                key={product.id}
                                className={"searchResult"}
                                onClick={() => {
                                    history.replace(`/product/${product.id}`);
                                }}
                            >
                                {product.name}
                                <AddToCartButton id={product.id} />
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
}