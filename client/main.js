import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from './components/App'
import Layout from './components/Layout'
import store from './containers/store'
import DownloadPage from './components/DownloadPage'
import ProfilePage from './components/ProfilePage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import requireAuthentication from './components/requireAuthentication'
import { Route, IndexRoute, Router, hashHistory } from 'react-router'


const app = document.getElementById('root')

ReactDOM.render(
<Provider store={store}>
	<Router history={hashHistory}>
		<Route path='/' component={Layout}> 
			<IndexRoute component={App} />

			<Route path='download/id/:id' component={DownloadPage}/>

			<Route path='profile' component={requireAuthentication(ProfilePage)}/>

			<Route path='login' component={LoginPage}/>

			<Route path='signup' component={SignupPage}/>
		</Route>
	  </Router>
</Provider>, app);
