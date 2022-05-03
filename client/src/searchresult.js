import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductListing from "./productlisting";

export default function SearchResult() {
    const params = useParams();
    const [foundProducts, setFoundProducts] = useState([]);
    useEffect(() => {
        fetch(`/api/v1/product/search/${params.search}.json`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    setFoundProducts(data.products);
                }
            })
            .catch((err) => {
                console.log("ERROR FETCHING SEARCH RESULT: ", err);
            });
        console.log(params);
    }, [params.search]);

    return (
        <>
            <div className="headline">
                Your search result for {params.search}
            </div>
            {foundProducts && (
                <div className="searchview-container">
                    {foundProducts.map((product) => {
                        return (
                            <ProductListing
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
}
