import React, {Component} from "react";
import {Modal, Button, InputGroup, FormControl, Form} from "react-bootstrap";
import {connect} from "react-redux";
import {closeModalTodo, onUpdateTodo, showAlert, closeAlert, getId} from "../../actions/index"
import "./ModalTodo.css"

class ModalTodo extends Component {
    state = {
        inputValue: '',
        checkValue: null

    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.onUpdateTodoItem && prevProps !== this.props) {
            this.setState({
                inputValue: this.props.onUpdateTodoItem.text,
                checkValue: this.props.onUpdateTodoItem.important
            })
        }
    }


    onChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    };
    onChangeCheckbox = (e) => {
        this.setState({
            checkValue: e.target.checked
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        const currentList = this.props.todoLists.find((item) => item.id === this.props.currentTodoList);
        if (!this.state.inputValue || this.state.inputValue.length <= 0) {
            this.props.closeModalTodo();
            this.props.showAlert('error', 'Должно быть больше 0 символов ');
            setTimeout(this.props.closeAlert, 3000);
        } else if (this.state.inputValue.length >= 30) {
            this.props.closeModalTodo();
            this.props.showAlert('error', 'Должно быть меньше 30 символов ');
            setTimeout(this.props.closeAlert, 3000);
        } else if (currentList.todos.some((item) => item.text === this.state.inputValue)) {
            this.props.closeModalTodo();
            this.props.showAlert('error', 'Такое название уже есть в списке ');
            setTimeout(this.props.closeAlert, 3000);
        } else {
            if (this.props.onUpdateTodoItem) {
                this.props.onUpdateTodo('update', this.props.onUpdateTodoItem.id, this.state.inputValue,
                    this.state.checkValue, this.props.onUpdateTodoItem.done, Date.now());
                this.props.showAlert('success', `Дело ${this.state.inputValue} добавлено `);
                setTimeout(this.props.closeAlert, 3000);
            } else {
                const currentList = this.props.todoLists.find((item) => item.id === this.props.currentTodoList);
                this.props.onUpdateTodo('add', getId(currentList.todos), this.state.inputValue,
                    this.state.checkValue, false, Date.now());
                this.props.showAlert('success', `Дело ${this.state.inputValue} добавлено `);
                setTimeout(this.props.closeAlert, 3000);
            }
        }
    };

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Добавить дело
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <Form className={'form-todo'} onSubmit={this.onSubmit}>
                            <Form.Label>Название</Form.Label>
                            <FormControl
                                onChange={this.onChange} placeholder={'Название дела'}
                                value={this.state.inputValue}
                            />
                            <Form.Label>Срочно</Form.Label>
                            <FormControl
                                onChange={this.onChangeCheckbox}
                                type={'checkbox'}
                                checked={this.state.checkValue}
                            />
                            <Button variant="success" onClick={this.onSubmit}>Добавить</Button>
                        </Form>
                    </InputGroup>


                </Modal.Body>
            </Modal>
        );

    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, {closeModalTodo, onUpdateTodo, showAlert, closeAlert})(ModalTodo);
