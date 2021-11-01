import React from 'react'
import { Data } from '../../data/movies'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../layouts/navbar'


const Movies = ({ userSigned, adminSigned, user, isUserSignedIn }) => {
    const [item, setItem] = useState('');
    return (
        <>
            <Navbar active="movie" userSigned={userSigned} adminSigned={adminSigned} user={user} isUserSignedIn={isUserSignedIn} />
            <div class="form-group" style={{ display: "flex", justifyContent: "center", marginTop: "30px" }} >
                <input style={{ width: "850px", height: "60px", fontSize: "20px", marginBottom: "20px" }} className="form-control" type="search" placeholder="Search Movies" value={item} onChange={(e) => setItem(e.target.value)} />
            </div>
            <div style={{ marginLeft: "40px" }} >
                <div>
                    {Data.filter((data) => {
                        return (
                            (data.movieName).toLowerCase().includes(item.toLowerCase()) || (item).toLowerCase().includes(data.movieName.toLowerCase())
                        )
                    }).map(function (data) {
                        return (
                            <Link to={`/movies/${data.movieId}`}> <img width="210px " style={{ display: "inline", margin: "10px" }} height="310px" src={data.movieImage} alt={data.movieName}></img> </Link>
                        )
                    })
                    }
                </div>

            </div>

        </>
    )
}

export default Movies