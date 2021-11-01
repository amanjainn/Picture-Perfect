import React from 'react'
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'

const Navbar = ({ active, userSigned, adminSigned, user, isUserSignedIn }) => {
    let colorM = "white", colorS = "white", colorH = "white"
    if (active === "movie") colorM = "#F5C419"
    else if (active === "show") colorS = "#F5C419"
    else if (active === "home") colorH = "#F5C419 "

    async function signOut() {
        try {
            await Auth.signOut();
            isUserSignedIn(false, false, {})
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <div className="movies-layout">
            <div className="navbar-m">
                <Link to="/" style={{ textDecoration: "none" }}> <h1 style={{ color: "#F5C419", fontFamily: "'Bangers', cursive", fontSize: "60px" }}>Picture Perfect</h1> </Link>
                <div>
                    <div className="navbar-c" >
                        <ul >
                            <Link to="/" style={{ textDecoration: "none" }}> <li style={{ color: colorH }}>Home</li> </Link>
                            <Link to="/movies" style={{ textDecoration: "none" }} > <li style={{ color: colorM }}>Movies</li> </Link>
                            <Link to="/shows" style={{ textDecoration: "none" }} > <li style={{ color: colorS }}>Shows</li> </Link>

                        </ul>
                        <div class="input-group" style={{ backgroundColor: "#131312", color: "white" }}>
                            {(adminSigned && active === "movie") && <Link to="/movies/addMovie" ><button type="text" className="btn btn-lg " style={{ marginTop: "22px", color: "#131312", backgroundColor: "#f5c419" }}> Add a Movie </button> </Link>}
                            {(adminSigned && active === "show") && <Link to="/shows/addShow" ><button type="text" className="btn  btn-lg " style={{ marginTop: "22px", color: "#131312", backgroundColor: "#f5c419" }}> Add a Show </button> </Link>}
                        </div>

                        {!(userSigned || adminSigned) && <Link to='/register'>  <button className="btn  btn-lg " style={{ margin: "25px 30px 30px 100px", backgroundColor: "black", color: "#F5C419" }}> Register</button> </Link>}
                        {!(userSigned || adminSigned) && <Link to='/login'>  <button className="btn btn-lg" style={{ color: "black", marginTop: "25px", marginRight: "30px", backgroundColor: "black", color: "#F5C419" }} > Login</button> </Link>}
                        {(userSigned || adminSigned) &&

                            <>
                                <span style={{ margin: "25px 30px 30px 100px", fontSize: "25px", color: "white", backgroundColor: "#131312" }}> {user.username} </span>
                                <button onClick={signOut} className="btn btn-lg" style={{ margin: "25px 30px 30px 0px", backgroundColor: "black", color: "#F5C419" }}> Logout</button>

                            </>

                        }

                    </div>
                </div>
            </div >
        </div >
    )
}



export default Navbar;