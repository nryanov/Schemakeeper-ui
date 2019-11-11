import React from 'react'
import {connect} from 'react-redux'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {schemaTextToJson} from "../utils/AvroUtils";

const SubjectSchemaVersion = ({subject, version, schemaText, schemaId}) => (
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
                <SyntaxHighlighter language="json" style={docco}>
                    {schemaTextToJson(schemaText)}
                </SyntaxHighlighter>
            </div>
        </div>
    </div>
);

const SubjectSchemaVersions = ({schemas}) => (
    <div className="tab-pane fade mt-4" id="versions" role="tabpanel" aria-labelledby="versions-tab">
        <div id="accordion">
            {schemas.map((el, i) => <SubjectSchemaVersion key={i} {...el}/>)}
        </div>
    </div>
);

const EmptySubjectSchemaVersions = () => (
    <div className="tab-pane fade mt-4" id="versions" role="tabpanel" aria-labelledby="versions-tab">
        <p>Subject has no registered schemas</p>
    </div>
);

const Wrapper = ({schemas}) => {
    if (schemas && schemas.length > 0) {
        return <SubjectSchemaVersions schemas={schemas}/>
    } else {
        return <EmptySubjectSchemaVersions/>
    }
};

const mapStateToProps = state => ({
    schemas: state.selectedSubject.schemas
});

const SubjectSchemaVersionsContainer = connect(mapStateToProps, null)(Wrapper);

export default SubjectSchemaVersionsContainer;