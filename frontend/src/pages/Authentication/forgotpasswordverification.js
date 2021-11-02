import React, { useState } from 'react'
import Navbar from '../layouts/navbar'
import { Auth } from 'aws-amplify'


const ForgotPasswordVerification = ({ user, isUserSignedIn, userSigned, adminSigneds }) => {
    const [code, setCode] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Aws amplify

        try {
            await Auth.forgotPasswordSubmit(email, code, password)
            setSuccess(true);
        } catch (error) {

        }

    }


    return (

        <>
            <Navbar userSigned={false} adminSigned={false} user={user} isUserSignedIn={isUserSignedIn} />
            {!success &&
                <div className="container">
                    <h1>Set new Password</h1>
                    <h4 style={{ fontFamily: "arial", marginBottom: "20px" }}>Please enter below the verification code sent to your registered email address.</h4>

                    <div className="form-group">
                        <input type="number" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code" style={{ width: "300px" }} />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" style={{ width: "300px" }} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" style={{ width: "300px" }} />
                    </div>
                    <button onClick={handleSubmit} className=" btn  btn-lg" style={{ backgroundColor: "#F5C419", color: "black", marginTop: "20px" }}>Set new password</button>

                </div>
            }
            {success &&

                <h3 className="container">Password changed successfully!</h3>


            }

        </>
    )
}

export default ForgotPasswordVerification;

