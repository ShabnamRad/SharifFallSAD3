import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter'
import {Provider} from 'react-redux';
import configureStore from './store/configureStore'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));