import React from 'react';
import {connect} from 'react-redux'
import SubjectSchemaVersionsContainer from "./SubjectSchemaVersions";
import SubjectInfoContainer from "./SubjectInfo";
import SchemaContainer from "./Schema";
import {deleteSubject} from "../redux/actions";

const SubjectCard = ({subject, deleteSubject}) => (
    <div className="card">
        <div className="card-header">
            {subject}

            {
                process.env.REACT_APP_ALLOW_TO_DELETE_SUBJECTS === "true" ?
                <button type="button" className="close" onClick={() => deleteSubject(subject)}>
                    <span aria-hidden="true">&times;</span>
                </button> : <></>
            }
        </div>
        <div className="card-body">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#info" role="tab"
                       aria-controls="home" aria-selected="true">Info</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#versions" role="tab"
                       aria-controls="profile" aria-selected="false">Versions</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#schema" role="tab"
                       aria-controls="contact" aria-selected="false">Schema</a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <SubjectInfoContainer/>
                <SubjectSchemaVersionsContainer/>
                <SchemaContainer/>
            </div>
        </div>
    </div>
);

const Wrapper = ({info, deleteSubject}) => (
    <>
        {info ? <SubjectCard subject={info.subject} deleteSubject={deleteSubject}/> : <></>}
    </>
);

const mapStateToProps = state => ({
    ...state.selectedSubject
});

const mapDispatchToProps = dispatch => ({
    deleteSubject(subject) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Delete subject ${subject}?`)) {
            dispatch(deleteSubject(subject))
        }
    }
});

const SubjectCardContainer = connect(mapStateToProps, mapDispatchToProps)(Wrapper);

export default SubjectCardContainer;