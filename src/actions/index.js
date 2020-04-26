export const todoListsRequested = () => {
    return {
        type: 'FETCH_TODO_LISTS_REQUEST'
    }
};

export const todoListsLoaded = (todoLists) => {
    return {
        type: 'FETCH_TODO_LISTS_SUCCESS',
        payload: todoLists
    };
};

export const todoListsError = (error) => {
    return {
        type: 'FETCH_TODO_LISTS_FAILURE',
        payload: error
    };
};

export const onUpdateList = (action, ...args) => {
    return {
        type: 'UPDATE_LIST',
        action: action,
        id: args[0],
        title: args[1]
    };
};

export const onUpdateTodo = (action, ...args) => {
    return {
        type: 'UPDATE_TODO',
        action: action,
        id: args[0],
        text: args[1],
        important: args[2],
        done: args[3],
        date: args[4]
    };
};

export const setCurrentTodoList = (id) => {
    return {
        type: 'SET_CURRENT_TODO_LIST',
        payload: id
    };
};
export const openModalTodo = (id) => {
    return {
        type: 'OPEN_MODAL_TODO',
        payload: id
    };
};
export const closeModalTodo = (id) => {
    return {
        type: 'CLOSE_MODAL_TODO',
        payload: id
    };
};
export const dialogTodoToggle = (id) => {
    return {
        type: 'DIALOG_TODO_TOGGLE',
        payload: id
    };
};

export const dialogListToggle = (id) => {
    return {
        type: 'DIALOG_LIST_TOGGLE',
        payload: id
    };
};

export const openModalList = (id) => {
    return {
        type: 'OPEN_MODAL_LIST',
        payload: id
    };
};
export const closeModalList = (id) => {
    return {
        type: 'CLOSE_MODAL_LIST',
        payload: id
    };
};
export const showAlert = (status, message) => {

    return {
        type: 'SHOW_ALERT',
        status: status,
        message: message
    }
};
export const closeAlert = () => {
    return {
        type: 'CLOSE_ALERT'
    }
};

export const onFilterChanged = (filterValue) => {
    return {
        type: 'ON_FILTER_CHANGE',
        payload: filterValue
    }
};



export const getDate = (timeInMs) => {
    const date = new Date(timeInMs);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = (month < 10) ? '0' + month : month;
    let day = date.getDate();
    day = (day < 10) ? '0' + day : day;
    let hours = date.getHours();
    hours = (hours < 10) ? '0' + hours : hours;
    let minute = date.getMinutes();
    minute = (minute < 10) ? '0' + minute : minute;
    return `${day}.${month}.${year} ${hours}:${minute}`
};

export const getId = (arr) => {
    let newId;
    newId = Math.floor(Math.random()*100);
    const search = arr.some((item) => item.id === newId);
    if (arr.length >= 95) {
        return 0;
    }
    if (search) {
        return getId(arr);
    } else {
        return newId;
    }
};

export const filter = (items, filter) => {
    switch (filter) {
        case 'all':
            return items;
        case 'active':
            return items.filter((list) => list.todos.some((todo) => todo.done === false));
        case 'done':
            return items.filter((list) => list.todos.every((todo) => todo.done === true));
        default:
            return items;
    }
};

export const setLocalStorageData = (todoLists) => {
    const JSONData = JSON.stringify([...todoLists]);
    localStorage.setItem('data-todo-26042020', JSONData);
};
export const clearLocalStorageData = () => {
    localStorage.removeItem('data-todo-26042020')
};
