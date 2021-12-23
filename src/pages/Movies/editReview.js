import React, { useEffect, useState } from "react";
import Navbar from "../layouts/navbar";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
const baseURL = "https://j99npls842.execute-api.us-east-2.amazonaws.com/dev"

const EditReview = ({ user, isUserSignedIn }) => {
    const history = useHistory();
    const { id, id2 } = useParams();
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");
    const getTime = () => {
        var today = new Date();
        var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + " " + time;
        return dateTime;
    };
    useEffect(() => {
        axios.get(baseURL + "/reviews", { params: { reviewId: id2 } }).then((response) => {
            if (Object.keys(response.data).length === 0 && Object.getPrototypeOf(response.data) === Object.prototype) {
                history.push("/error")
            }
            setRating(response.data.rating);
            setReview(response.data.review);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .patch(
                baseURL + "/reviews",
                {
                    movieId: id,
                    userName: user.username,
                    rating,
                    review,
                    lastUpdated: getTime(),
                },
                { params: { reviewId: id2 } }
            )
            .then((res) => {
                setTimeout(() => {
                    history.push(`/movies/${id}`);
                    window.location.reload();
                }, 100);
            });
        setRating("");
        setReview("");
    };

    return (
        <>
            <Navbar
                active="movie"
                userSigned={true}
                adminSigned={true}
                user={user}
                isUserSignedIn={isUserSignedIn}
            />
            <div className="container">
                <h1>Edit a review </h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <input
                            required
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Enter values between 0 to 10 inclusive"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Review</label>
                        <input
                            required
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Write few words about the movie"
                        />
                    </div>
                    <button
                        type="submit"
                        className=" btn  btn-block"
                        style={{ backgroundColor: "#F5C419", color: "#131312" }}
                    >

                        Edit
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditReview;
