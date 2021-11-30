import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Cover from "../../resources/cover3.png";
import Navbar from "../layouts/navbar";
import { Link } from "react-router-dom";

const Register = () => {
    const [info, setInfo] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errorInfo, setErrorInfo] = useState({ error: false, msg: "" });
    const [registered, setRegistered] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (info.password !== info.confirmPassword) {
            setErrorInfo({ error: true, msg: "Passwords do not match" });
            setTimeout(() => {
                setErrorInfo({ error: false, msg: "" });
            }, 2300);
        } else {
            try {
                await Auth.signUp({
                    username: info.username,
                    password: info.password,
                    attributes: {
                        email: info.email,
                    },
                });
                setRegistered(true);
            } catch (error) {
                setErrorInfo({ error: true, msg: error.message });
                setTimeout(() => {
                    setErrorInfo({ error: true, msg: "" });
                }, 2300);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div>
                <div className="col-lg-6  ">
                    <img
                        src={Cover}
                        alt="cover"
                        width="900px"
                        height="600px"
                        style={{ marginTop: "50px", marginLeft: "30px" }}
                    />
                </div>

                <div className="col-lg-6 ">
                    {!registered ? (
                        <>
                            <div className="heading">
                                <p style={{ fontSize: "60px" }}>Get's Started</p>
                                <p style={{ fontSize: "30px", color: "grey" }}>
                                    Already have an account?
                                    <span style={{ color: "black" }}>
                                        <Link
                                            to="/login"
                                            style={{ color: "#F5C419", textDecoration: "none" }}
                                        >
                                            Login
                                        </Link>
                                    </span>
                                </p>
                                <p
                                    style={{
                                        width: "fit-content",
                                        border: "1px solid white ",
                                        borderRadius: "6px",
                                        padding: "9px",
                                        color: "black",
                                        backgroundColor: "#F5C419",
                                    }}
                                >
                                    Register using either"@clumio.com" or "@bmsce.ac.in" to get
                                    admin access.
                                </p>
                            </div>

                            <form style={{ margin: " 40px 150px" }} onSubmit={handleSubmit}>
                                {errorInfo.error && (
                                    <p style={{ color: "red" }}> {errorInfo.msg} </p>
                                )}
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your username"
                                        value={info.username}
                                        onChange={(e) =>
                                            setInfo({ ...info, username: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={info.email}
                                        onChange={(e) =>
                                            setInfo({ ...info, email: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your password (Min-length 6 and must contain numbers)"
                                        value={info.password}
                                        onChange={(e) =>
                                            setInfo({ ...info, password: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm your password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Re-enter your password"
                                        value={info.confirmPassword}
                                        onChange={(e) =>
                                            setInfo({ ...info, confirmPassword: e.target.value })
                                        }
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className=" btn  btn-block"
                                    style={{ backgroundColor: "#F5C419", color: "black" }}
                                >
                                    Register
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="heading">
                            <h2 style={{ color: "#F5C419" }}>
                                You've successfuly registered.
                            </h2>
                            <h4>
                                We have sent you a confirmation email, please verify your email
                                id to log in.
                            </h4>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Register;
