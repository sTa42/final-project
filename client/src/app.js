import { useState, useEffect } from "react";
export default function App() {
    useEffect(() => {
        fetch("/api/v1/user/user.json")
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <>
            <div>
                <header>Logo, Search, User Icon, Cart</header>
                <div>Featured Products</div>
            </div>
        </>
    );
}
