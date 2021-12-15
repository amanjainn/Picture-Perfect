import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../layouts/navbar";

const Home = ({ userSigned, adminSigned, user, isUserSignedIn }) => {
    return (
        <>
            <Navbar
                active="home"
                userSigned={userSigned}
                adminSigned={adminSigned}
                user={user}
                isUserSignedIn={isUserSignedIn}
            />
            <div className="container">
                <div>
                    <h1
                        style={{
                            fontSize: "65px",
                            marginBottom: "30px",
                            marginTop: "55px",
                        }}
                    >
                        Your home to movies, shows....
                    </h1>
                </div>
                <Link to="/movies" style={{ textDecoration: "none" }}>
                    <button
                        className="btn"
                        style={{
                            width: "45%",
                            height: "60px",
                            backgroundColor: "#131312",
                            color: "#F5C419",
                            marginRight: "20px",
                            marginTop: "120px",
                        }}
                    >
                        Movies
                    </button>
                </Link>
                <Link to="/shows" style={{ textDecoration: "none" }}>
                    <button
                        className="btn"
                        style={{
                            width: "45%",
                            height: "60px",
                            backgroundColor: "#F5C419",
                            color: "#131312",
                            marginTop: "120px",
                        }}
                    >
                        Shows
                    </button>
                </Link>
            </div>
        </>
    );
};
export default Home;
