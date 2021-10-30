import React from 'react'
import Navbar from '../layouts/navbar'


const Addreview = () => {
    return (
        <>

            <Navbar active="movie" />
            <div className="container">
                <h1>Add a review </h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <input type="text" className="form-control" placeholder="Enter values between 0 to 10 inclusive" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Review</label>
                        <input type="text" className="form-control" placeholder="Write few words about the movie" />
                    </div>
                    <button type="text" className=" btn btn-primary btn-lg" > Submit  </button>
                </form>

            </div>
        </>
    )

}

export default Addreview