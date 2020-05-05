import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {clearLastException} from "../logic/actions";

const Alert = () => {
    const lastException = useSelector(state => state.lastException);
    const dispatch = useDispatch();

    const clear = () => {
        dispatch(clearLastException());
    };

    if (lastException) {
        return (
            <div id='lastExceptionAlert' className="alert alert-danger alert-dismissible fade show" role="alert">
                {lastException}
                <button id='lastExceptionAlertCloseBtn' type="button" onClick={clear} className="close"
                        data-dismiss="alert"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    } else {
        return (<></>)
    }
};

export default Alert;