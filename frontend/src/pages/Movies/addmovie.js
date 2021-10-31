import React from 'react'
import Navbar from '../layouts/navbar'


const AddMovie = () => {
    return (
        <>
            <Navbar active="movie" userSigned={true} adminSigned={true} />
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
                    <button type="text" className=" btn btn-primary btn-lg" > Submit  </button>
                </form>

            </div>
        </>
    )

}

export default AddMovie