import React from 'react'
import {connect} from 'react-redux'

const SubjectInfo = ({subject, compatibilityType, isLocked}) => (
    <div className="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="info-tab">
        <ul className="list-unstyled mt-4">
            <li><strong>Subject name:</strong> {subject}</li>
            <li><strong>Compatibility type: </strong> {compatibilityType}</li>
            <li><strong>Locked: </strong> {isLocked ? "true" : "false"}</li>
        </ul>
    </div>
);

const mapStateToProps = state => ({
    ...state.selectedSubject.info
});

const SubjectInfoContainer = connect(mapStateToProps, null)(SubjectInfo);

export default SubjectInfoContainer;