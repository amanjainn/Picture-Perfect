import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import Navbar from "../layouts/navbar";
import Cover from "../../resources/cover.png";

const Login = ({ isUserSignedIn }) => {
    const [info, setInfo] = useState({ username: "", password: "" });
    const [errorInfo, setErrorInfo] = useState({ error: false, errorMsg: "" });
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await Auth.signIn(info.username, info.password);
            const domain = user.attributes.email.split("@")[1];

            const isAdmin = (String(domain) === "clumio.com" || String(domain) === "bmsce.ac.in");
            isUserSignedIn(!isAdmin, isAdmin, {
                username: user.username,
                email: user.attributes.email,
            });
            history.push("/");
        } catch (error) {
            setErrorInfo({ error: true, errorMsg: error.message });
            setTimeout(() => {
                setErrorInfo({ error: false, errorMsg: "" });
            }, 2300);
        }
    };
    return (
        <>
            <Navbar />
            <div>
                <div className="col-lg-6 ">
                    <img
                        src={Cover}
                        alt="cover"
                        width="800px"
                        height="500px"
                        style={{ marginTop: "50px", marginLeft: "30px" }}
                    />
                </div>
                <div className="col-lg-6 ">
                    <div className="heading">
                        <p style={{ fontSize: "60px" }}>SignIn</p>
                        <p style={{ fontSize: "30px", color: "grey" }}>
                            Are you new here?
                            <span style={{ color: "black" }}>
                                <Link
                                    to="/register"
                                    style={{ color: "#F5C419", textDecoration: "none" }}
                                >
                                    Register
                                </Link>
                            </span>
                        </p>
                    </div>
                    <form style={{ margin: " 25px 150px" }} onSubmit={handleSubmit}>
                        {errorInfo.error && (
                            <p style={{ color: "red" }}> {errorInfo.errorMsg} </p>
                        )}
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                value={info.username}
                                onChange={(e) => setInfo({ ...info, username: e.target.value })}
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                value={info.password}
                                onChange={(e) => setInfo({ ...info, password: e.target.value })}
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                            />
                        </div>
                        <Link to="/forgotPassword">
                            <p style={{ color: "#F5C419", textDecoration: "none" }}>
                                Forgot Password
                            </p>
                        </Link>
                        <button
                            type="submit"
                            className=" btn  btn-block"
                            style={{ backgroundColor: "#F5C419", color: "black" }}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
