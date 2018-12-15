import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import { login, logout } from './actions/auth'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import { firebase } from './firebase/firebase'
import LoadingPage from './components/LoadingPage'

const store = configureStore()

const jsx = (
    <Provider store={store}>
        <AppRouter /> 
    </Provider>
)

// makes sure app is only rendered a single time when not rendered.
let hasRendered = false
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'))
        hasRendered = true
    }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'))

/**
 When user first visit webpage it automatically trigger if we are logged in or logged out
 Makes sure Redux store it up to date
 */

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid))
        // console.log('uid', user.uid)// what stored user id in firebase || we can use this value to send it to redux
        renderApp()
        if (history.location.pathname === '/') {
            history.push('/dashboard')
        }
    } else {
        store.dispatch(logout())
        renderApp()
        history.push('/')
    }
})