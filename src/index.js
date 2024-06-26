import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './app';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

reportWebVitals();