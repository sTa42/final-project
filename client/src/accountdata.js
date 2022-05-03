import { useSelector } from "react-redux";
import Moment from "react-moment";
export default function AccountData() {
    const user = useSelector((state) => state.userReducer);

    return (
        <>
            {user && (
                <>
                    <h1 className="headline">Data about yourself</h1>
                    <div className="user-data-container">
                        <div>
                            <h2>First Name</h2>
                            <p>{user.firstname}</p>
                        </div>
                        <div>
                            <h2>Last Name</h2>
                            <p>{user.lastname}</p>
                        </div>
                        <div>
                            <h2>Email</h2>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <h2>Customer since</h2>
                            <p>
                                <Moment
                                    format="DD.MM.YYYY"
                                    date={user.created_at}
                                />
                            </p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
