import React from "react"
import Navbar from "../layouts/navbar"
import { Link } from "react-router-dom"


const Show = ({ userSigned, adminSigned, user, isUserSignedIn }) => {


    return (
        <div>
            <Navbar
                userSigned={userSigned}
                adminSigned={adminSigned}
                user={user}
                isUserSignedIn={isUserSignedIn}
            />
            <div className="container">
                <div>
                    <span style={{ color: "#F5C419", fontSize: "170px", display: "block" }} >404 </span>
                    <span style={{ color: "white", fontSize: "60px", display: "block" }} >There's nothing here </span>
                    <Link to="/"> <button className="btn btn-lg mt-3" style={{ textDecoration: "none", backgroundColor: "#F5C419", color: "black" }}>  Take me back to home </button></Link>

                </div>
            </div>
        </div>
    )
}

export default Show
