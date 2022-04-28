import { useState } from "react";

export default function useHandleSubmit(url, values) {
    const [error, setError] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("data from repsonse: ", data);
                data.success ? location.replace("/") : setError(true);
            });
    };

    return [error, handleSubmit];
}
