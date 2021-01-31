import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./component/navTabs";
import React from "react";
import {
    BrowserRouter
} from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Main/>
            </div>
        </BrowserRouter>

    );
}

export default App;
