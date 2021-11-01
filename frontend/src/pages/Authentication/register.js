import React, { useState } from 'react'
import '../../css/register.css'
import { Auth } from 'aws-amplify'


import { Link } from 'react-router-dom'

const Register = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registered, setRegistered] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError(true);
            setErrorMsg('Passwords do not match')
            setTimeout(() => {
                setError(false);
                setErrorMsg('')
            }, 2300)
        } else {
            //Aws Cognito
            try {
                const signUpResponse = await Auth.signUp({
                    username,
                    password,
                    attributes: {
                        email: email
                    }
                });
                setRegistered(true);

            } catch (error) {
                setError(true);
                setErrorMsg(error.message);
                setTimeout(() => {
                    setError(false);
                    setErrorMsg('')
                }, 2300)
            }
        }


    }

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <div className="col-lg-6 bg-primary bg-img" style={{ height: '100vh' }}>
                <h1> <Link to="/" style={{ color: "white", textDecoration: "none" }}>Picture Perfect  </Link></h1>
            </div>

            <div className="col-lg-6 " style={{ height: '100vh' }}>
                {!registered ?
                    <>
                        <div className="heading" >
                            <p style={{ fontSize: "60px" }}>Get's Started</p>
                            <p style={{ fontSize: "30px", color: "grey" }}>Already  have an account? <span style={{ color: "black" }}> <Link to="/login" style={{ color: "black", textDecoration: "none" }}>Login </Link></span> </p>
                        </div>

                        <form style={{ margin: " 25px 150px" }} onSubmit={handleSubmit}>
                            {error && <p style={{ color: "red" }}> {errorMsg} </p>}
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" placeholder="Enter your username" value={username} onChange={(e) => setUserName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter your password (Min-length 6 and must contain numbers)" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Confirm your password</label>
                                <input type="password" className="form-control" placeholder="Re-enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <button type="submit" className=" btn btn-primary btn-lg">Register</button>
                        </form>
                    </> :
                    <div className="heading" >
                        <h2> You've successfuly registered.</h2>
                        <p>We have sent you a confirmation email, please verify your email id to log in. </p>
                        <span style={{ color: "black" }}> <Link to="/login" style={{ color: "black", textDecoration: "none" }}>  <button className="btn btn-light btn-block " style={{ marginTop: "30px" }}>  Login </button> </Link></span>
                    </div>



                }
            </div>

        </div >
    )
}

export default Register;