import React, {Component} from 'react';
import {
    dialogListToggle, setCurrentTodoList, openModalList, closeModalList,
    todoListsRequested, todoListsLoaded, todoListsError, filter, onFilterChanged
} from "../../actions";
import {connect} from "react-redux";
import {Button, ButtonGroup} from "react-bootstrap";
import compose from "../../utils/compose";
import withTodoService from '../hoc/withTodoService';
import DialogList from "../DialogList/DialogList";
import ModalList from "../ModalList/ModalList";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import "./TodoLists.css";
import Alert from "../Alert/Alert";

const TodoLists = ({
                       currentTodoList, filterValue, todoLists, setCurrentTodoList, dialogListToggle,
                       isListDialogOpened, isListModalOpened, openModalList, closeModalList, isAlertShow, onFilterChanged
                   }) => {
    let classNameAll = "outline-primary";
    let classNameActive = "outline-primary";
    let classNameDone = "outline-primary";
    if (filterValue === 'all') {
        classNameAll = "primary";
    }
    if (filterValue === 'active') {
        classNameActive = "primary";
    }
    if (filterValue === 'done') {
        classNameDone = "primary";
    }
    return (
        <div>

            <DialogList
                show={isListDialogOpened}
                onHide={dialogListToggle}
            />

            <ModalList
                show={isListModalOpened}
                onHide={closeModalList}
            />
            <div>
                <ButtonGroup>
                    <Button onClick={() => onFilterChanged('all')} size="md"
                            variant={classNameAll}>Все</Button>
                    <Button onClick={() => onFilterChanged('active')} size="md"
                            variant={classNameActive}>Неисполненные</Button>
                    <Button onClick={() => onFilterChanged('done')} size="md"
                            variant={classNameDone}>Исполненные</Button>
                </ButtonGroup>
                {filter(todoLists, filterValue).sort(function (a, b) {
                    return a.title.localeCompare(b.title);
                }).map((item) => {
                    let classNames = 'todo-lists-title';
                    if (item.id === currentTodoList) {
                        classNames += ' current';
                    }
                    if (item.todos.every((item) => item.done === true) && item.todos.length !== 0) {
                        classNames += ' done';
                    } else if (item.todos.some((item) => item.done === false)) {
                        classNames += ' active';
                    }


                    return (
                        <div className={'todo-lists'} key={item.id} onClick={() => setCurrentTodoList(item.id)}>
                            <h5 className={classNames}>{item.title}</h5>
                            <div className={'buttons'}>
                                <Button variant="outline-info" size={'sm'} onClick={() => openModalList(item.id)}>
                                    <i className="fa fa-pencil"></i></Button>
                                <Button variant="outline-info" size={'sm'} onClick={() => dialogListToggle(item.id)}>
                                    <i className="fa fa-times"></i></Button>
                            </div>
                        </div>)
                })}
            </div>
            <Button className={'add-todo-button'} variant="success" size={'lg'}
                    onClick={() => openModalList(null)}>+</Button>
            <Alert show={isAlertShow.status}
                   status={isAlertShow.status} message={isAlertShow.message}/>
        </div>
    )
};

class TodoListsContainer extends Component {

    componentDidMount() {
        const {todoService, todoListsLoaded, todoListsError, todoListsRequested} = this.props;
        todoListsRequested();
        todoService.getTodoLists()
            .then((data) => todoListsLoaded(data))
            .catch((error) => todoListsError(error));
    }

    render() {
        const {
            todoLists, loading, error, setCurrentTodoList, dialogListToggle,
            isListDialogOpened, openModalList, isListModalOpened, closeModalList, currentTodoList,
            isAlertShow, filterValue, onFilterChanged
        } = this.props;

        if (loading) {
            return <Spinner/>
        }
        if (error) {
            return <Error/>
        }
        return <TodoLists todoLists={todoLists} setCurrentTodoList={setCurrentTodoList}
                          dialogListToggle={dialogListToggle} currentTodoList={currentTodoList}
                          isListDialogOpened={isListDialogOpened} openModalList={openModalList}
                          isListModalOpened={isListModalOpened} closeModalList={closeModalList}
                          isAlertShow={isAlertShow} filterValue={filterValue} onFilterChanged={onFilterChanged}/>
    }
}

const mapStateToProps = ({
                             currentTodoList, onUpdateListId, todoLists, loading, error,
                             isListDialogOpened, isListModalOpened, isAlertShow, filterValue
                         }) => {
    return {
        currentTodoList, onUpdateListId, todoLists, loading, error,
        isListDialogOpened, isListModalOpened, isAlertShow, filterValue
    };
};

export default compose(
    withTodoService(),
    connect(mapStateToProps, {
        todoListsLoaded, todoListsError, setCurrentTodoList, dialogListToggle,
        todoListsRequested, openModalList, closeModalList, onFilterChanged
    })
)(TodoListsContainer);


