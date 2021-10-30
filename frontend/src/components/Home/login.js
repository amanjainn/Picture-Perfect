import React from 'react'
import '../../css/register.css'
import GoogleButton from 'react-google-button'
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <div className="col-lg-6 bg-primary bg-img1" style={{ height: '100vh' }}>
                <h1> <Link to="/" style={{ color: "white", textDecoration: "none" }}>Picture Perfect  </Link></h1>
            </div>
            <div className="col-lg-6 " style={{ height: '100vh' }}>
                <div className="heading" >
                    <p style={{ fontSize: "60px" }}>SignIn</p>
                    <p style={{ fontSize: "30px", color: "grey" }}>Are you new here? <span style={{ color: "black" }}> <Link to="/register" style={{ color: "black", textDecoration: "none" }}>Register </Link></span> </p>
                </div>
                <div className="flex-items">
                    <div className="flex-item " > <GoogleButton />  </div>
                    <div className="flex-item " > < FacebookLogin />  </div>
                </div>
                <div><p style={{ margin: " 13px 150px" }} >----------------------------------OR--------------------------------- </p></div>
                <form style={{ margin: " 25px 150px" }}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter your username" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter your password" />
                    </div>

                    <button type="submit" className=" btn btn-primary btn-lg">Login</button>
                </form>
            </div>

        </div >
    )
}

export default Login;