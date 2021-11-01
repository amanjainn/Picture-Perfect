import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/movies.css'
import Navbar from '../layouts/navbar'
import { useState } from 'react'
import { ShowData } from '../../data/shows'
import Show from './show'


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
                <h1>Search shows </h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group" >
                        <input required type="text" value={city} onChange={(e) => setCity(e.target.value)} className="form-control" name="" id="" placeholder="Enter name of city" />
                    </div>
                    <div className="form-group">
                        <input type="text" name="" value={showName} onChange={(e) => setShowName(e.target.value)} className="form-control" id="" placeholder="Enter name of movie" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg">Search</button>
                </form>

                {show &&
                    <div><h1 style={{ fontSize: "40px" }}> <span style={{ color: "#F5C518", padding: "5px" }}> |  </span> All Shows </h1></div>
                }
                {show &&

                    ShowData.filter((shows) => {
                        console.log(city)
                        return ((shows.cityName).toLowerCase().includes(cityItem.toLowerCase()) || (cityItem).toLowerCase().includes(shows.cityName)) && ((shows.showName).toLowerCase().includes(showNameItem.toLowerCase()) || (showNameItem).toLowerCase().includes(shows.showName))
                    }).map(function (showItem) {
                        return (

                            <div className="card col-sm-2" style={{ width: "18rem", height: "450px" }}>
                                <img className="card-img-top" width="170px" height="250px" src={showItem.showImg} alt="Card cap" />
                                <div className="card-body">
                                    <h4 className="card-title">{showItem.showName}</h4>
                                    <p className="card-text">City : {showItem.cityName}</p>
                                    <p className="card-text text-muted"> {showItem.Date}</p>
                                    <Link to={`/shows/${showItem.showId}`} > <button className="btn btn-primary">More Info</button> </Link>
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


// return ((shows.cityName).toLowerCase().includes(city.toLowerCase()));