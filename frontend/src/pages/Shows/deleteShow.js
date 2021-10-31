import React from 'react'
import Navbar from '../layouts/navbar'
import { Link, useParams } from 'react-router-dom'


const DeleteShow = () => {

    const { id } = useParams();
    return (
        <>
            <Navbar active="show" userSigned={true} adminSigned={true} />
            <div className="container">
                <h1> Are you sure you want to delete this show ?</h1>
                <button className="btn btn-danger btn-lg" style={{ marginRight: "30px" }}>Yes</button>
                <Link to={`/shows/${id}`} ><button className="btn btn-primary btn-lg">No</button> </Link>
            </div>
        </>
    )
}

export default DeleteShow