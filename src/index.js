import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Provider } from 'react-redux'
import store from "./schema-registry/logic/store";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
