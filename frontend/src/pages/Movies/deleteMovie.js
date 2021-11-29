import React, { useState } from 'react'
import Navbar from '../layouts/navbar'
import { Link, useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
const baseURL = process.env.REACT_APP_API

const DeleteMovies = ({ user, isUserSignedIn }) => {

    const { id } = useParams();
    const history = useHistory();
    const [deleted, setDeleted] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.delete(baseURL + '/movies', { params: { movieId: id } }).then(res => {
            setDeleted(true)
            setTimeout(() => {
                history.push('/movies')
                window.location.reload();
            }, 100)
        })
    }
    return (
        <>
            <Navbar active="movie" userSigned={true} adminSigned={true} user={user} isUserSignedIn={isUserSignedIn} />
            <div className="container">
                {!deleted &&
                    <>
                        <h1> Are you sure you want to delete this movie?</h1>
                        <button onClick={handleSubmit} className="btn  btn-lg" style={{ marginRight: "30px", backgroundColor: "#F5C419", color: "#131312" }}>Yes</button>
                        <Link to={`/movies/${id}`} ><button className="btn btn-lg" style={{ backgroundColor: "#131312", color: "#F5C419" }} >No</button> </Link>
                    </>
                }
                {deleted && <h1>Successfully deleted</h1>}
            </div>
        </>
    )
}

export default DeleteMovies