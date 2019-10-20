import React from 'react'
import {connect} from 'react-redux'
import {clearLastException} from "../redux/actions";

const Alert = ({lastException, clearLastException}) => (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {lastException}
        <button type="button" onClick={() => clearLastException()} className="close" data-dismiss="alert"
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
        return <div/>
    }
};

const AlertContainer = connect(mapStateToProps, mapDispatchToProps)(Wrapper);

export default AlertContainer;