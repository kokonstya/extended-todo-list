import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import App from './components/App/App';
import store from "./store";

import TodoService from "./services/todo-service";
import {TodoServiceProvider} from "./components/todoServiceContext/todoServiceContext";

const todoService = new TodoService();

ReactDOM.render(
    <Provider store={store}>
        <TodoServiceProvider value={todoService}>
            <App/>
        </TodoServiceProvider>
    </Provider>,
    document.getElementById('root')
);
