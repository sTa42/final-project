import Button from "@mui/material/Button";

export default function Logout() {
    function logout() {
        fetch("/api/v1/user/logout", { method: "POST" })
            .then((resp) => resp.json())
            .then((data) => {
                location.replace("/");
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <Button
            variant="contained"
            onClick={logout}
            className="buttonlink navlink"
        >
            LOGOUT
        </Button>
    );
}
