import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
            <div>HELLO FROM SEARCH RESULT</div>
            {foundProducts && (
                <div>
                    {foundProducts.map((product) => {
                        return <div key={product.id}>{product.name}</div>;
                    })}
                </div>
            )}
        </>
    );
}