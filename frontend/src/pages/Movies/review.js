import React from 'react'
import { Users } from '../../data/users'
import { Link } from 'react-router-dom'


const Review = (props) => {
    const { userId, rating, review, lastUpdated, reviewId, movieId } = props.review
    const { userSigned, adminSigned } = props
    const user = Users.filter((user) => user.userId === userId)
    return (
        <div className="review " style={{ padding: " 5px 15px", margin: "20px 5px", border: "2px solid white", borderRadius: "10px", height: "fit-content", width: "1200px" }}>

            <h4>{user[0].userName}  <strong style={{ color: "#F5C419", float: "right", backgroundColor: "white" }}> {rating}/10.0 </strong></h4>
            <p style={{ fontFamily: "arial", fontWeight: "300" }}>{review}</p>
            <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white" }}>
                <div > <h6  >{lastUpdated}</h6> </div>
                {(adminSigned || userSigned) &&
                    <div>
                        <Link to={`/movies/${movieId}/editReview/${reviewId}`}><button className="btn  " style={{ width: "50px", height: "33px", marginRight: "10px", backgroundColor: "#131312", color: "#F5C419" }}>Edit</button> </Link>
                        <Link to={`/movies/${movieId}/deleteReview/${reviewId}`}><button className="btn " style={{ backgroundColor: "#F5C419", color: "#131312" }}>Delete</button> </Link>
                    </div>}
            </div>
        </div>

    )
}


export default Review;