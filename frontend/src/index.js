import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Amplify from 'aws-amplify'
import config from './config.json'

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
})

ReactDOM.render(<App />, document.querySelector('#root'))