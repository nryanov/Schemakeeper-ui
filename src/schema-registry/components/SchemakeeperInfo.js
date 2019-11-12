import React from 'react'
import {connect} from 'react-redux'
import './../../style/animation.css'

const SchemakeeperInfo = ({isAccessible}) => (
    <div className="card">
        <div className="card-body">
            <strong>URL: </strong> {process.env.REACT_APP_SCHEMAKEEPER_URL} <span style={{
            fontSize: 25,
            color: isAccessible ? "green" : "red"
        }} className='blink'>●</span>
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    isAccessible: state.isAccessible
});

const SchemakeeperInfoContainer = connect(mapStateToProps, null)(SchemakeeperInfo);

export default SchemakeeperInfoContainer;