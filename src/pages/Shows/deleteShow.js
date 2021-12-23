import React, { useState } from "react"
import Navbar from "../layouts/navbar"
import { Link, useParams, useHistory } from "react-router-dom"
import axios from "axios"
const baseURL = "https://j99npls842.execute-api.us-east-2.amazonaws.com/dev"

const DeleteShow = ({ user, isUserSignedIn }) => {
    const history = useHistory()
    const { id } = useParams()
    const [deleted, setDeleted] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.delete(baseURL + "/shows", { params: { showId: id } }).then((response) => {
            if (Object.keys(response.data).length === 0 && Object.getPrototypeOf(response.data) === Object.prototype) {
                history.push("/error")
            }
            setDeleted(true)
            setTimeout(() => {
                history.push("/shows")
                window.location.reload()
            }, 1000)
        })
    }
    return (
        <>
            <Navbar
                active="show"
                userSigned={true}
                adminSigned={true}
                user={user}
                isUserSignedIn={isUserSignedIn}
            />
            <div className="container">
                {!deleted && (
                    <>
                        <h1> Are you sure you want to delete this show ?</h1>
                        <button
                            onClick={handleSubmit}
                            className="btn btn-lg"
                            style={{
                                marginRight: "30px",
                                backgroundColor: "#131312",
                                color: "#F5C419",
                            }}
                        >
                            Yes
                        </button>
                        <Link to={`/shows/${id}`}>
                            <button
                                className="btn  btn-lg"
                                style={{ backgroundColor: "#F5C419", color: "#131312" }}
                            >
                                No
                            </button>
                        </Link>
                    </>
                )}
                {deleted && <h1>Successfully deleted</h1>}
            </div>
        </>
    )
}

export default DeleteShow
