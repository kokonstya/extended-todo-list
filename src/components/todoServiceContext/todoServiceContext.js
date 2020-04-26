import React from 'react';

const {
    Provider: TodoServiceProvider,
    Consumer: TodoServiceConsumer
} = React.createContext();

export {
    TodoServiceProvider,
    TodoServiceConsumer
};
