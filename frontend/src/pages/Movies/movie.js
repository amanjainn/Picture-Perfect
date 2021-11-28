import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../layouts/navbar'
import Review from '../Movies/review'
import axios from 'axios'

const baseURL = "https://q039qh40c3.execute-api.us-east-2.amazonaws.com/prod"

const Movie = ({ userSigned, adminSigned, user, isUserSignedIn }) => {
    const { id } = useParams();
    useEffect(() => {
        axios.get(baseURL + '/movies', { params: { movieId: id } }).then((response) => {
            setMovie(response.data);
        })
    }, [])

    useEffect(() => {
        axios.get(baseURL + '/reviews', { params: { movieId: id } }).then((response) => {
            setReviews(response.data)
        })
    }, [])
    const [movie, setMovie] = useState({})
    const [Reviews, setReviews] = useState([])

    return (
        <div>
            <Navbar active="movie" userSigned={userSigned} adminSigned={adminSigned} user={user} isUserSignedIn={isUserSignedIn} />

            <div className="container">


                <div className="row m-6">
                    <div className="col-sm-4" >
                        <img height="350px" width="300px" src={movie.movieImage} alt={movie.movieName} />
                    </div>
                    <div className="col-sm-8 movie">
                        <h1 style={{ fontSize: "70px" }}>{movie.movieName}</h1>
                        <h2>{movie.language} : {movie.duration}</h2>
                        <h3>{movie.movieDesc}</h3>
                        <br />
                        <h4>Released on {movie.releaseDate}</h4>
                        {adminSigned && <Link to={`/movies/${id}/editMovie`}>  <button className="btn " style={{ marginRight: "30px", backgroundColor: "#F5C419", color: "#131312" }}>Edit Movie</button></Link>}
                        {adminSigned && <Link to={`/movies/${id}/deleteMovie`}>  <button className="btn" style={{ backgroundColor: "#131312", color: "#F5C419" }}>Delete Movie</button></Link>}
                    </div>
                </div>
            </div>
            <div className="container">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px" }}>
                    <div><h1 style={{ fontSize: "45px" }}> | <span style={{ color: "#F5C419", padding: "5px" }}>  User Reviews </span>  </h1></div>
                    {(userSigned || adminSigned) ? <Link to={`/movies/${id}/addReview`}> <div><button className="btn btn-block" style={{ padding: "10px 5px", backgroundColor: "#F5C419", color: "black" }} >Add Review</button> </div> </Link> : <Link to="/login"><div><button className="btn  btn-block" style={{ padding: "10px 5px", backgroundColor: "#F5C419", color: "black" }} >Signin to add review</button> </div></Link>}

                </div>
                <div >
                    {
                        Reviews.map(function (review) {
                            return (
                                <Review review={review} userSigned={userSigned} adminSigned={adminSigned} username={user.username} />
                            )
                        })
                    }
                    {Reviews.length <= 0 && <h2 >There aren't any reviews for this movie yet.</h2>}
                </div>

            </div>
        </div >
    )
}


export default Movie;