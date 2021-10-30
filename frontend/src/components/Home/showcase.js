import React from 'react'
import { Link } from 'react-router-dom'
const Showcase = () => {
    return (
        <div className="showcase">
            <div class='showcase-item1'><p ><Link to="/movies" style={{ color: "white", textDecoration: "none" }}>MOVIES</Link></p></div>
            <div class='showcase-item2'><p><Link to="/shows" style={{ color: "white", textDecoration: "none" }}>SHOWS</Link></p></div>

        </div >

    )
}


export default Showcase