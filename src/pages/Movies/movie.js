import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Navbar from "../layouts/navbar";
import Review from "../Movies/review";
import axios from "axios";
import Loader from "react-loader-spinner"
const baseURL = "https://j99npls842.execute-api.us-east-2.amazonaws.com/dev"

const Movie = ({ userSigned, adminSigned, user, isUserSignedIn }) => {
    const { id } = useParams();
    const history = useHistory();
    const [movie, setMovie] = useState({});
    const [Reviews, setReviews] = useState([]);
    const [myReviews, setMyReviews] = useState([]);
    const [lowRatings, setLowRatings] = useState([]);
    const [highRatings, setHighRatings] = useState([]);
    const [loader, setLoader] = useState(true);
    const [status, setStatus] = useState({ showAllReviews: true, showMyReviews: false, showLowReviews: false, showHighReviews: false })
    useEffect(() => {
        axios.get(baseURL + "/movies", { params: { movieId: id } }).then((response) => {
            setMovie(response.data);
            if (Object.keys(response.data).length === 0 && Object.getPrototypeOf(response.data) === Object.prototype) {
                history.push("/error")
            }
            setLoader(false);
        })
    }, []);

    useEffect(() => {
        axios.get(baseURL + "/reviews", { params: { movieId: id } }).then((response) => {
            setReviews(response.data);
            const userReviews = response.data.filter(
                (res) => res.userName === user.username
            );
            const lowReviews = response.data.filter(
                (res) => parseFloat(res.rating) <= 5
            );

            const highReviews = response.data.filter(
                (res) => parseFloat(res.rating) > 5
            );
            setMyReviews(userReviews);
            setLowRatings(lowReviews);
            setHighRatings(highReviews);
        });
    }, []);

    return (
        <div>
            <Navbar
                active="movie"
                userSigned={userSigned}
                adminSigned={adminSigned}
                user={user}
                isUserSignedIn={isUserSignedIn}
            />
            {loader &&
                <div className="container" style={{ marginTop: "100px", width: "8%" }}>
                    <Loader type="Puff" color="#F5C419" height={150} width={150} />
                </div>
            }
            {!loader &&
                <div className="container">
                    <div className="row m-6">
                        <div className="col-sm-4">
                            <img
                                height="350px"
                                width="300px"
                                src={movie.movieImage}
                                alt={movie.movieName}
                            />
                        </div>
                        <div className="col-sm-8 movie">
                            <h1 style={{ fontSize: "70px" }}>{movie.movieName}</h1>
                            <h2>
                                {movie.language} : {movie.duration}
                            </h2>
                            <h3>{movie.movieDesc}</h3>
                            <br />
                            <h4>Released on {movie.releaseDate}</h4>
                            {adminSigned && (
                                <Link to={`/movies/${id}/editMovie`}>
                                    <button
                                        className="btn "
                                        style={{
                                            marginRight: "30px",
                                            backgroundColor: "#F5C419",
                                            color: "#131312",
                                        }}
                                    >
                                        Edit Movie
                                    </button>
                                </Link>
                            )}
                            {adminSigned && (
                                <Link to={`/movies/${id}/deleteMovie`}>
                                    <button
                                        className="btn"
                                        style={{ backgroundColor: "#131312", color: "#F5C419" }}
                                    >
                                        Delete Movie
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            }

            {!loader &&
                <div className="container">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "30px",
                        }}
                    >
                        <div>
                            <h1 style={{ fontSize: "45px" }}>
                                |
                                <span style={{ color: "#F5C419", padding: "5px" }}>
                                    User Reviews
                                </span>
                            </h1>
                        </div>
                        {(userSigned || adminSigned) && myReviews.length === 0 && (
                            <>
                                <Link to={`/movies/${id}/addReview`}>
                                    <div>
                                        <button

                                            className="btn btn-block"
                                            style={{
                                                padding: "10px 5px",
                                                backgroundColor: "#F5C419",
                                                color: "black",
                                            }}
                                        >
                                            Add Review
                                        </button>
                                    </div>
                                </Link>
                            </>
                        )}

                        {(!userSigned && !adminSigned) && (
                            <Link to="/login">
                                <div>
                                    <button
                                        className="btn  btn-block"
                                        style={{
                                            padding: "10px 5px",
                                            backgroundColor: "#F5C419",
                                            color: "black",
                                        }}
                                    >
                                        Signin to add review
                                    </button>
                                </div>
                            </Link>
                        )}
                    </div>

                    <div>
                        {Reviews.length > 0 && (
                            <div style={{ margin: "40px 0px" }}>
                                <button
                                    className="btn btn-lg"
                                    onClick={() => setStatus({ showAllReviews: true, showMyReviews: false, showLowReviews: false, showHighReviews: false })}
                                    style={{ backgroundColor: "#041434" }}
                                >
                                    All Ratings
                                </button>
                                {(adminSigned || userSigned) && (
                                    <button
                                        className="btn btn-lg "
                                        onClick={() => setStatus({ showAllReviews: false, showMyReviews: true, showLowReviews: false, showHighReviews: false })}
                                        style={{ marginLeft: "20px", backgroundColor: "   #047db1" }}
                                    >
                                        My ratings
                                    </button>
                                )}
                                <button
                                    className="btn btn-lg "
                                    onClick={() => setStatus({ showAllReviews: false, showMyReviews: false, showLowReviews: true, showHighReviews: false })}
                                    style={{ marginLeft: "20px", backgroundColor: "#040b25" }}
                                >
                                    Low ratings
                                </button>
                                <button
                                    className="btn btn-lg "
                                    onClick={() => setStatus({ showAllReviews: false, showMyReviews: false, showLowReviews: false, showHighReviews: true })}
                                    style={{ marginLeft: "20px", backgroundColor: "#002A54" }}
                                >
                                    High ratings
                                </button>
                            </div>
                        )}

                        {status.showAllReviews &&
                            Reviews.map(function (review) {
                                return (
                                    <Review key={review.reviewId}
                                        review={review}
                                        userSigned={userSigned}
                                        adminSigned={adminSigned}
                                        username={user.username}
                                    />
                                );
                            })}
                        {status.showMyReviews &&
                            myReviews.map(function (review) {
                                return (
                                    <Review key={review.reviewId}
                                        review={review}
                                        userSigned={userSigned}
                                        adminSigned={adminSigned}
                                        username={user.username}
                                    />
                                );
                            })}
                        {status.showLowReviews &&
                            lowRatings.map(function (review) {
                                return (
                                    <Review

                                        key={review.reviewId}
                                        review={review}
                                        userSigned={userSigned}
                                        adminSigned={adminSigned}
                                        username={user.username}
                                    />
                                );
                            })}
                        {status.showHighReviews &&
                            highRatings.map(function (review) {
                                return (
                                    <Review
                                        key={review.reviewId}
                                        review={review}
                                        userSigned={userSigned}
                                        adminSigned={adminSigned}
                                        username={user.username}
                                    />
                                );
                            })}
                        {Reviews.length <= 0 && (
                            <h2>There aren't any reviews for this movie yet.</h2>
                        )}
                    </div>
                </div>
            }
        </div >
    )
}

export default Movie;