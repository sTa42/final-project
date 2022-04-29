import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { receiveUser } from "./redux/user/slice";
import SearchBar from "./searchbar";
import FeaturedProducts from "./featuredproducts";
import ProductPage from "./productpage";
import Orders from "./orders";
import SearchResult from "./searchresult";
export default function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer);
    useEffect(() => {
        dispatch(receiveUser());
    }, []);
    return (
        <>
            <div>
                <BrowserRouter>
                    <header>
                        <img
                            src={"/Nozama-logos_black.png"}
                            width={200}
                            height={100}
                            style={{ objectFit: "cover" }}
                        ></img>
                        <SearchBar />, User Icon, Cart
                    </header>

                    <Route exact path={"/"}>
                        <FeaturedProducts />

                        <div>
                            <h2>user</h2>
                            {user && (
                                <div>
                                    {user.id} {user.firstname} {user.lastname}
                                </div>
                            )}
                        </div>
                    </Route>
                    <Route exact path={"/product/:id"}>
                        <ProductPage />
                    </Route>
                    <Route exact path={"/product/search/:search"}>
                        <SearchResult />
                    </Route>
                    <Route exact path={"/orders"}>
                        <Orders />
                    </Route>
                </BrowserRouter>
            </div>
        </>
    );
}
