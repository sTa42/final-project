import { useState, useEffect } from "react";
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
            Hello From Adressess
            {!!addresses.length && (
                <>
                    {addresses.map((address) => {
                        // console.log(address);
                        return (
                            <div key={address.id}>
                                {address.id}
                                {address.street}
                                {address.zipcode}
                                {address.city}
                            </div>
                        );
                    })}
                </>
            )}
            <h1>Add a address</h1>
            <form>
                <input
                    onChange={(e) => {
                        setStreet(e.target.value);
                    }}
                    name="street"
                    placeholder="STREET"
                    type={"text"}
                    value={street}
                ></input>
                <input
                    onChange={(e) => {
                        setZipcode(e.target.value);
                    }}
                    name="zipcode"
                    placeholder="ZIPCODE"
                    type={"number"}
                    value={zipcode}
                ></input>
                <input
                    onChange={(e) => {
                        setCity(e.target.value);
                    }}
                    name="city"
                    placeholder="CITY"
                    type={"text"}
                    value={city}
                ></input>
                <button onClick={submitAddressClickHandler}>Add address</button>
            </form>
        </>
    );
}
