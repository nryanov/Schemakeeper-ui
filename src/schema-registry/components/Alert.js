import React from 'react'
import {connect} from 'react-redux'
import {clearLastException} from "../logic/actions";

const Alert = ({lastException, clearLastException}) => (
    <div id='lastExceptionAlert' className="alert alert-danger alert-dismissible fade show" role="alert">
        {lastException}
        <button id='lastExceptionAlertCloseBtn' type="button" onClick={() => clearLastException()} className="close" data-dismiss="alert"
                aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
);

const mapStateToProps = state => ({
    lastException: state.lastException
});

const mapDispatchToProps = dispatch => ({
    clearLastException() {
        dispatch(clearLastException())
    }
});

const Wrapper = ({lastException, clearLastException}) => {
    if (lastException) {
        return <Alert lastException={lastException} clearLastException={clearLastException}/>
    } else {
        return <></>
    }
};

const AlertContainer = connect(mapStateToProps, mapDispatchToProps)(Wrapper);

export default AlertContainer;