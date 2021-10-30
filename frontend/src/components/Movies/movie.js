import React from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../layouts/navbar'
import { Data } from '../../data/movies'
import { Reviews } from '../../data/review'
import Review from '../Movies/review'


const Movie = () => {
    const { id } = useParams();
    const [login, setLogin] = useState(true);
    return (
        <div>
            <Navbar active="movie" />

            <div className="container">
                {
                    Data.filter((data) => {

                        return data.movieId === parseInt(id)
                    }).map(function (movie) {
                        return (

                            <div className="row m-6">
                                <div className="col-sm-4" >
                                    <img height="350px" width="300px" src={movie.movieImage} alt={movie.movieName} />
                                </div>
                                <div className="col-sm-8 " >
                                    <h1 style={{ fontSize: "70px" }}>{movie.movieName}</h1>
                                    <h2>{movie.language} : {movie.duration}</h2>
                                    <h3>{movie.movieDesc}</h3>
                                    <br />
                                    <h4>Released on {movie.releaseDate}</h4>
                                    <Link to={`/movies/${id}/editMovie`}>  <button className="btn btn-success" style={{ marginRight: "30px" }}>Edit Movie</button></Link>
                                    <Link to={`/movies/${id}/deleteMovie`}>  <button className="btn btn-danger">Delete Movie</button></Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="container">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div><h1 style={{ fontSize: "45px" }}> <span style={{ color: "#F5C518", padding: "5px" }}> |  </span> User Reviews </h1></div>
                    {login ? <Link to={`/movies/${id}/addReview`}> <div><button className="btn btn-primary" style={{ padding: "10px 5px" }} >Add Review</button> </div> </Link> : <Link to="/login"><div><button className="btn btn-primary" style={{ padding: "10px 5px" }} >Signin to add review</button> </div></Link>}

                </div>
                {
                    Reviews.filter((data) => {
                        return data.movieId === parseInt(id)
                    }).map(function (review) {
                        return (
                            <Review review={review} />
                        )
                    })
                }

            </div>
        </div >
    )
}


export default Movie;