export default function userReducer(user = Object, action) {
    if (action.type == "user/received") {
        user = action.payload;
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
            }
        } catch (err) {
            console.log("ERROR FETCHING USER DATA: ", err);
        }
    };
}
