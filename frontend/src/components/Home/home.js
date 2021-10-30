import React from 'react'
import Showcase from './showcase'
import '../../css/home.css'
import Login from './login'
import Register from './register'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div className="container1">
                <h1 style={{ textAlign: 'center', fontSize: "70px" }}>PICTURE PERFECT</h1>
                <div className="btns">
                    <Link to='/register'>  <button className="btn1"> Register</button> </Link>
                    <Link to='/login'>  <button className="btn1"> Login</button> </Link>

                </div>
                <Showcase />
            </div>

        </>
    )
}
export default Home