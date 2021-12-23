import React, { useState } from "react";
import Navbar from "../layouts/navbar";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

const ForgotPassword = ({ user, isUserSignedIn }) => {
    const [email, setEmail] = useState();
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Auth.forgotPassword(email);
            history.push("/forgotpasswordverification");
        } catch (error) {
            throw error;
        }
    };
    return (
        <>
            <Navbar
                userSigned={false}
                adminSigned={false}
                user={user}
                isUserSignedIn={isUserSignedIn}
            />
            <div className="container">
                <h1>Forgot your password?</h1>
                <h4 style={{ fontFamily: "arial", margin: " 15px 0px" }}>
                    Please enter your registered email address to receive a reset code.
                </h4>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    className="btn btn-lg"
                    style={{ backgroundColor: "#F5C419", color: "#131312" }}
                    onClick={handleSubmit}
                >
                    Send Code
                </button>
            </div>
        </>
    );
};

export default ForgotPassword;
