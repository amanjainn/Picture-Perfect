import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = ({ active, login }) => {
    let colorM = "white"
    let colorS = "white"
    if (active === "movie") colorM = "red"
    else colorS = "red";
    return (
        <div className="movies-layout">
            <div className="navbar-m">
                <Link to="/" style={{ color: "white", textDecoration: "none" }}> <h1>Picture perfect</h1> </Link>
                <div>
                    <div className="navbar-c">
                        <ul>
                            <Link to="/" style={{ color: "white", textDecoration: "none" }}> <li>Home</li> </Link>
                            <Link to="/movies" style={{ color: colorM, textDecoration: "none" }} > <li>Movies</li> </Link>
                            <Link to="/shows" style={{ color: colorS, textDecoration: "none" }} > <li>Shows</li> </Link>

                        </ul>
                        <div class="input-group">
                            {(login && active === "Movie") && <Link to="/movies/addMovie" ><button type="text" className="btn btn-primary btn-lg " style={{ marginTop: "22px" }}> Add a Movie </button> </Link>}
                            {(login && active === "show") && <Link to="/shows/addShow" ><button type="text" className="btn btn-primary btn-lg " style={{ marginTop: "22px" }}> Add a Show </button> </Link>}
                        </div>

                        {!login && <span className="login-btn"> <Link to="/login" style={{ color: "white", textDecoration: "none" }}> <h4> Login </h4> </Link> </span>}
                        {login && <span className="login-btn"> <Link to="/" style={{ color: "white", textDecoration: "none" }}> <h4> Logout </h4> </Link> </span>}

                    </div>
                </div>
            </div>
        </div>
    )
}


export default Navbar;