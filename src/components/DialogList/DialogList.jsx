import React, {Component} from "react";
import {Modal, Button, ModalBody} from "react-bootstrap";
import {connect} from "react-redux";
import { dialogListToggle, onUpdateList, showAlert, closeAlert } from "../../actions/index"

class DialogList extends Component {

    render() {
        const currentList = this.props.todoLists.find((item) => item.id === this.props.currentTodoList) ||
            this.props.todoLists.find((item) => item);
        if (!currentList) {
            return <div></div>
        }
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-center">
                        Удалить список <i>{currentList.title}</i> ?
                    </Modal.Title>
                </Modal.Header>
                <ModalBody>
                    Всего будет удалено {currentList.todos.length} дел(а).
                    {currentList.todos.map((item, id)=> <div key={id}>{item.text}</div>)}
                </ModalBody>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.dialogListToggle}><i>НЕТ</i></Button>
                    <Button variant="success" onClick={()=>{this.props.onUpdateList('delete', this.props.onUpdateListId);
                        this.props.showAlert('error', `Список ${currentList.title} удален `);
                        setTimeout(this.props.closeAlert,3000)}}><i>ДА</i></Button>
                </Modal.Footer>
            </Modal>
        );

    }
}
const mapStateToProps = (state) => {
    return {
        todoLists: state.todoLists,
        onUpdateListId: state.onUpdateListId,
        currentTodoList: state.currentTodoList
    };
};

export default connect(mapStateToProps, { dialogListToggle, onUpdateList, showAlert, closeAlert })(DialogList);
