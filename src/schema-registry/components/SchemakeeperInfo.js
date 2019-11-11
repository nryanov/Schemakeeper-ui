import React from 'react'

const SchemakeeperInfo = () => (
    <div className="card">
        <div className="card-body">
            <strong>URL: </strong>  {process.env.REACT_APP_SCHEMAKEEPER_URL}
        </div>
    </div>
);

export default SchemakeeperInfo;