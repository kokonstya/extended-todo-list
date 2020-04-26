import React from 'react';
import {onUpdateTodo, dialogTodoToggle, openModalTodo, closeModalTodo, getDate} from "../../actions";
import {connect} from "react-redux";
import {Button, Form} from "react-bootstrap";
import DialogTodo from "../DialogTodo/DialogTodo";
import ModalTodo from "../ModalTodo/ModalTodo";
import "./Todos.css"

const Todos = ({
                   currentTodoList, todoLists, onUpdateTodo, isTodoDialogOpened, dialogTodoToggle,
                   isTodoModalOpened, openModalTodo, closeModalTodo
               }) => {
    if (!todoLists.length) {
        return <div className={'todos-title'}><h2>Дела отсутствуют, вы всё сделали!</h2></div>
    }
    if (currentTodoList === null) {
        return <div className={'todos-title'}><h2>Выберите список дел</h2></div>
    }
    const idx = todoLists.find((item) => item.id === currentTodoList);
    let classNames = 'todo-item ';
    return (
        <div className={'todos'}>
            <ModalTodo
                show={isTodoModalOpened}
                onHide={closeModalTodo}

            />
            <DialogTodo
                show={isTodoDialogOpened}
                onHide={dialogTodoToggle}
            />
            <h3 className={'todos-title'}>{idx.title}</h3>
            {idx.todos.sort((a, b) => b.date - a.date).map((item, i) => {

                if (item.important) {
                    classNames = 'todo-item important';
                } else {
                    classNames = 'todo-item '
                }

                return (
                    <div className={classNames} key={i}>
                        <Form className={'todo-item checkbox'}>
                            <Form.Check
                                onChange={() => onUpdateTodo('doneToggle', item.id)}
                                type={'checkbox'}
                                checked={item.done}
                                size={'lg'}
                            />
                        </Form>
                        <h5 onClick={() => onUpdateTodo('doneToggle', item.id)}>{item.text}
                            <span>{getDate(item.date)}</span></h5>
                        <Button variant="outline-info" size={'sm'} onClick={() => openModalTodo(item.id)}>
                            <i className="fa fa-pencil"></i></Button>
                        <Button variant="outline-info" size={'sm'} onClick={() => dialogTodoToggle(item.id)}>
                            <i className="fa fa-times"></i></Button>
                    </div>)
            })}
            <Button className={'add-todo-button'} variant="success" size={'lg'} onClick={openModalTodo}>+</Button>

        </div>
    )
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, {onUpdateTodo, dialogTodoToggle, openModalTodo, closeModalTodo})(Todos);


