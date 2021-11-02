import React from 'react'
import Navbar from '../layouts/navbar'


const Addreview = ({ user, isUserSignedIn }) => {
    return (
        <>

            <Navbar active="movie" userSigned={true} adminSigned={true} user={user} isUserSignedIn={isUserSignedIn} />
            <div className="container">
                <h1>Add a review </h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <input type="number" className="form-control" placeholder="Enter values between 0 to 10 inclusive" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Review</label>
                        <input type="text" className="form-control" placeholder="Write few words about the movie" />
                    </div>
                    <button type="text" className=" btn  btn-block" style={{ backgroundColor: "#F5C419", color: "#131312" }} > Submit  </button>
                </form>

            </div>
        </>
    )

}

export default Addreview