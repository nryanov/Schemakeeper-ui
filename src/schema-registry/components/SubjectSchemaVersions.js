import React from 'react'
import {connect} from 'react-redux'
import {parse} from 'avro-js'

const SubjectSchemaVersion = ({subject, schemaId, version, schemaText, schemaType}) => (
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
                {parse(schemaText).toJSON()}
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
    <div className="tab-pane fade" id="versions" role="tabpanel" aria-labelledby="versions-tab">
        Subject has no registered schemas
    </div>
);

const Wrapper = ({info, schemas}) => {
    console.log("SCHEMAS", schemas);
    if (schemas) {
        return <SubjectSchemaVersions schemas={schemas} subject={info.subject}/>
    } else {
        return <EmptySubjectSchemaVersions/>
    }
};

const mapStateToProps = state => ({
    ...state.selectedSubject
});

const SubjectSchemaVersionsContainer = connect(mapStateToProps, null)(Wrapper);

export default SubjectSchemaVersionsContainer;