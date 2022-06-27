import { Link } from "react-router-dom";
export default function LoggedOutText() {
    return (
        <div className="link-wrapper">
            <Link to={"/account"} className="inline-link">
                Please login or register with us here first.
            </Link>
        </div>
    );
}
