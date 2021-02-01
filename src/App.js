import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./component/navTabs";
import React from "react";
import {
    HashRouter
} from "react-router-dom";


function App() {
    return (
        <HashRouter>
            <div className="App">
                <Main/>
            </div>
        </HashRouter>

    );
}

export default App;
