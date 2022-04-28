import ReactDOM from "react-dom";

import App from "./app";
import Welcome from "./welcome";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import reducer from "./redux/reducer";
import thunk from "redux-thunk";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default(), thunk))
);
async function checkIfLoggedIn() {
    const response = await fetch("/api/v1/user/id.json");
    const data = await response.json();
    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.querySelector("main")
        );
    }
}
checkIfLoggedIn();
