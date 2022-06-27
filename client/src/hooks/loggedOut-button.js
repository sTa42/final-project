import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export default function LoggedOutButton() {
    const history = useHistory();

    return (
        <Button
            variant="contained"
            onClick={() => {
                history.replace("/account");
            }}
        >
            Go to login/register
        </Button>
    );
}
