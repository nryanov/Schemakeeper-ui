import React from 'react'
import {connect} from 'react-redux'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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
                            {JSON.stringify(JSON.parse(this.props.schemaText), null, 2)}
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
        Subject has no registered schemas
    </div>
);

const Wrapper = ({info, schemas}) => {
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