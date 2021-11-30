import React, { useEffect, useState } from "react"
import Navbar from "../layouts/navbar"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
const baseURL = process.env.REACT_APP_API

const Show = ({ userSigned, adminSigned, user, isUserSignedIn }) => {
    const { id } = useParams()
    const [show, setShowData] = useState({})
    useEffect(() => {
        axios.get(baseURL + "/shows", { params: { showId: id } }).then((response) => {
            setShowData(response.data)
        })
    }, [])

    return (
        <div>
            <Navbar
                active="show"
                userSigned={userSigned}
                adminSigned={adminSigned}
                user={user}
                isUserSignedIn={isUserSignedIn}
            />

            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <img
                            height="350px"
                            width="300px"
                            src={show.showImg}
                            alt={show.showName}
                        />
                    </div>
                    <div className="col-sm-8">
                        <h1 style={{ fontSize: "70px" }}>{show.showName}</h1>
                        <h2>Theatre : {show.theatreName}</h2>
                        <h3> Location : {show.theatreLocation}, {show.cityName}</h3>
                        <br />
                        <h3>Date : {show.date}</h3>
                        <h3>Timings : {show.time}</h3>
                        <br />
                        {adminSigned && (
                            <Link to={`/shows/${id}/editShow`}>
                                <button
                                    className="btn btn-lg"
                                    style={{
                                        marginRight: "30px",
                                        backgroundColor: "#F5C419",
                                        color: "#131312",
                                    }}
                                >
                                    Edit Show
                                </button>
                            </Link>
                        )}
                        {adminSigned && (
                            <Link to={`/shows/${id}/deleteShow`}>
                                <button
                                    className="btn btn-lg "
                                    style={{ backgroundColor: "#131312", color: "#F5C419" }}
                                >
                                    Delete Show
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Show
