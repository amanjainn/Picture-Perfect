import React, { useState } from "react"
import Navbar from "../layouts/navbar"
import axios from "axios"
import { useHistory } from "react-router-dom"
const baseURL = process.env.REACT_APP_API

const AddShow = ({ user, isUserSignedIn }) => {
    const history = useHistory()
    const [info, setInfo] = useState({
        theatreName: "",
        theatreLocation: "",
        cityName: "",
        showName: "",
        showImg: "",
        time: "",
        date: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(baseURL + "/shows", {
            theatreName: info.theatreName,
            theatreLocation: info.theatreLocation,
            cityName: info.cityName,
            showName: info.showName,
            showImg: info.showImg,
            time: info.time,
            date: info.date,
        }).then((res) => {
            setTimeout(() => {
                history.push("/shows")
                window.location.reload()
            }, 100)
        })
        setInfo({
            theatreName: "",
            theatreLocation: "",
            cityName: "",
            showName: "",
            showImg: "",
            time: "",
            date: "",
        })
    }
    return (
        <>
            <Navbar
                active="show"
                userSigned={true}
                adminSigned={true}
                user={user}
                isUserSignedIn={isUserSignedIn}
            />
            <div className="container">
                <h1>Add a Show </h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="rating">Show Name</label>
                        <input
                            required
                            value={info.showName}
                            onChange={(e) => setInfo({ ...info, showName: e.target.value })}
                            type="text"
                            className="form-control"
                            placeholder="Enter show's name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Theatre Name</label>
                        <input
                            required
                            value={info.theatreName}
                            onChange={(e) => setInfo({ ...info, theatreName: e.target.value })}
                            type="text"
                            className="form-control"
                            placeholder="Enter theatre's name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Theatre Location</label>
                        <input
                            required
                            value={info.theatreLocation}
                            onChange={(e) =>
                                setInfo({ ...info, theatreLocation: e.target.value })
                            }
                            type="text"
                            className="form-control"
                            placeholder="Enter theatre's location"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">City</label>
                        <input
                            required
                            value={info.cityName}
                            onChange={(e) => setInfo({ ...info, cityName: e.target.value })}
                            type="text"
                            className="form-control"
                            placeholder="Enter city"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Time</label>
                        <input
                            required
                            value={info.time}
                            onChange={(e) => setInfo({ ...info, time: e.target.value })}
                            type="text"
                            className="form-control"
                            placeholder="Enter Show's time"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Date</label>
                        <input
                            required
                            value={info.date}
                            onChange={(e) => setInfo({ ...info, date: e.target.value })}
                            type="text"
                            className="form-control"
                            placeholder="Enter Show's data"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Show Thumbnail</label>
                        <input
                            required
                            value={info.showImg}
                            onChange={(e) => setInfo({ ...info, showImg: e.target.value })}
                            type="text"
                            className="form-control"
                            placeholder="Enter the url of show's thumbnail"
                        />
                    </div>
                    <button
                        type="submit"
                        className=" btn btn-block"
                        style={{ backgroundColor: "#F5C419", color: "#131312" }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddShow
