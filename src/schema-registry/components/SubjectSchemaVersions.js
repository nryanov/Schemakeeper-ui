import React from 'react'
import {connect} from 'react-redux'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {schemaTextToJson} from "../utils/AvroUtils";
import {deleteSubjectSchemaByVersion} from "../redux/actions";

const SubjectSchemaVersion = ({subject, version, schemaText, schemaType, schemaId, deleteSubjectSchemaByVersion}) => (
    <div className="card">
        <div className="card-header" id={`heading${subject}-${version}`}>
            <h5 className="mb-0">
                <button className="btn btn-link" data-toggle="collapse" data-target={`#${subject}-${version}`}
                        aria-expanded="true" aria-controls={`${subject - version}`}>
                    {`v.${version} - Schema id: ${schemaId}`}
                </button>
            </h5>
        </div>

        <div id={`${subject}-${version}`} className="collapse" aria-labelledby={`heading${subject}-${version}`}
             data-parent="#accordion">
            <div className="card-body">
                <p><strong>Schema type: </strong> {schemaType}</p>
                <SyntaxHighlighter language="json" style={docco}>
                    {schemaTextToJson(schemaText)}
                </SyntaxHighlighter>

                {
                    process.env.REACT_APP_ALLOW_TO_DELETE_SUBJECTS_SCHEMAS === "true" ?
                        <button type="button" className="btn btn-danger" onClick={() => deleteSubjectSchemaByVersion(subject, version)}>Delete</button> : <></>
                }
            </div>
        </div>
    </div>
);

const SubjectSchemaVersions = ({subject, schemas, deleteSubjectSchemaByVersion}) => (
    <div className="tab-pane fade mt-4" id="versions" role="tabpanel" aria-labelledby="versions-tab">
        <div id="accordion">
            {schemas.map((el, i) => <SubjectSchemaVersion key={i} {...el} subject={subject} deleteSubjectSchemaByVersion={deleteSubjectSchemaByVersion}/>)}
        </div>
    </div>
);

const EmptySubjectSchemaVersions = () => (
    <div className="tab-pane fade mt-4" id="versions" role="tabpanel" aria-labelledby="versions-tab">
        <p>Subject has no registered schemas</p>
    </div>
);

const Wrapper = ({subject, schemas, deleteSubjectSchemaByVersion}) => {
    if (schemas && schemas.length > 0) {
        return <SubjectSchemaVersions subject={subject} schemas={schemas} deleteSubjectSchemaByVersion={deleteSubjectSchemaByVersion}/>
    } else {
        return <EmptySubjectSchemaVersions/>
    }
};

const mapStateToProps = state => ({
    schemas: state.selectedSubject.schemas,
    subject: state.selectedSubject.info.subject
});

const mapDispatchToProps = dispatch => ({
    deleteSubjectSchemaByVersion(subject, version) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Delete subject schema by version ${subject} - ${version}?`)) {
            dispatch(deleteSubjectSchemaByVersion(subject, version))
        }
    }
});

const SubjectSchemaVersionsContainer = connect(mapStateToProps, mapDispatchToProps)(Wrapper);

export default SubjectSchemaVersionsContainer;