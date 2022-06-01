const initialState = { id: 0, firstname: "", lastname: "" };

export default function userReducer(user = initialState, action) {
    if (action.type == "user/received") {
        user = action.payload;
    } else if (action.type == "user/notReceived") {
        user = { ...user };
    }
    return user;
}
export function receiveUser() {
    return async (dispatch) => {
        try {
            const response = await fetch("/api/v1/user/user.json");
            const data = await response.json();
            if (data.success) {
                dispatch({ type: "user/received", payload: data.user });
            } else {
                dispatch({ type: "user/notReceived" });
            }
        } catch (err) {
            console.log("ERROR FETCHING USER DATA: ", err);

            dispatch({ type: "user/notReceived" });
        }
    };
}
