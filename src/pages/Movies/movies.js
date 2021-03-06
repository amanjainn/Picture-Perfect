import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../layouts/navbar";
import Loader from "react-loader-spinner"

const baseURL = "https://j99npls842.execute-api.us-east-2.amazonaws.com/dev"

const Movies = ({ userSigned, adminSigned, user, isUserSignedIn }) => {
    useEffect(() => {
        axios.get(baseURL + "/movies").then((response) => {
            const hindi = response.data.filter((res) =>
                res.language.toLowerCase().includes("hindi")
            );
            const english = response.data.filter((res) =>
                res.language.toLowerCase().includes("english")
            );

            setHindiData(hindi);
            setEnglishData(english);
            setLoader(false);
        });
    }, []);

    const [HindiData, setHindiData] = useState([]);
    const [EnglishData, setEnglishData] = useState([]);
    const [item, setItem] = useState("");
    const [loader, setLoader] = useState(true);
    return (
        <>
            <Navbar
                active="movie"
                userSigned={userSigned}
                adminSigned={adminSigned}
                user={user}
                isUserSignedIn={isUserSignedIn}
            />
            {loader &&
                <div className="container" style={{ marginTop: "100px", width: "8%" }}>
                    <Loader type="Puff" color="#F5C419" height={150} width={150} />
                </div>
            }
            {!loader &&
                <div>
                    <div
                        className="form-group"
                        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
                    >
                        <input
                            style={{
                                width: "850px",
                                height: "60px",
                                fontSize: "20px",
                                marginBottom: "20px",
                            }}
                            className="form-control"
                            type="search"
                            placeholder="Search Movies"
                            value={item}
                            onChange={(e) => setItem(e.target.value)}
                        />
                    </div>
                    <div style={{ marginLeft: "40px" }}>
                        {HindiData.length > 0 && (
                            <div>
                                <h1 style={{ fontSize: "40px" }}>
                                    <span style={{ color: "#F5C419" }}> | </span> Bollywood
                                </h1>
                                {HindiData.filter((data) => {
                                    return (
                                        data.movieName.toLowerCase().includes(item.toLowerCase()) ||
                                        item.toLowerCase().includes(data.movieName.toLowerCase())
                                    );
                                }).map(function (data) {
                                    return (
                                        <Link to={`/movies/${data.movieId}`} key={data.movieId}>

                                            <img
                                                width="210px "
                                                style={{ display: "inline", margin: "10px" }}
                                                height="310px"
                                                src={data.movieImage}
                                                alt={data.movieName}
                                            ></img>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    {EnglishData.length > 0 && (
                        <div style={{ marginLeft: "40px", marginTop: "20px" }}>
                            <h1 style={{ fontSize: "40px" }}>
                                <span style={{ color: "#F5C419" }}> | </span> Hollywood
                            </h1>
                            <div>
                                {EnglishData.filter((data) => {
                                    return (
                                        data.movieName.toLowerCase().includes(item.toLowerCase()) ||
                                        item.toLowerCase().includes(data.movieName.toLowerCase())
                                    );
                                }).map(function (data) {
                                    return (
                                        <Link to={`/movies/${data.movieId}`} key={data.movieId}>

                                            <img
                                                width="210px "
                                                style={{ display: "inline", margin: "10px" }}
                                                height="310px"
                                                src={data.movieImage}
                                                alt={data.movieName}
                                            ></img>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    );
};

export default Movies;
