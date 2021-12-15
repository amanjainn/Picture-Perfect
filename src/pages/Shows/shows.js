import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Navbar from "../layouts/navbar"
import axios from "axios"
const baseURL = "https://can6t7sia8.execute-api.us-east-2.amazonaws.com/dev"

const Shows = ({ userSigned, adminSigned, user, isUserSignedIn }) => {
    const [show, setShow] = useState(false)
    const [cityItem, setCityItem] = useState("")
    const [showNameItem, setShowNameItem] = useState("")
    const [ShowData, setshowData] = useState([])
    const [info, setInfo] = useState({ city: "", showName: "" });


    const handleSubmit = (e) => {
        e.preventDefault()
        setShowNameItem(info.showName)
        setCityItem(info.city)
        setShow(true)
    }
    let shows = false
    useEffect(() => {
        axios.get(baseURL + "/shows").then((res) => {
            setshowData(res.data)
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
                <h1 style={{ marginBottom: "30px" }}>Search shows </h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            style={{ height: "50px", fontSize: "20px" }}
                            required
                            type="text"
                            value={info.city}
                            onChange={(e) => { setInfo({ ...info, city: e.target.value }) }}
                            className="form-control"
                            placeholder="Enter name of city"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            style={{ height: "50px", fontSize: "20px" }}
                            type="text"
                            value={info.showName}
                            onChange={(e) => setInfo({ ...info, showName: e.target.value })}
                            className="form-control"
                            placeholder="Enter name of movie"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-block"
                        style={{
                            height: "35px",
                            backgroundColor: "#F5C419",
                            color: "black",
                            fontSize: "20px",
                            marginBottom: "40px",
                        }}
                    >
                        Search
                    </button>
                </form>

                {show && (
                    <div>
                        <h1 style={{ fontSize: "40px" }}>
                            |
                            <span style={{ color: "#F5C419", padding: "5px" }}>
                                All Shows
                            </span>
                        </h1>
                    </div>
                )}
                {show &&
                    ShowData.filter((shows) => {
                        return (
                            (shows.cityName.toLowerCase().includes(cityItem.toLowerCase()) ||
                                cityItem.toLowerCase().includes(shows.cityName)) &&
                            (shows.showName.toLowerCase().includes(showNameItem.toLowerCase()) ||
                                showNameItem.toLowerCase().includes(shows.showName))
                        )
                    }).map(function (showItem) {
                        shows = true
                        return (
                            <div
                                className="card col-sm-3"
                                style={{
                                    width: "22rem",
                                    height: "450px",
                                    backgroundColor: "#131312",
                                }}
                            >
                                <img
                                    className="card-img-top"
                                    width="200px"
                                    height="200px"
                                    src={showItem.showImg}
                                    alt="Card cap"
                                />
                                <div className="card-body " style={{ backgroundColor: "#131312" }}>
                                    <h4 className="card-title">{showItem.showName}</h4>
                                    <p className="card-text">Time : {showItem.time}</p>
                                    <p className="card-text text-muted">
                                        Location : {showItem.theatreName}
                                    </p>
                                    <p className="card-text text-muted"> {showItem.date}</p>
                                    <Link to={`/shows/${showItem.showId}`}>
                                        <button
                                            className="btn "
                                            style={{ backgroundColor: "#F5C419", color: "black" }}
                                        >
                                            More Info
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                {show && !shows && <h2>No shows at this moment.</h2>}
            </div>
        </div>
    )
}

export default Shows
