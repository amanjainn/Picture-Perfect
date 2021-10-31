import React, { useState } from 'react'
import Home from './pages/Home/home'
import Login from './pages/Home/login'
import Register from './pages/Home/register';
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

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const App = () => {
    const [userSigned, setUserSigned] = useState(false);
    const [adminSigned, setAdminSigned] = useState(false);
    return (
        <>
            <Router>
                <Switch>
                    {/* Admin and signed users */}
                    <ProtectedRoutes exact path="/movies/addMovie" component={AddMovie} auth={adminSigned} />
                    <ProtectedRoutes exact path="/movies/:id/addReview" component={AddReview} auth={adminSigned || userSigned} />
                    <ProtectedRoutes exact path="/movies/:id/editMovie" component={EditMovie} auth={adminSigned} />
                    <ProtectedRoutes exact path="/movies/:id/deleteMovie" component={DeleteMovie} auth={adminSigned} />
                    <ProtectedRoutes exact path="/shows/addShow" component={AddShow} auth={adminSigned} />
                    <ProtectedRoutes exact path="/shows/:id/editShow" component={EditShow} auth={adminSigned} />
                    <ProtectedRoutes exact path="/shows/:id/deleteShow" component={DeleteShow} auth={adminSigned} />

                    {/* Any user */}
                    <Route path="/login"> <Login />  </Route>
                    <Route path="/register"> <Register />  </Route>
                    <Route exact path="/movies/:id" children={<Movie userSigned={userSigned} adminSigned={adminSigned} />}></Route>
                    <Route exact path="/movies"> <Movies userSigned={userSigned} adminSigned={adminSigned} /></Route>
                    <Route exact path="/shows/:id" children={<Show userSigned={userSigned} adminSigned={adminSigned} />}></Route>
                    <Route exact path="/shows"> <Shows userSigned={userSigned} adminSigned={adminSigned} /></Route>
                    <Route exact path="/">   <Home userSigned={userSigned} adminSigned={adminSigned} /> </Route>

                </Switch>
            </Router>
        </>
    )
}

export default App;
