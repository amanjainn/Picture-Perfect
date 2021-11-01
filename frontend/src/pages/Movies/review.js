import React from 'react'
import { Users } from '../../data/users'
import { Link } from 'react-router-dom'


const Review = (props) => {
    const { userId, rating, review, lastUpdated, reviewId } = props.review
    const { userSigned, adminSigned } = props
    const user = Users.filter((user) => user.userId === userId)
    return (
        <div style={{ padding: " 5px 15px", margin: "20px 5px", boxShadow: "0.1px 0.1px 0.9px 0.1px #333" }}>

            <h4>{user[0].userName}  <strong style={{ color: "#F5C518", float: "right" }}> {rating}/10.0 </strong></h4>
            <p style={{ fontFamily: "arial", fontWeight: "300" }}>{review}</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div> <h6 className="text-muted">{lastUpdated}</h6> </div>
                {(adminSigned || userSigned) &&
                    <div>
                        <Link to={`/movies/${reviewId}/editReview`}><button className="btn btn-success " style={{ width: "50px", height: "33px", marginRight: "10px" }}>Edit</button> </Link>
                        <Link to={`/movies/${reviewId}/deleteReview`}><button className="btn btn-danger">Delete</button> </Link>
                    </div>}
            </div>
        </div>

    )
}


export default Review;