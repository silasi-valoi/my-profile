
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router}  from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'css/index.css';
import "css/App.css";
import "css/home.css";

import * as serviceWorker from './utils/serviceWorker';
import App, {history} from './App';


const _App =()=> (
	    <Router history={history}>
            <App/>
        </Router>
) 


ReactDOM.render(<_App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.register();



