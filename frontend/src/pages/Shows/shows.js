import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../layouts/navbar'
import { ShowData } from '../../data/shows'


const Shows = ({ userSigned, adminSigned, user, isUserSignedIn }) => {
    const [show, setShow] = useState(false)
    const [city, setCity] = useState('')
    const [showName, setShowName] = useState('')
    const [cityItem, setCityItem] = useState('')
    const [showNameItem, setShowNameItem] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowNameItem(showName)
        setCityItem(city)
        setShow(true)

    }

    return (
        <div>
            <Navbar active="show" userSigned={userSigned} adminSigned={adminSigned} user={user} isUserSignedIn={isUserSignedIn} />
            <div className="container">
                <h1 style={{ marginBottom: "30px" }}>Search shows </h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group" >
                        <input style={{ height: "50px", fontSize: "20px" }} required type="text" value={city} onChange={(e) => setCity(e.target.value)} className="form-control" name="" id="" placeholder="Enter name of city" />
                    </div>
                    <div className="form-group">
                        <input style={{ height: "50px", fontSize: "20px" }} type="text" name="" value={showName} onChange={(e) => setShowName(e.target.value)} className="form-control" id="" placeholder="Enter name of movie" />
                    </div>
                    <button type="submit" className="btn btn-block" style={{ height: "35px", backgroundColor: "#F5C419", color: "black", fontSize: "20px", marginBottom: "40px" }}>Search</button>
                </form>

                {show &&
                    <div><h1 style={{ fontSize: "40px" }}> | <span style={{ color: "#F5C419", padding: "5px" }}> All Shows  </span>  </h1></div>
                }
                {show &&

                    ShowData.filter((shows) => {
                        console.log(city)
                        return ((shows.cityName).toLowerCase().includes(cityItem.toLowerCase()) || (cityItem).toLowerCase().includes(shows.cityName)) && ((shows.showName).toLowerCase().includes(showNameItem.toLowerCase()) || (showNameItem).toLowerCase().includes(shows.showName))
                    }).map(function (showItem) {
                        return (

                            <div className="card col-sm-3" style={{ width: "18rem", height: "450px", backgroundColor: "#131312" }} >
                                <img className="card-img-top" width="150px" height="200px" src={showItem.showImg} alt="Card cap" />
                                <div className="card-body " style={{ backgroundColor: "#131312" }}>
                                    <h4 className="card-title">{showItem.showName}</h4>
                                    <p className="card-text">City : {showItem.cityName}</p>
                                    <p className="card-text text-muted"> {showItem.Date}</p>
                                    <Link to={`/shows/${showItem.showId}`} > <button className="btn " style={{ backgroundColor: "#F5C419", color: "black" }}>More Info</button> </Link>
                                </div>
                            </div>

                        )
                    })
                }





            </div>
        </div >
    )
}

export default Shows
