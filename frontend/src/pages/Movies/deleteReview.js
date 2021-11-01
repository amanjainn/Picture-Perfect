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
                <button className="btn btn-danger btn-lg" style={{ marginRight: "30px" }}>Yes</button>
                <Link to={`/movies/${id}`} ><button className="btn btn-primary btn-lg">No</button> </Link>
            </div>
        </>
    )
}

export default DeleteReview