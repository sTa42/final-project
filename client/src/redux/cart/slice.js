export default function cartReducer(cart = Object, action) {
    if (action.type == "cart/received") {
        cart = action.payload;
        // console.log("inside receive", cart);
    } else if (action.type == "cart/itemadded") {
        console.log("UPDATE THIS ,", action.payload);
        // const newItem = { amount: 1 };

        cart = { ...cart };
        cart[action.payload] = { amount: 1 };
    } else if (action.type == "cart/itemamountincreased") {
        console.log(action.payload);
        cart = { ...cart };
        cart[action.payload] = {
            amount: cart[action.payload].amount + 1,
        };
    } else if (action.type == "cart/itemamountdecreased") {
        console.log(action.payload);
        cart = { ...cart };
        cart[action.payload] = { amount: cart[action.payload].amount - 1 };
    } else if (action.type == "cart/itemremoved") {
        cart = { ...cart };
        delete cart[action.payload];
    }
    return cart;
}
export function receiveCart() {
    return async (dispatch) => {
        try {
            const response = await fetch("/api/v1/cart/content.json");
            const data = await response.json();
            // console.log(data);
            if (data.success) {
                dispatch({ type: "cart/received", payload: data.cart });
            }
        } catch (err) {
            console.log("ERROR FETCHING CART DATA: ", err);
        }
    };
}
export function addToCart(id) {
    return async (dispatch) => {
        // console.log("Reducer addToCard id: ", id);
        try {
            const response = await fetch(`/api/v1/cart/additem`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ item: id }),
            });
            const data = await response.json();
            // console.log("Data from AddToCart Call: ", data);
            if (data.success) {
                dispatch({ type: "cart/itemadded", payload: data.item });
            }
        } catch (err) {
            console.log("ERROR POSTING ITEM TO CART: ", err);
        }
    };
}
export function increaseAmount(id) {
    return async (dispatch) => {
        // console.log("Reducer addToCard id: ", id);
        try {
            const response = await fetch(`/api/v1/cart/additem`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ item: id }),
            });
            const data = await response.json();
            // console.log("Data from AddToCart Call: ", data);
            if (data.success) {
                dispatch({
                    type: "cart/itemamountincreased",
                    payload: data.item,
                });
            }
        } catch (err) {
            console.log("ERROR INCREASE ITEM AMOUNT: ", err);
        }
    };
}
export function decreaseAmount(id) {
    return async (dispatch) => {
        // console.log("Reducer addToCard id: ", id);
        try {
            const response = await fetch(`/api/v1/cart/decreaseitemamount`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ item: id }),
            });
            const data = await response.json();
            // console.log("Data from AddToCart Call: ", data);
            if (data.success) {
                dispatch({
                    type: "cart/itemamountdecreased",
                    payload: data.item,
                });
            }
        } catch (err) {
            console.log("ERROR DECREASE ITEM AMOUNT: ", err);
        }
    };
}

export function removeFromCart(id) {
    return async (dispatch) => {
        console.log("Reducer removeFromCart id: ", id);
        try {
            const response = await fetch(`/api/v1/cart/removeitem`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ item: id }),
            });
            const data = await response.json();
            console.log("Data from RemoveFromCart Call: ", data);
            if (data.success) {
                dispatch({ type: "cart/itemremoved", payload: data.item });
            }
        } catch (err) {
            console.log("ERROR POSTING ITEM TO CART: ", err);
        }
    };
}
