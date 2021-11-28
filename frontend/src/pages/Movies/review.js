import React from 'react'
import { Link } from 'react-router-dom'


const Review = (props) => {
    const { userName, rating, review, lastUpdated, reviewId, movieId } = props.review
    const { userSigned, adminSigned } = props
    return (
        <div className="review " style={{ padding: " 1px 15px", margin: "15px 5px", border: "2px solid white", borderRadius: "8px", height: "fit-content", width: "500px" }}>

            <img width="50px" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="icon" />
            <h4 style={{ display: "inline", margin: "2px 10px" }} >{userName} </h4>

            <h3 style={{
                display: "inline", marginTop: "25px", color: "#F5C419"
                , float: "right", backgroundColor: "white"
            }}>  {rating} </h3>

            <h4 style={{ fontFamily: "arial", fontWeight: "300", marginTop: "-10px" }}>{review}</h4>
            <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", marginTop: "-10px" }}>
                <div > <h6  >Last updated  :  <span className="text-muted" style={{ backgroundColor: "white" }}> {lastUpdated} </span></h6> </div>
                {(adminSigned) &&
                    <div>
                        <Link to={`/movies/${movieId}/editReview/${reviewId}`}><button className="btn  " style={{ width: "50px", height: "33px", marginRight: "10px", backgroundColor: "#131312", color: "#F5C419" }}>Edit</button> </Link>
                        <Link to={`/movies/${movieId}/deleteReview/${reviewId}`}><button className="btn " style={{ backgroundColor: "#F5C419", color: "#131312" }}>Delete</button> </Link>
                    </div>}
                {(!adminSigned && userSigned && props.username === userName) &&
                    <div>
                        <Link to={`/movies/${movieId}/editReview/${reviewId}`}><button className="btn  " style={{ width: "50px", height: "33px", marginRight: "10px", backgroundColor: "#131312", color: "#F5C419" }}>Edit</button> </Link>
                        <Link to={`/movies/${movieId}/deleteReview/${reviewId}`}><button className="btn " style={{ backgroundColor: "#F5C419", color: "#131312" }}>Delete</button> </Link>
                    </div>
                }
            </div>
        </div>
    )
}


export default Review;