import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import Cover from '../../resources/cover3.png'
import Navbar from '../layouts/navbar'
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
        <>
            <Navbar />
            <div >

                <div className="col-lg-6  " >
                    <img src={Cover} alt="cover" width="900px" height="600px" style={{ marginTop: "50px", marginLeft: "30px" }} />
                </div>

                <div className="col-lg-6 ">
                    {!registered ?
                        <>
                            <div className="heading" >
                                <p style={{ fontSize: "60px" }}>Get's Started</p>
                                <p style={{ fontSize: "30px", color: "grey" }}>Already  have an account? <span style={{ color: "black" }}> <Link to="/login" style={{ color: "#F5C419", textDecoration: "none" }}>Login </Link></span> </p>
                                <p style={{ width: "fit-content", border: "1px solid white ", borderRadius: "6px", padding: "9px", color: "black", backgroundColor: "#F5C419		" }} >
                                    Register using either"@clumio.com" or "@bmsce.ac.in" to get admin access.
                                </p>
                            </div>

                            <form style={{ margin: " 40px 150px" }} onSubmit={handleSubmit}>
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
                                <button type="submit" className=" btn  btn-block" style={{ backgroundColor: "#F5C419", color: "black" }}>Register</button>
                            </form>
                        </> :
                        <div className="heading" >
                            <h2 style={{ color: "#F5C419" }}> You've successfuly registered.</h2>
                            <h4 >We have sent you a confirmation email, please verify your email id to log in. </h4>
                        </div>



                    }
                </div>

            </div >
        </>
    )
}

export default Register;