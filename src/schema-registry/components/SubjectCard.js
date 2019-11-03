import React from 'react';
import {connect} from 'react-redux'
import SubjectSchemaVersionsContainer from "./SubjectSchemaVersions";
import SubjectInfoContainer from "./SubjectInfo";
import Schema from "./Schema";

const SubjectCard = ({subject}) => (
    <div className="card">
        <div className="card-header">
            {subject}
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
                <Schema/>
            </div>
        </div>
    </div>
);

const Wrapper = ({info}) => (
    <>
        {info ? <SubjectCard subject={info.subject}/> : <></>}
    </>
);

const mapStateToProps = state => ({
    ...state.selectedSubject
});

const SubjectCardContainer = connect(mapStateToProps, null)(Wrapper);

export default SubjectCardContainer;