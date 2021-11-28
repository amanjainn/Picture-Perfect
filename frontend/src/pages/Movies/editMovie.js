import React, { useEffect, useState } from 'react'
import Navbar from '../layouts/navbar'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';



const baseURL = "https://q039qh40c3.execute-api.us-east-2.amazonaws.com/prod"

const EditMovies = ({ user, isUserSignedIn }) => {
    const history = useHistory();
    const { id } = useParams();
    const [movieName, setMovie] = useState('')
    const [movieDesc, setMovieDesc] = useState('')
    const [language, setLanguage] = useState('')
    const [duration, setDuration] = useState('')
    const [releaseDate, setReleasedOn] = useState('')
    const [movieImage, setThumbnail] = useState('')
    useEffect(() => {
        axios.get(baseURL + '/movies', { params: { movieId: id } }).then((response) => {
            setMovie(response.data.movieName)
            setMovieDesc(response.data.movieDesc)
            setLanguage(response.data.language)
            setDuration(response.data.duration)
            setReleasedOn(response.data.releaseDate)
            setThumbnail(response.data.movieImage)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(baseURL + '/movies', {
            movieName,
            movieDesc,
            language,
            duration,
            releaseDate,
            movieImage,
        }, { params: { movieId: id } }).then(res => {
            history.push(`/movies/${id}`)
            window.location.reload();
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
                <h1>Edit a Movie </h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="rating">Movie Name</label>
                        <input required value={movieName} onChange={(e) => setMovie(e.target.value)} type="text" className="form-control" placeholder="Enter movie's name" />
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
                        <input required value={releaseDate} onChange={(e) => setReleasedOn(e.target.value)} type="text" className="form-control" placeholder="Movie released on" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Movie Thumbnail</label>
                        <input required value={movieImage} onChange={(e) => setThumbnail(e.target.value)} type="text" className="form-control" placeholder="Enter the url of movie's thumbnail" />
                    </div>
                    <button type="submit" className=" btn  btn-block" style={{ backgroundColor: "#F5C419", color: "black", height: "40px", marginTop: "20px" }} > Edit  </button>
                </form>

            </div>
        </>
    )
}

export default EditMovies