import useForm from "./hooks/handle-form";
import useHandleSubmit from "./hooks/handle-submit";
import { Link as RouterLink } from "react-router-dom";

import Link from "@mui/material/Link";

import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

export default function Login() {
    const [values, handleChange] = useForm();
    const [error, handleSubmit] = useHandleSubmit("/api/v1/user/login", values);

    return (
        <section className="auth-container">
            {error}
            <form onSubmit={handleSubmit}>
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
                    Login
                </Button>
            </form>

            <Link component={RouterLink} to="/">
                Dont have an account? Click here
            </Link>
        </section>
    );
}
