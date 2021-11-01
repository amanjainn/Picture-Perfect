import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import Navbar from '../layouts/navbar'
import Cover from '../../resources/cover.png'
const Login = ({ isUserSignedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aws 
        try {
            const user = await Auth.signIn(username, password);
            const domain = (user.attributes.email).split('@')[1]  // Admins : clumio.com , bmsce.ac.in , Users : gmail.com, etc etc

            if ((String(domain) === "clumio.com") || (String(domain) === "bmsce.ac.in")) {
                isUserSignedIn(false, true, { username: user.username, email: user.attributes.email });
            } else {

                isUserSignedIn(true, false, { username: user.username, email: user.attributes.email });
            }

            history.push('/')

        } catch (error) {
            setError(true);
            setErrorMsg(error.message);
            setTimeout(() => {
                setError(false);
                setErrorMsg('')
            }, 2300)
        }


    }


    return (


        <>
            <Navbar />
            <div >
                <div className="col-lg-6 ">
                    <img src={Cover} alt="cover" width="800px" height="500px" style={{ marginTop: "50px", marginLeft: "30px" }} />

                </div>
                <div className="col-lg-6 " >
                    <div className="heading" >
                        <p style={{ fontSize: "60px" }}>SignIn</p>
                        <p style={{ fontSize: "30px", color: "grey" }}>Are you new here? <span style={{ color: "black" }}> <Link to="/register" style={{ color: "#F5C419", textDecoration: "none" }}>Register </Link></span> </p>
                    </div>
                    <form style={{ margin: " 25px 150px" }} onSubmit={handleSubmit}>
                        {error && <p style={{ color: "red" }}> {errorMsg} </p>}
                        <div className="form-group">
                            <label>Username</label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" placeholder="Enter your username" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter your password" />

                        </div>
                        <Link to="/forgotPassword"> <p style={{ color: "#F5C419", textDecoration: "none" }}>Forgot Password</p> </ Link>
                        <button type="submit" className=" btn  btn-block" style={{ backgroundColor: "#F5C419", color: "black" }}>Login</button>
                    </form>
                </div>

            </div >
        </>
    )
}

export default Login;