import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {clearLastException} from "../logic/actions";
import { Alert as AlertComponent } from 'reactstrap';

const Alert = () => {
    const lastException = useSelector(state => state.lastException);
    const dispatch = useDispatch();

    const clear = () => {
        dispatch(clearLastException());
    };

    if (lastException) {
        return (
            <AlertComponent color="danger" id="lastExceptionAlert">
                {lastException}
                <button id='lastExceptionAlertCloseBtn' type="button" onClick={clear} className="close"
                        data-dismiss="alert"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </AlertComponent>
        )
    } else {
        return (<></>)
    }
};

export default Alert;