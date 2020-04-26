import React, {Component} from "react";
import {Modal, Button, InputGroup, FormControl, Form} from "react-bootstrap";
import {connect} from "react-redux";
import {closeModalList, onUpdateList, showAlert, closeAlert, getId} from "../../actions/index"

class ModalList extends Component {
    state = {
        inputValue: ''
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.onUpdateListItem && prevProps !== this.props) {
            this.setState({
                inputValue: this.props.onUpdateListItem.title
            })
        }
    }

    onChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    };
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.inputValue || this.state.inputValue.length <= 0) {
            this.props.closeModalList();
            this.props.showAlert('error', 'Должно быть больше 0 символов ');
            setTimeout(this.props.closeAlert, 3000);
        } else if (this.state.inputValue.length >= 30) {
            this.props.closeModalList();
            this.props.showAlert('error', 'Должно быть меньше 30 символов ');
            setTimeout(this.props.closeAlert, 3000);
        } else if (this.props.todoLists.some((item) => item.title === this.state.inputValue)) {
            this.props.closeModalList();
            this.props.showAlert('error', 'Такое название уже есть в списке ');
            setTimeout(this.props.closeAlert, 3000);
        } else {
            if (this.props.onUpdateListItem) {
                this.props.onUpdateList('update', this.props.onUpdateListItem.id, this.state.inputValue);
                this.props.showAlert('success', `Список ${this.state.inputValue} изменен `);
                setTimeout(this.props.closeAlert, 3000);
            } else {
                this.props.onUpdateList('add', getId(this.props.todoLists), this.state.inputValue);
                this.props.showAlert('success', `Список ${this.state.inputValue} добавлен `);
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
                        Добавить новый список дел
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.onSubmit}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Название</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                onChange={this.onChange} placeholder={'Добавить список дел'}
                                value={this.state.inputValue}
                                aria-label="Username"
                                aria-describedby="basic-addon"
                            />
                        </InputGroup>
                        <Button variant="success" onClick={this.onSubmit}>Добавить</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );

    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, {closeModalList, onUpdateList, showAlert, closeAlert})(ModalList);
