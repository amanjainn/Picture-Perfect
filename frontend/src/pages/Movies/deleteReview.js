import React from 'react'
import Navbar from '../layouts/navbar'
import { Link, useParams } from 'react-router-dom'


const DeleteReview = ({ user, isUserSignedIn }) => {

    const { id } = useParams();
    return (
        <>
            <Navbar active="movie" userSigned={true} adminSigned={true} user={user} isUserSignedIn={isUserSignedIn} />
            <div className="container">
                <h1> Are you sure you want to delete this review?</h1>
                <button className="btn  btn-lg" style={{ marginRight: "30px", backgroundColor: "#F5C419", color: "#131312" }}>Yes</button>
                <Link to={`/movies/${id}`} ><button className="btn btn-lg" style={{ backgroundColor: "#131312", color: "#F5C419" }}>No</button> </Link>
            </div>
        </>
    )
}

export default DeleteReview