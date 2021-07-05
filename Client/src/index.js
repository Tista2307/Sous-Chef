import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';//applyMiddleware helps dispatch asyunc func
import thunk from 'redux-thunk';
import './index.css'
import  reducers  from './reducers';
const store = createStore(reducers, compose(applyMiddleware(thunk)));//create our redux store(has the backend data)
ReactDOM.render(<Provider store={store}><App /></Provider>,document.getElementById('root'));
//Provider makes store globally available