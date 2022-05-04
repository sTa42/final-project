import useForm from "./hooks/handle-form";
import useHandleSubmit from "./hooks/handle-submit";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

import Link from "@mui/material/Link";

export default function Register() {
    const [values, handleChange] = useForm();
    const [error, handleSubmit] = useHandleSubmit(
        "/api/v1/user/register",
        values
    );

    return (
        <section className="auth-container">
            {error}
            <form onSubmit={handleSubmit}>
                <Input
                    name={"first"}
                    onChange={handleChange}
                    placeholder={"firstname"}
                />
                <Input
                    name={"last"}
                    onChange={handleChange}
                    placeholder={"lastname"}
                />
                <Input
                    name={"email"}
                    onChange={handleChange}
                    type={"email"}
                    placeholder={"email"}
                />
                <Input
                    name={"password"}
                    onChange={handleChange}
                    type={"password"}
                    placeholder={"password"}
                />
                <Button variant="outlined" onClick={handleSubmit}>
                    Register
                </Button>
            </form>

            <Link component={RouterLink} to="/login">
                Have an account? Login here
            </Link>
        </section>
    );
}
