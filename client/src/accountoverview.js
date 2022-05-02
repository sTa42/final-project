import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountOverview() {
    const user = useSelector((state) => state.userReducer);

    return (
        <>
            {user && (
                <p>
                    Hello {user.firstname} {user.lastname}
                </p>
            )}
            <Link to={"/orders"}>My orders</Link>
            <Link to={"/adresses"}>My adresses</Link>
        </>
    );
}
