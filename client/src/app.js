import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter,
    Route,
    Switch,
    useHistory,
    Link,
} from "react-router-dom";
import { receiveUser } from "./redux/user/slice";
import { receiveCart } from "./redux/cart/slice";

import SearchBar from "./searchbar";
import FeaturedProducts from "./featuredproducts";
import ProductPage from "./productpage";
import AccountOverview from "./accountoverview";
import Orders from "./orders_overview";
import OrderDetailed from "./order_detail";
import SearchResult from "./searchresult";
import Cart from "./cart";
import Checkout from "./checkout";
import Adresses from "./adresses";
import AccountData from "./accountdata";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Badge from "@mui/material/Badge";
export default function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer);
    const cart = useSelector((state) => state.cartReducer);
    const [itemsCount, setItemsCount] = useState(0);

    useEffect(() => {
        dispatch(receiveUser());
        dispatch(receiveCart());
    }, []);
    useEffect(() => {
        setItemsCount(Object.keys(cart).length);
    }, [cart]);
    return (
        <>
            <div>
                <BrowserRouter>
                    <div className="headerwrapper">
                        <header>
                            <Link to={"/"}>
                                <img
                                    className="sitelogo"
                                    src={"/Nozama-logos_black.png"}
                                    width={200}
                                    height={100}
                                    style={{ objectFit: "cover" }}
                                ></img>
                            </Link>
                            <SearchBar />
                            <div className="accountIcons">
                                <Link to={"/account"} className="navlink">
                                    <Badge>
                                        <AccountBoxIcon fontSize="large" />
                                    </Badge>
                                </Link>
                                <Link to={"/cart"} className="navlink">
                                    <Badge
                                        color={"primary"}
                                        badgeContent={itemsCount}
                                    >
                                        <ShoppingCartIcon fontSize="large" />
                                    </Badge>
                                </Link>
                                {/* {"Different Items in Cart:"}{" "}
                                {cart && itemsCount && <>{itemsCount}</>} */}
                            </div>
                        </header>
                    </div>
                    <div className="content">
                        <Route exact path={"/"}>
                            <FeaturedProducts />
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
                        <Route exact path={"/addresses"}>
                            <Adresses />
                        </Route>
                        <Route exact path={"/order/:id"}>
                            <OrderDetailed />
                        </Route>
                        <Route exact path={"/cart"}>
                            <Cart />
                        </Route>
                        <Route exact path={"/cart/checkout"}>
                            <Checkout />
                        </Route>
                        <Route exact path={"/account"}>
                            <AccountOverview />
                        </Route>
                        <Route exact path={"/account/data"}>
                            <AccountData />
                        </Route>
                    </div>
                </BrowserRouter>
            </div>
        </>
    );
}
