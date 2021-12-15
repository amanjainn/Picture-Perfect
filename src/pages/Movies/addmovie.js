import axios from "axios";
import React, { useState } from "react";
import Navbar from "../layouts/navbar";
import { useHistory } from "react-router-dom";
const baseURL = "https://can6t7sia8.execute-api.us-east-2.amazonaws.com/dev"

const AddMovie = ({ user, isUserSignedIn }) => {
    const history = useHistory();
    const [data, setData] = useState({
        movie: "",
        movieDesc: "",
        language: "",
        duration: "",
        releasedOn: "",
        thumbnail: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(baseURL + "/movies", {
            movieName: data.movie,
            movieDesc: data.movieDesc,
            movieImage: data.thumbnail,
            language: data.language,
            duration: data.duration,
            releaseDate: data.releasedOn,
        }).then((res) => {
            console.log(res);
            setTimeout(() => {
                history.push("/movies");
                window.location.reload();
            }, 100);
        });
        setData({
            movie: "",
            movieDesc: "",
            language: "",
            duration: "",
            releasedOn: "",
            thumbnail: "",
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
                <h1>Add a Movie </h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="rating">Movie Name</label>
                        <input
                            required
                            value={data.movie}
                            onChange={(e) => setData({ ...data, movie: e.target.value })}
                            type="text"
                            className="form-control"
                            placeholder="Enter movie's name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Movie Desc</label>
                        <input
                            required
                            value={data.movieDesc}
                            onChange={(e) => setData({ ...data, movieDesc: e.target.value })}
                            type="text"
                            className="form-control"
                            placeholder="Enter movie's description"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Language</label>
                        <input
                            required
                            value={data.language}
                            onChange={(e) => setData({ ...data, language: e.target.value })}
                            type="text"
                            className="form-control"
                            placeholder="Enter movie's language"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Duration</label>
                        <input
                            required
                            value={data.duration}
                            onChange={(e) => setData({ ...data, duration: e.target.value })}
                            type="text"
                            className="form-control"
                            placeholder="Enter movie's duration"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Released on</label>
                        <input
                            required
                            value={data.releasedOn}
                            onChange={(e) => setData({ ...data, releasedOn: e.target.value })}
                            type="text"
                            className="form-control"
                            placeholder="Movie released on"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Movie Thumbnail</label>
                        <input
                            required
                            value={data.thumbnail}
                            onChange={(e) => setData({ ...data, thumbnail: e.target.value })}
                            type="text"
                            className="form-control"
                            placeholder="Enter the url of movie's thumbnail"
                        />
                    </div>
                    <button
                        type="submit"
                        className=" btn  btn-block"
                        style={{
                            backgroundColor: "#F5C419",
                            color: "black",
                            height: "40px",
                            marginTop: "20px",
                        }}
                    >

                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddMovie;
