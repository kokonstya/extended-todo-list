import React from "react";
import {Alert} from "react-bootstrap";

const AlertWindow = (props) => {
    if (props.status === 'error') {
        return (
            <Alert variant={'danger'}>
                {props.message}
            </Alert>
        )
    } else if (props.status === 'success') {
        return (
            <Alert variant={'success'}>
                {props.message}
            </Alert>
        )
    } else {
        return (true)
    }

};

export default AlertWindow;
