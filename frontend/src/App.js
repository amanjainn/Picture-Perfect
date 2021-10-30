import React from 'react'
import Home from './components/Home/home'
import Login from './components/Home/login'
import Register from './components/Home/register';
import Movies from './components/Movies/movies'
import Shows from './components/Shows/shows'
import Movie from './components/Movies/movie'
import AddReview from './components/Movies/addreview'
import AddMovie from './components/Movies/addmovie'
import Show from './components/Shows/show'
import AddShow from './components/Shows/addShow';
import EditShow from './components/Shows/editShow'
import DeleteShow from './components/Shows/deleteShow'
import EditMovie from './components/Movies/editMovie'
import DeleteMovie from './components/Movies/deleteMovie'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const App = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/movies/addMovie" children={<AddMovie />}></Route>
                    <Route path="/movies/:id/addReview" children={<AddReview />}></Route>
                    <Route path="/movies/:id/editMovie" children={<EditMovie />}></Route>
                    <Route path="/movies/:id/deleteMovie" children={<DeleteMovie />}></Route>
                    <Route path="/movies/:id" children={<Movie />}></Route>
                    <Route path="/movies">
                        <Movies />
                    </Route>
                    <Route path="/shows/addShow" children={<AddShow />}></Route>
                    <Route path="/shows/:id/editShow" children={<EditShow />}></Route>
                    <Route path="/shows/:id/deleteShow" children={<DeleteShow />}></Route>
                    <Route path="/shows/:id" children={<Show />}></Route>
                    <Route path="/shows">
                        <Shows />
                    </Route>

                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

export default App;