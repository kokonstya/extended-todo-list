import React from "react";

import AppHeader from "../AppHeader/AppHeader";
import TodoLists from "../TodoLists/TodoLists";
import Todos from "../Todos/Todos";
import "./App.scss"

const App = () => {

    return (
        <div className={'container-xl'}>
            <AppHeader/>
            <div className="row">
                <div className="col-md-5 col-sm-12 todo-lists-wrapper">
                    <TodoLists/>
                </div>
                <div className="col-md-7 col-sm-12 todos-wrapper">
                    <Todos/>
                </div>
            </div>

        </div>
    )
};

export default App;
