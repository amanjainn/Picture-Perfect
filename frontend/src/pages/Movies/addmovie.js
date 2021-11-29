import axios from 'axios'
import React, { useState } from 'react'
import Navbar from '../layouts/navbar'
import { useHistory } from 'react-router-dom'
const baseURL = process.env.REACT_APP_API


const AddMovie = ({ user, isUserSignedIn }) => {
    const history = useHistory();
    const [movie, setMovie] = useState('')
    const [movieDesc, setMovieDesc] = useState('')
    const [language, setLanguage] = useState('')
    const [duration, setDuration] = useState('')
    const [releasedOn, setReleasedOn] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(baseURL + '/movies', {
            movieName: movie,
            movieDesc,
            movieImage: thumbnail,
            language,
            duration,
            releaseDate: releasedOn,
        }).then(res => {
            setTimeout(() => {
                history.push('/movies')
                window.location.reload();
            }, 100)
        })

        setMovie('')
        setMovieDesc('')
        setLanguage('')
        setDuration('')
        setReleasedOn('')
        setThumbnail('')
    }
    return (
        <>
            <Navbar active="movie" userSigned={true} adminSigned={true} user={user} isUserSignedIn={isUserSignedIn} />
            <div className="container">
                <h1>Add a Movie </h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="rating">Movie Name</label>
                        <input required value={movie} onChange={(e) => setMovie(e.target.value)} type="text" className="form-control" placeholder="Enter movie's name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Movie Desc</label>
                        <input required value={movieDesc} onChange={(e) => setMovieDesc(e.target.value)} type="text" className="form-control" placeholder="Enter movie's description" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Language</label>
                        <input required value={language} onChange={(e) => setLanguage(e.target.value)} type="text" className="form-control" placeholder="Enter movie's language" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Duration</label>
                        <input required value={duration} onChange={(e) => setDuration(e.target.value)} type="text" className="form-control" placeholder="Enter movie's duration" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Released on</label>
                        <input required value={releasedOn} onChange={(e) => setReleasedOn(e.target.value)} type="text" className="form-control" placeholder="Movie released on" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Movie Thumbnail</label>
                        <input required value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} type="text" className="form-control" placeholder="Enter the url of movie's thumbnail" />
                    </div>
                    <button type="submit" className=" btn  btn-block" style={{ backgroundColor: "#F5C419", color: "black", height: "40px", marginTop: "20px" }} > Submit  </button>
                </form>

            </div>
        </>
    )

}

export default AddMovie