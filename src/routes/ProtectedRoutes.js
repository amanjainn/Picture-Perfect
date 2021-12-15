import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoutes = ({ auth, component: Component, user, isUserSignedIn, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            if (auth) return <Component {...props} user={user} isUserSignedIn={isUserSignedIn} />
            else return <Redirect to="/" />
        }} />

    )
}
export default ProtectedRoutes