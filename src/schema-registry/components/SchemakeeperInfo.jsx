import React from 'react'
import {useSelector} from 'react-redux'
import './../../style/animation.css'

const SchemakeeperInfo = () => {
    const isAccessible = useSelector(state => state.isAccessible);

    return (
        <div className="card">
            <div className="card-body">
                <strong>URL: </strong> {process.env.REACT_APP_SCHEMAKEEPER_URL} <span style={{
                fontSize: 25,
                color: isAccessible ? "green" : "red"
            }} className='blink'>●</span>
            </div>
        </div>
    )
};

export default SchemakeeperInfo;