import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import { BrowserRouter } from "react-router-dom";

const basename = '/<web-tech-project>';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter basename={basename}>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
