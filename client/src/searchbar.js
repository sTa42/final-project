import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Input from "@mui/material/Input";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function SearchBar() {
    const history = useHistory();
    // console.log(history);
    const [search, setSearch] = useState("");
    const [productNames, setProductNames] = useState([]);

    useEffect(() => {
        let abort = false;
        if (search.length > 0) {
            fetch(`/api/v1/product/search/${search}.json`)
                .then((resp) => resp.json())
                .then((data) => {
                    if (!abort) {
                        if (data.success) {
                            setProductNames(data.products);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            if (!abort) {
                setProductNames([]);
            }
        }
        return () => {
            abort = true;
        };
    }, [search]);

    return (
        <div className={"searchBar"}>
            {/* <input
                type={"search"}
                placeholder={"Search for products"}
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            ></input> */}
            <Input
                placeholder={"Search for products"}
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <button
                onClick={() => {
                    history.replace(`/product/search/${search}`);
                    setSearch("");
                }}
            >
                Go To Search Result
            </button>
            {productNames.length > 0 && (
                <div className={"searchResultContainer"}>
                    <div
                        className="searchResult"
                        onClick={() => {
                            history.replace(`/product/search/${search}`);
                            setSearch("");
                        }}
                    >{`Search for: ${search}`}</div>
                    {productNames.map((product) => {
                        return (
                            <div
                                key={product.id}
                                className={"searchResult"}
                                onClick={() => {
                                    history.replace(`/product/${product.id}`);
                                    setSearch("");
                                }}
                            >
                                {product.name}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
