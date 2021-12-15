import React, { useState } from "react";
import Navbar from "../layouts/navbar";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
const baseURL = "https://can6t7sia8.execute-api.us-east-2.amazonaws.com/dev"

const DeleteReview = ({ user, isUserSignedIn }) => {
    const [deleted, setDeleted] = useState(false);
    const { id, id2 } = useParams();
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.delete(baseURL + "/reviews", { params: { reviewId: id2 } }).then((res) => {
            console.log(id, id2);
            setDeleted(true);
            setTimeout(() => {
                history.push(`/movies/${id}`);
                window.location.reload();
            }, 100);
        });
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
                {!deleted && (
                    <>
                        <h1> Are you sure you want to delete this review?</h1>
                        <button
                            onClick={handleSubmit}
                            className="btn  btn-lg"
                            style={{
                                marginRight: "30px",
                                backgroundColor: "#F5C419",
                                color: "#131312",
                            }}
                        >
                            Yes
                        </button>
                        <Link to={`/movies/${id2}`}>
                            <button
                                className="btn btn-lg"
                                style={{ backgroundColor: "#131312", color: "#F5C419" }}
                            >
                                No
                            </button>
                        </Link>
                    </>
                )}
                {deleted && <h1>Successfully deleted</h1>}
            </div>
        </>
    );
};

export default DeleteReview;
