const initialState = {
    todoLists: [],
    error: null,
    loading: true,
    sortBy: 'date',
    filterValue: 'active',
    currentTodoList: null,
    isListModalOpened: false,
    isTodoModalOpened: false,
    isListDialogOpened: false,
    isTodoDialogOpened: false,
    onUpdateTodoId: null,
    onUpdateListId: null,
    onUpdateTodoItem: {},
    onUpdateListItem: {},
    isAlertShow: {}
};

const reducer = (state = initialState, action) => {
    console.log(action.type);

    switch (action.type) {
        case 'FETCH_TODO_LISTS_REQUEST':
            return {
                ...state,
                todoLists: [],
                loading: true,
                error: null
            };

        case 'FETCH_TODO_LISTS_SUCCESS':
            return {
                ...state,
                todoLists: action.payload,
                loading: false,
                error: null
            };

        case 'FETCH_TODO_LISTS_FAILURE':
            return {
                ...state,
                todoLists: [],
                loading: false,
                error: action.payload
            };

        case 'SET_CURRENT_TODO_LIST':
            return {
                ...state,
                currentTodoList: action.payload
            };
        case 'ON_FILTER_CHANGE':
            return {
                ...state,
                filterValue: action.payload
            };
        case 'DIALOG_LIST_TOGGLE':
            return {
                ...state,
                isListDialogOpened: !state.isListDialogOpened,
                onUpdateListId: action.payload
            };

        case 'OPEN_MODAL_LIST':
            const List = state.todoLists.find((item) => item.id === action.payload);
            return {
                ...state,
                isListModalOpened: true,
                onUpdateListId: action.payload,
                onUpdateListItem: List
            };
        case 'CLOSE_MODAL_LIST':
            return {
                ...state,
                isListModalOpened: false,
                onUpdateListId: null,
                onUpdateListItem: {}
            };
        case 'DIALOG_TODO_TOGGLE':
            return {
                ...state,
                isTodoDialogOpened: !state.isTodoDialogOpened,
                onUpdateTodoId: action.payload
            };

        case 'OPEN_MODAL_TODO':
            const currentListModal = state.todoLists.find((item) => item.id === state.currentTodoList);
            const todoModal = currentListModal.todos.find((item) => item.id === action.payload);
            return {
                ...state,
                onUpdateTodoId: action.payload,
                isTodoModalOpened: true,
                onUpdateTodoItem: todoModal
            };
        case 'CLOSE_MODAL_TODO':
            return {
                ...state,
                onUpdateTodoItem: {},
                isTodoModalOpened: false
            };

        case 'UPDATE_LIST':
            let lists;
            switch (action.action) {
                case 'add':
                    lists = [...state.todoLists, {id: action.id, title: action.title, todos: []}];
                    break;
                case 'update':
                    const newList = state.todoLists.find((item) => item.id === action.id);
                    const id = state.todoLists.findIndex((item) => item.id === action.id);

                    newList.title = action.title;
                    lists = [
                        ...state.todoLists.slice(0, id),
                        newList,
                        ...state.todoLists.slice(id + 1)
                    ];
                    break;
                case 'delete':
                    const listId = state.todoLists.findIndex((item) => item.id === action.id);
                    lists = [
                        ...state.todoLists.slice(0, listId),
                        ...state.todoLists.slice(listId + 1)
                    ];
                    break;
                default :
            }
            return {
                ...state,
                currentTodoList: action.action !== 'delete' ? action.id : null,
                isListDialogOpened: false,
                isListModalOpened: false,
                onUpdateListItem: {},
                todoLists: lists,
            };
        case 'UPDATE_TODO':
            const {todoLists, currentTodoList} = state;
            const currentList = todoLists.find((item) => item.id === currentTodoList);
            const todo = currentList.todos.find((item) => item.id === action.id);
            const todoId = currentList.todos.findIndex((item) => item.id === action.id);
            const ListId = todoLists.findIndex((item) => item.id === currentTodoList);
            let todos, newTodo;
            switch (action.action) {
                case 'add':
                    newTodo = {
                        id: action.id,
                        text: action.text,
                        important: action.important,
                        done: false,
                        date: action.date
                    };
                    todos = [
                        ...currentList.todos,
                        newTodo
                    ];
                    break;
                case 'delete':
                    todos = [
                        ...currentList.todos.slice(0, todoId),
                        ...currentList.todos.slice(todoId + 1)
                    ];
                    break;
                case 'doneToggle':
                    newTodo = {
                        ...currentList.todos[todoId],
                        done: !todo.done
                    };
                    todos = [
                        ...currentList.todos.slice(0, todoId),
                        newTodo,
                        ...currentList.todos.slice(todoId + 1)
                    ];
                    break;
                case 'importantToggle':
                    newTodo = {
                        ...currentList.todos[todoId],
                        important: !todo.important
                    };
                    todos = [
                        ...currentList.todos.slice(0, todoId),
                        newTodo,
                        ...currentList.todos.slice(todoId + 1)
                    ];
                    break;
                case 'update':
                    newTodo = {
                        id: action.id,
                        text: action.text,
                        important: action.important,
                        done: action.done,
                        date: action.date
                    };
                    todos = [
                        ...currentList.todos.slice(0, todoId),
                        newTodo,
                        ...currentList.todos.slice(todoId + 1)
                    ];
                    break;
                default:
                    return {
                        newTodo: [...currentList.todos[todoId]],
                        todos: [...currentList.todos]
                    }
            }
            const newList = {
                ...currentList,
                todos: todos
            };
            const newLists = [
                ...state.todoLists.slice(0, ListId),
                newList,
                ...state.todoLists.slice(ListId + 1)
            ];
            return {
                ...state,
                todoLists: newLists,
                isTodoDialogOpened: false,
                isTodoModalOpened: false,
                onUpdateTodoItem: {}
            };
        case 'SHOW_ALERT':
            return {
                ...state,
                isAlertShow: {
                    status: action.status,
                    message: action.message
                }
            };
        case 'CLOSE_ALERT':
            return {
                ...state,
                isAlertShow: false
            };
        default:
            return {
                ...state
            };
    }
};

export default reducer;
