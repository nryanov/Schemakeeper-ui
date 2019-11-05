import React from 'react'
import {connect} from 'react-redux'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {schemaTextToJson} from "../utils/AvroUtils";

class SubjectSchemaVersion extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-header" id={`heading${this.props.subject}-${this.props.version}`}>
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target={`#${this.props.subject}-${this.props.version}`}
                                aria-expanded="true" aria-controls={`${this.props.subject - this.props.version}`}>
                            {`v.${this.props.version} - Schema id: ${this.props.schemaId}`}
                        </button>
                    </h5>
                </div>

                <div id={`${this.props.subject}-${this.props.version}`} className="collapse" aria-labelledby={`heading${this.props.subject}-${this.props.version}`}
                     data-parent="#accordion">
                    <div className="card-body">
                        <SyntaxHighlighter language="json" style={docco}>
                            {schemaTextToJson(this.props.schemaText)}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        )
    }
}

const SubjectSchemaVersions = ({schemas}) => (
    <div className="tab-pane fade mt-4" id="versions" role="tabpanel" aria-labelledby="versions-tab">
        <div id="accordion">
            {schemas.map((el, i) => <SubjectSchemaVersion key={i} {...el}/>)}
        </div>
    </div>
);

const EmptySubjectSchemaVersions = () => (
    <div className="tab-pane fade" id="versions" role="tabpanel" aria-labelledby="versions-tab">
        <p className="mt-4">Subject has no registered schemas</p>
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