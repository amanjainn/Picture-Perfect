import React from 'react'
import Navbar from '../layouts/navbar'
import { Link, useParams } from 'react-router-dom'


const EditShow = ({ user, isUserSignedIn }) => {

    const { id } = useParams();
    return (
        <>
            <Navbar active="movie" userSigned={true} adminSigned={true} user={user} isUserSignedIn={isUserSignedIn} />
            <div className="container">
                <h1>Edit a Show </h1>

                <form>
                    <div className="form-group">
                        <label htmlFor="rating">Show Name</label>
                        <input type="text" className="form-control" placeholder="Enter show's name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Theatre Name</label>
                        <input type="text" className="form-control" placeholder="Enter theatre's name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Theatre Location</label>
                        <input type="text" className="form-control" placeholder="Enter theatre's location" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">City</label>
                        <input type="text" className="form-control" placeholder="Enter city" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Time</label>
                        <input type="text" className="form-control" placeholder="Enter Show's time" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Date</label>
                        <input type="text" className="form-control" placeholder="Enter Show's data" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Show Thumbnail</label>
                        <input type="text" className="form-control" placeholder="Enter the url of show's thumbnail" />
                    </div>
                    <button type="text" className=" btn btn-primary btn-lg" > Update  </button>
                </form>


            </div>
        </>
    )
}

export default EditShow