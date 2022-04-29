export default function userReducer(user = null, action) {
    if (action.type == "user/received") {
        user = action.payload;
    }
    return user;
}
export function receiveUser() {
    return async (dispatch) => {
        const response = await fetch("/api/v1/user/user.json");
        const data = await response.json();
        if (data.success) {
            dispatch({ type: "user/received", payload: data.user });
        }
    };
}
