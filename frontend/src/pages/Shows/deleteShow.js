import React from 'react'
import Navbar from '../layouts/navbar'
import { Link, useParams } from 'react-router-dom'


const DeleteShow = ({ user, isUserSignedIn }) => {

    const { id } = useParams();
    return (
        <>
            <Navbar active="show" userSigned={true} adminSigned={true} user={user} isUserSignedIn={isUserSignedIn} />
            <div className="container">
                <h1> Are you sure you want to delete this show ?</h1>
                <button className="btn btn-lg" style={{ marginRight: "30px", backgroundColor: "#131312", color: "#F5C419" }}>Yes</button>
                <Link to={`/shows/${id}`} ><button className="btn  btn-lg" style={{ backgroundColor: "#F5C419", color: "#131312" }}>No</button> </Link>
            </div>
        </>
    )
}

export default DeleteShow