
import React from 'react';
import { ReactDOM } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './../reducers/index'
let middleware;

// remove logger on production
if (process.env.NPM_CONFIG_PRODUCTION){
	middleware = applyMiddleware(promise(), thunk, logger())
} else {
	middleware = applyMiddleware(promise(), thunk)
}

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




