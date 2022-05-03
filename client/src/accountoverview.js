import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountOverview() {
    const user = useSelector((state) => state.userReducer);

    return (
        <>
            {user && (
                <>
                    <h1 className="headline">Account overview</h1>
                </>
            )}
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
            </div>
        </>
    );
}
