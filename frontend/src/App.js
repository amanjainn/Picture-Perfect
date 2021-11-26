import React, { useState, useEffect } from 'react'
import './css/App.css'
import Home from './pages/Home/home'
import Login from './pages/Authentication/login'
import Register from './pages/Authentication/register';
import Movies from './pages/Movies/movies'
import Shows from './pages/Shows/shows'
import Movie from './pages/Movies/movie'
import AddReview from './pages/Movies/addreview'
import AddMovie from './pages/Movies/addmovie'
import Show from './pages/Shows/show'
import AddShow from './pages/Shows/addShow';
import EditShow from './pages/Shows/editShow'
import DeleteShow from './pages/Shows/deleteShow'
import EditMovie from './pages/Movies/editMovie'
import DeleteMovie from './pages/Movies/deleteMovie'
import ProtectedRoutes from './routes/ProtectedRoutes'
import EditReview from './pages/Movies/editReview'
import DeleteReview from './pages/Movies/deleteReview'
import ForgotPassword from './pages/Authentication/forgotpassword'
import ForgotPasswordVerification from './pages/Authentication/forgotpasswordverification'
import { Auth } from 'aws-amplify'


import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

const App = () => {
    const [userSigned, setUserSigned] = useState(false);
    const [adminSigned, setAdminSigned] = useState(false);


    const [auth, setAuth] = useState(true)
    const [user, setUser] = useState({})


    const isUserSignedIn = (user, admin, info) => {
        setUserSigned(user)
        setAdminSigned(admin);
        setUser(info);
        console.log(user, admin, info)

    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Auth.currentSession();

                const user = await Auth.currentAuthenticatedUser();
                const domain = (user.attributes.email).split('@')[1]  // Admins : clumio.com , bmsce.ac.in , Users : gmail.com, etc etc

                if ((String(domain) === "clumio.com") || (String(domain) === "bmsce.ac.in")) {
                    isUserSignedIn(false, true, { username: user.username, email: user.attributes.email });
                } else {

                    isUserSignedIn(true, false, { username: user.username, email: user.attributes.email });
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
        setAuth(false);
    }, [])

    return (
        !auth &&
        <>

            <Router>
                <Switch>
                    {/* Admin and signed users */}
                    <ProtectedRoutes exact path="/movies/addMovie" component={AddMovie} auth={adminSigned} user={user} isUserSignedIn={isUserSignedIn} />
                    <ProtectedRoutes exact path="/movies/:id/addReview" component={AddReview} auth={adminSigned || userSigned} user={user} isUserSignedIn={isUserSignedIn} />
                    <ProtectedRoutes exact path="/movies/:id/editReview/:id" component={EditReview} auth={adminSigned || userSigned} user={user} isUserSignedIn={isUserSignedIn} />
                    <ProtectedRoutes exact path="/movies/:id/deleteReview/:id" component={DeleteReview} auth={adminSigned || userSigned} user={user} isUserSignedIn={isUserSignedIn} />
                    <ProtectedRoutes exact path="/movies/:id/editMovie" component={EditMovie} auth={adminSigned} user={user} isUserSignedIn={isUserSignedIn} />
                    <ProtectedRoutes exact path="/movies/:id/deleteMovie" component={DeleteMovie} auth={adminSigned} user={user} isUserSignedIn={isUserSignedIn} />
                    <ProtectedRoutes exact path="/shows/addShow" component={AddShow} auth={adminSigned} user={user} isUserSignedIn={isUserSignedIn} />
                    <ProtectedRoutes exact path="/shows/:id/editShow" component={EditShow} auth={adminSigned} user={user} isUserSignedIn={isUserSignedIn} />
                    <ProtectedRoutes exact path="/shows/:id/deleteShow" component={DeleteShow} auth={adminSigned} user={user} isUserSignedIn={isUserSignedIn} />

                    {/* unsigned users */}
                    <ProtectedRoutes exact path="/login" component={Login} auth={!(adminSigned || userSigned)} user={user} isUserSignedIn={isUserSignedIn} />
                    <ProtectedRoutes exact path="/register" component={Register} auth={!(adminSigned || userSigned)} user={user} isUserSignedIn={isUserSignedIn} />
                    <ProtectedRoutes exact path="/forgotPassword" component={ForgotPassword} auth={!(adminSigned || userSigned)} user={user} isUserSignedIn={isUserSignedIn} />
                    <ProtectedRoutes exact path="/forgotPasswordVerification" component={ForgotPasswordVerification} auth={!(adminSigned || userSigned)} user={user} isUserSignedIn={isUserSignedIn} />

                    {/* Any user */}
                    <Route exact path="/movies/:id" children={<Movie userSigned={userSigned} adminSigned={adminSigned} user={user} isUserSignedIn={isUserSignedIn} />}></Route>
                    <Route exact path="/movies"> <Movies userSigned={userSigned} adminSigned={adminSigned} user={user} isUserSignedIn={isUserSignedIn} /></Route>
                    <Route exact path="/shows/:id" children={<Show userSigned={userSigned} adminSigned={adminSigned} user={user} isUserSignedIn={isUserSignedIn} />}></Route>
                    <Route exact path="/shows"> <Shows userSigned={userSigned} adminSigned={adminSigned} user={user} isUserSignedIn={isUserSignedIn} /></Route>
                    <Route exact path="/">   <Home userSigned={userSigned} adminSigned={adminSigned} user={user} isUserSignedIn={isUserSignedIn} /> </Route>

                </Switch>
            </Router>
        </>

    )
}

export default App;
