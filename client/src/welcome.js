import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetpassword";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
export default function Welcome() {
    return (
        <>
            <p>Welcome</p>
            <BrowserRouter>
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
