import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'

import Gallery from './Gallery'

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import reducer from './reducer'

import { watchForLoadImages } from './saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(watchForLoadImages)

ReactDOM.render(
    <Provider store={store}>
        <Gallery />
    </Provider>,
    document.getElementById('root')
);