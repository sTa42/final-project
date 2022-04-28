import useForm from "./hooks/handle-form";
import useHandleSubmit from "./hooks/handle-submit";

export default function Login() {
    const [values, handleChange] = useForm();
    const [error, handleSubmit] = useHandleSubmit("/api/v1/user/login", values);

    return (
        <section>
            {error}
            <form onSubmit={handleSubmit}>
                <input
                    name={"email"}
                    onChange={handleChange}
                    type={"email"}
                    placeholder={"email"}
                />
                <input
                    name={"password"}
                    onChange={handleChange}
                    type={"password"}
                    placeholder={"password"}
                />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </section>
    );
}
