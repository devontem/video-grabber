
import React from 'react';
import { ReactDOM } from 'react-dom';
// import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './../reducers/index'
// import App from './components/App';
// import downloadReducer from './reducers';

// let store = createStore(downloadReducer);

// ReactDOM(
// 	<Provider store={ store } >
// 		<App />
// 	</Provider>,
// 	document.getElementById('root')
// )

const middleware = applyMiddleware(promise(), thunk, logger())

const store = createStore(reducers, middleware)


// anatomy of middleware function
// function middleware(store) => (next) => (action){
// 	
// 	action.type = 'REMOVE_SOMETHING' // modify action
// 	next(action) // calls next middleware
// }

// store.subscribe(()=>{
// 	console.log('State is now.. ', store.getState());
// });

export default store




