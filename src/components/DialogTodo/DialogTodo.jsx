import React, {Component} from "react";
import {Modal, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {dialogTodoToggle, showAlert, onUpdateTodo, closeAlert} from "../../actions/index"

class DialogTodo extends Component {

    render() {
        const currentList = this.props.todoLists.find((item) => item.id === this.props.currentTodoList);
        const currentTodo = currentList.todos.find((item) => item.id === this.props.onUpdateTodoId) || {};
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-center">
                        Удалить дело <i>{currentTodo.text}</i> ?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.dialogTodoToggle}><i>НЕТ</i></Button>
                    <Button variant="success" onClick={() => {
                        this.props.onUpdateTodo('delete', this.props.onUpdateTodoId);
                        this.props.showAlert('error', `Дело ${currentTodo.text} удалено`);
                        setTimeout(this.props.closeAlert, 3000)
                    }}><i>ДА</i></Button>
                </Modal.Footer>
            </Modal>
        );

    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, {dialogTodoToggle, showAlert, onUpdateTodo, closeAlert})(DialogTodo);
