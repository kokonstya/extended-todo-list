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
                <div className="col-5 todo-lists-wrapper">
                    <TodoLists/>
                </div>
                <div className="col-7 todos-wrapper">
                    <Todos/>
                </div>
            </div>

        </div>
    )
};

export default App;
