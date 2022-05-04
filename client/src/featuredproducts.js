import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddToCartButton from "./addtocartbutton";
import ProductListing from "./productlisting";

export default function FeaturedProducts() {
    // const history = useHistory();
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
            <h1 className="headline">Featured Products</h1>
            {featuredProducts && (
                <div className="featuredProductsContainer">
                    {featuredProducts.map((product) => {
                        return (
                            // <div
                            //     key={product.id}
                            //     className={"searchResult"}
                            //     onClick={() => {
                            //         history.replace(`/product/${product.id}`);
                            //     }}
                            // >
                            //     {product.name}
                            //     <AddToCartButton id={product.id} />
                            // </div>
                            <ProductListing
                                // className={"searchResult"}
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                img={product.picture_url}
                                featuredView={true}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
