import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from './components/App'
import Layout from './components/Layout'
import store from './containers/store'
import DownloadPage from './components/DownloadPage'
import { Route, IndexRoute, Router, hashHistory } from 'react-router'


class test extends React.Component {
	render(){
		return (
			<h1>Test</h1>
		)
	}
}

const app = document.getElementById('root')

ReactDOM.render(
<Provider store={store}>
	<Router history={hashHistory}>
		<Route path='/' component={ Layout }> 
			<IndexRoute component={ App } />
			<Route path='test' component={ test } />

			<Route path='download/id/:id' component={DownloadPage}/>
		</Route>
	  	<App />
	  </Router>
</Provider>, app);
