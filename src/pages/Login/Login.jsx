import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext.jsx";
import { Link, useLocation, useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios.jsx";
import toast from "react-hot-toast";

const Login = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const { setUser, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const axios = useAxios();

    const handleGoogleLogin = () => {
        setSuccess("");
        setError("");

        googleSignIn()
            .then((result) => {
                result.user.reload();
                const newUser = {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL
                }

                axios.post("/users", newUser)
                    .then(data => {
                        if (data.data.insertedId || data.data.message === "User already exists.") {
                            setUser(result.user);
                            toast("Logged in successfully!");
                            setSuccess("Logged in successfully!");
                            navigate(location?.state || "/", {replace: true});
                        }
                    })
            })
            .catch((error) => {
                toast(error.message);
                setError(error.message);
            });
    }

    return (
        <div className="hero min-h-screen">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <div className="text-center text-secondary">
                        <h1 className="text-[32px] font-semibold">Login</h1>
                        <p className="mt-2 mb-4">
                            Don't have an account? <Link state={location?.state} className="primary-text" to="/register">Register Now</Link>
                        </p>
                    </div>
                    <form>
                        <fieldset className="fieldset">
                            {/*email*/}
                            <label className="label text-secondary">Email</label>
                            <input name="email" type="email" className="input" placeholder="Your Email" />
                            {/*password*/}
                            <label className="label text-secondary">Password</label>
                            <input name="password" type="password" className="input" placeholder="******" />
                            <div>
                                <a className="link link-hover text-secondary">Forgot password?</a>
                            </div>
                            <button className="btn btn-primary font-semibold mt-4">Sign In</button>
                        </fieldset>
                    </form>
                    {
                        success && <p className="text-center text-green-500 text-semibold">{success}</p>
                    }
                    {
                        error && <p className="text-center text-red-500 text-semibold">{error}</p>
                    }
                    <div className="divider font-semibold text-secondary">OR</div>
                    {/* Google */}
                    <button onClick={handleGoogleLogin} className="btn bg-white text-secondary border-[#e5e5e5] font-semibold">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;