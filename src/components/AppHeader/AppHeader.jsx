import React, {Component} from "react";
import {connect} from "react-redux";

import './AppHeader.scss'
import {clearLocalStorageData, setLocalStorageData} from "../../actions";
import {Button, ButtonGroup} from "react-bootstrap";

class AppHeader extends Component {
    state = {
        setAutoSave: setInterval(() => setLocalStorageData(this.props.todoLists), 10000),
        value: false
    };

    render() {
        return (
            <header className={'bordered'}>
                <div className={'logo'}><i className="fa fa-list-ol" aria-hidden="true"> ToDo-List</i></div>
                <div className={'user-info'}>
                    <b>User_Name_1</b>
                    <Button variant={'info'}>Выйти</Button>
                </div>
                <ButtonGroup>
                    <Button variant={"success"} onClick={() => setLocalStorageData(this.props.todoLists)}>Save</Button>
                    <Button disabled={this.state.value} variant={"warning"} onClick={() => {
                        clearInterval(this.state.setAutoSave);
                        this.setState({value: true})
                    }}>Off auto save</Button>
                    <Button variant={"danger"} onClick={() => clearLocalStorageData()}>Reset all data</Button>
                </ButtonGroup>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps, {})(AppHeader);
