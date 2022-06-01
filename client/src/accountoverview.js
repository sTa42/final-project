import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "./logoutbutton";
import Login from "./login";
import Register from "./registration";
import { useState } from "react";

export default function AccountOverview() {
    const user = useSelector((state) => state.userReducer);
    const [authComponentVisible, setAuthComponentVisible] = useState(false);

    return (
        <>
            <h1 className="headline">Account overview</h1>
            {user.id ? (
                <div className="account-link-container">
                    <Link className="account-link" to={"/account/data"}>
                        My data
                    </Link>
                    <Link className="account-link" to={"/orders"}>
                        My orders
                    </Link>
                    <Link className="account-link" to={"/addresses"}>
                        My adresses
                    </Link>
                    <div>
                        <LogoutButton />
                    </div>
                </div>
            ) : (
                <>
                    {authComponentVisible ? (
                        <>
                            <Login
                                changeView={() => {
                                    setAuthComponentVisible(false);
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Register
                                changeView={() => {
                                    setAuthComponentVisible(true);
                                }}
                            />
                        </>
                    )}
                </>
            )}
        </>
    );
}
