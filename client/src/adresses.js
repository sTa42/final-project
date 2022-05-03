import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Adresses() {
    const [addresses, setAddresses] = useState([]);
    const [street, setStreet] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
        fetch("/api/v1/address/all.json")
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                setAddresses(data.addresses);
            })
            .catch((err) => {
                console.log("ERROR FETCHING ADRESSES: ", err);
            });
    }, []);

    const submitAddressClickHandler = (e) => {
        e.preventDefault();
        if (!!street && !!zipcode && !!city) {
            console.log("HELLO I LCLIKED");
            fetch("/api/v1/address/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ street, zipcode, city }),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log("AFTER POSTING: ", data.address);
                    if (data.success) {
                        setAddresses([...addresses, data.address]);
                        setStreet("");
                        setZipcode("");
                        setCity("");
                    }
                })
                .catch((err) => {
                    console.log("ERROR ADDING NEW ADRESS", err);
                });
        }
    };
    return (
        <>
            <h1 className="headline">Your saved addresses</h1>
            {!!addresses.length && (
                <div className="address-view-container">
                    {addresses.map((address) => {
                        // console.log(address);
                        return (
                            <div className="address" key={address.id}>
                                <p>{address.street}</p>
                                <p>{address.zipcode}</p>
                                <p>{address.city}</p>
                            </div>
                        );
                    })}
                </div>
            )}
            <h4>Add a address</h4>
            <form>
                <TextField
                    onChange={(e) => {
                        setStreet(e.target.value);
                    }}
                    name="street"
                    placeholder="STREET"
                    type={"text"}
                    value={street}
                ></TextField>
                <TextField
                    onChange={(e) => {
                        setZipcode(e.target.value);
                    }}
                    name="zipcode"
                    placeholder="ZIPCODE"
                    type={"number"}
                    value={zipcode}
                ></TextField>
                <TextField
                    onChange={(e) => {
                        setCity(e.target.value);
                    }}
                    name="city"
                    placeholder="CITY"
                    type={"text"}
                    value={city}
                ></TextField>
                <Button variant="contained" onClick={submitAddressClickHandler}>
                    Add address
                </Button>
            </form>
        </>
    );
}
