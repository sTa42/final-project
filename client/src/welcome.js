import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetpassword";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
export default function Welcome() {
    return (
        <>
            <BrowserRouter>
                <div className="header-auth">
                    <img
                        src="/Nozama-logos_black.png"
                        height={250}
                        width={250}
                    ></img>
                </div>
                <Switch>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/reset">
                        <ResetPassword />
                    </Route>

                    <Route>
                        <Redirect to="/"></Redirect>
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}
