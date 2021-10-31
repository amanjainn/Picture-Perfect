import React from 'react'
import { Users } from '../../data/users'



const Review = (props) => {
    const { userId, rating, review, lastUpdated } = props.review
    const user = Users.filter((user) => user.userId === userId)
    return (
        <div style={{ padding: " 5px 15px", margin: "20px 5px", boxShadow: "0.1px 0.1px 0.9px 0.1px #333" }}>

            <h4>{user[0].userName}  <strong style={{ color: "#F5C518", float: "right" }}> {rating}/10.0 </strong></h4>
            <p style={{ fontFamily: "arial", fontWeight: "300" }}>{review}</p>
            <h6 className="text-muted">{lastUpdated}</h6>
        </div>

    )
}


export default Review;