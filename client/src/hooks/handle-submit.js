import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveUser } from "../redux/user/slice";

export default function useHandleSubmit(url, values) {
    const [error, setError] = useState();
    const dispatch = useDispatch();

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
                dispatch(receiveUser());
                // data.success ? location.replace("/") : setError(true);
            });
    };

    return [error, handleSubmit];
}
