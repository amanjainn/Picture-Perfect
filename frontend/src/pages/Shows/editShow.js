import React, { useState, useEffect } from 'react'
import Navbar from '../layouts/navbar'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';
const baseURL = process.env.REACT_APP_API


const EditShow = ({ user, isUserSignedIn }) => {
    const history = useHistory();
    const { id } = useParams();
    const [theatreName, setTheatreName] = useState('')
    const [theatreLocation, setTheatreLocation] = useState('')
    const [cityName, setCityName] = useState('')
    const [showName, setShowName] = useState('')
    const [showImg, setShowImg] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')


    useEffect(() => {
        axios.get(baseURL + '/shows', { params: { showId: id } }).then(res => {
            setShowName(res.data.showName)
            setDate(res.data.date)
            setCityName(res.data.cityName)
            setShowImg(res.data.showImg)
            setTime(res.data.time)
            setTheatreLocation(res.data.theatreLocation)
            setTheatreName(res.data.theatreName)
        })
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(baseURL + '/shows', {
            theatreName,
            theatreLocation,
            cityName,
            showName,
            showImg,
            time,
            date,

        }, { params: { showId: id } }).then(res => {
            setTimeout(() => {
                history.push('/shows')
                window.location.reload();
            }, 100)
        })
        setShowName('')
        setDate('')
        setCityName('')
        setShowImg('')
        setTime('')
        setTheatreLocation('')
        setTheatreName('')
    }
    return (
        <>
            <Navbar active="show" userSigned={true} adminSigned={true} user={user} isUserSignedIn={isUserSignedIn} />
            <div className="container">
                <h1>Edit a Show </h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="rating">Show Name</label>
                        <input required value={showName} onChange={(e) => setShowName(e.target.value)} type="text" className="form-control" placeholder="Enter show's name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Theatre Name</label>
                        <input required value={theatreName} onChange={(e) => setTheatreName(e.target.value)} type="text" className="form-control" placeholder="Enter theatre's name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Theatre Location</label>
                        <input required value={theatreLocation} onChange={(e) => setTheatreLocation(e.target.value)} type="text" className="form-control" placeholder="Enter theatre's location" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">City</label>
                        <input required value={cityName} onChange={(e) => setCityName(e.target.value)} type="text" className="form-control" placeholder="Enter city" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Time</label>
                        <input required value={time} onChange={(e) => setTime(e.target.value)} type="text" className="form-control" placeholder="Enter Show's time" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Date</label>
                        <input required value={date} onChange={(e) => setDate(e.target.value)} type="text" className="form-control" placeholder="Enter Show's data" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Show Thumbnail</label>
                        <inputrequired value={showImg} onChange={(e) => setShowImg(e.target.value)} type="text" className="form-control" placeholder="Enter the url of show's thumbnail" />
                    </div>
                    <button type="submit" className=" btn btn-block" style={{ backgroundColor: "#F5C419", color: "#131312" }} > Edit  </button>
                </form>

            </div>
        </>
    )
}

export default EditShow