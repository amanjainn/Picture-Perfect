import React from 'react'
import Showcase from './showcase'
import '../../css/home.css'
import Navbar from '../layouts/navbar'

const Home = ({ userSigned, adminSigned, user, isUserSignedIn }) => {

    return (
        <>
            <div className="container1">
                <Navbar active="home" userSigned={userSigned} adminSigned={adminSigned} user={user} isUserSignedIn={isUserSignedIn} />
                <Showcase />
            </div>

        </>
    )
}
export default Home