import React from 'react'
import { Data } from '../../data/movies'
import { Link } from 'react-router-dom'
import '../../css/movies.css'
import { useState } from 'react'


const Movies = () => {
    const [item, setItem] = useState('');
    const [login, setLogin] = useState(true);
    return (
        <>
            <div className="movies-layout">
                <div className="navbar-m">
                    <Link to="/" style={{ color: "white", textDecoration: "none" }}> <h1>Picture perfect</h1> </Link>
                    <div>
                        <div className="navbar-c">
                            <ul>
                                <Link to="/" style={{ color: "white", textDecoration: "none" }}> <li>Home</li> </Link>
                                <Link to="/movies" style={{ color: "Red", textDecoration: "none" }} > <li>Movies</li> </Link>
                                <Link to="/shows" style={{ color: "white", textDecoration: "none" }} > <li>Shows</li> </Link>

                            </ul>
                            <div class="input-group">
                                <input type="search" class="form-control " placeholder="Search" value={item} onChange={(e) => setItem(e.target.value)} />
                                {login && <Link to="/movies/addMovie" ><button type="text" className="btn btn-primary btn-lg " style={{ marginTop: "22px" }}> Add a Movie </button> </Link>}
                            </div>

                            {!login && <span className="login-btn"> <Link to="/login" style={{ color: "white", textDecoration: "none" }}> <h4> Login </h4> </Link> </span>}
                            {login && <span className="login-btn"> <Link to="/" style={{ color: "white", textDecoration: "none" }}> <h4> Logout </h4> </Link> </span>}



                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: "40px" }} >
                <div>
                    {Data.filter((data) => {
                        return (
                            (data.movieName).toLowerCase().includes(item.toLowerCase()) || (item).toLowerCase().includes(data.movieName.toLowerCase())
                        )
                    }).map(function (data) {
                        return (
                            <Link to={`/movies/${data.movieId}`}> <img width="210px " style={{ display: "inline", margin: "10px" }} height="310px" src={data.movieImage} alt={data.movieName}></img> </Link>
                        )
                    })
                    }
                </div>

            </div>

        </>
    )
}

export default Movies