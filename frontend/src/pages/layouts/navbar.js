import React from 'react'
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'

const Navbar = ({ active, userSigned, adminSigned, user, isUserSignedIn }) => {
    let colorM = "white", colorS = "white", colorH = "white"
    if (active === "movie") colorM = "#41E1FC"
    else if (active === "show") colorS = "#41E1FC"
    else colorH = "#41E1FC"

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
                <Link to="/" style={{ color: "white", textDecoration: "none" }}> <h1>Picture perfect</h1> </Link>
                <div>
                    <div className="navbar-c">
                        <ul>
                            <Link to="/" style={{ color: colorH, textDecoration: "none" }}> <li>Home</li> </Link>
                            <Link to="/movies" style={{ color: colorM, textDecoration: "none" }} > <li>Movies</li> </Link>
                            <Link to="/shows" style={{ color: colorS, textDecoration: "none" }} > <li>Shows</li> </Link>

                        </ul>
                        <div class="input-group">
                            {(adminSigned && active === "movie") && <Link to="/movies/addMovie" ><button type="text" className="btn btn-primary btn-lg " style={{ marginTop: "22px" }}> Add a Movie </button> </Link>}
                            {(adminSigned && active === "show") && <Link to="/shows/addShow" ><button type="text" className="btn btn-primary btn-lg " style={{ marginTop: "22px" }}> Add a Show </button> </Link>}
                        </div>

                        {!(userSigned || adminSigned) && <Link to='/register'>  <button className="btn btn-primary " style={{ margin: "25px 30px 30px 100px" }}> Register</button> </Link>}
                        {!(userSigned || adminSigned) && <Link to='/login'>  <button className="btn btn-warning text-dark" style={{ marginTop: "25px", marginRight: "30px" }} > Login</button> </Link>}
                        {(userSigned || adminSigned) &&

                            <>
                                <span style={{ margin: "25px 30px 30px 100px", fontSize: "25px" }}> {user.username} </span>
                                <button onClick={signOut} className="btn btn-danger" style={{ margin: "25px 30px 30px 0px" }}> Logout</button>

                            </>

                        }

                    </div>
                </div>
            </div >
        </div >
    )
}



export default Navbar;