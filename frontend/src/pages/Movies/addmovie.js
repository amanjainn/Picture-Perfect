import React from 'react'
import Navbar from '../layouts/navbar'


const AddMovie = ({ user, isUserSignedIn }) => {

    return (
        <>
            <Navbar active="movie" userSigned={true} adminSigned={true} user={user} isUserSignedIn={isUserSignedIn} />
            <div className="container">
                <h1>Add a Movie </h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="rating">Movie Name</label>
                        <input type="text" className="form-control" placeholder="Enter movie's name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Movie Desc</label>
                        <input type="text" className="form-control" placeholder="Enter movie's description" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Language</label>
                        <input type="text" className="form-control" placeholder="Enter movie's language" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Duration</label>
                        <input type="text" className="form-control" placeholder="Enter movie's duration" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Released on</label>
                        <input type="text" className="form-control" placeholder="Movie released on" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Movie Thumbnail</label>
                        <input type="text" className="form-control" placeholder="Enter the url of movie's thumbnail" />
                    </div>
                    <button type="text" className=" btn  btn-block" style={{ backgroundColor: "#F5C419", color: "black", height: "40px", marginTop: "20px" }} > Submit  </button>
                </form>

            </div>
        </>
    )

}

export default AddMovie