import React from 'react'
import {connect} from 'react-redux'
import {createSubject} from "../redux/actions";
import {isSchemaValid} from "../utils/AvroUtils";

class NewSubjectModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSchemaValid: true
        };

        this.subjectNameInput = React.createRef();
        this.compatibilityTypeInput = React.createRef();
        this.schemaInput = React.createRef();

        this.clearInputs = this.clearInputs.bind(this);
        this.newSubject = this.newSubject.bind(this);
        this.validateSchema = this.validateSchema.bind(this);
    }

    clearInputs() {
        this.subjectNameInput.current.value = "";
        this.compatibilityTypeInput.current.value = "NONE";
        this.schemaInput.current.value = "";
        this.setState({
            isSchemaValid: true
        })
    }

    validateSchema() {
        this.setState({
            isSchemaValid: this.schemaInput.current.value.length === 0 || isSchemaValid(this.schemaInput.current.value)
        })
    }

    newSubject() {
        let schemaText = this.schemaInput.current.value;
        if (schemaText.length > 0) {
            let schema = JSON.stringify(schemaText);
            this.props.createSubject(this.subjectNameInput.current.value, this.compatibilityTypeInput.current.value, schema);
        } else {
            this.props.createSubject(this.subjectNameInput.current.value, this.compatibilityTypeInput.current.value, null);
        }
        this.clearInputs();
    }

    render() {
        return (
            <div className="modal fade" id="newSubjectModal" tabIndex="-1" role="dialog"
                 aria-labelledby="newSubjectModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newSubjectModalLabel">New subject</h5>
                            <button type="button" onClick={this.clearInputs} className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="newSubjectFormControlName">Subject name</label>
                                    <input type="text" ref={this.subjectNameInput} className="form-control"
                                           id="newSubjectFormControlName"
                                           placeholder="<Subject name>"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newSubjectFormControlCompatibilityType">Compatibility type</label>
                                    <select className="form-control" ref={this.compatibilityTypeInput}
                                            id="newSubjectFormControlCompatibilityType">
                                        <option>NONE</option>
                                        <option>BACKWARD</option>
                                        <option>FORWARD</option>
                                        <option>FULL</option>
                                        <option>BACKWARD_TRANSITIVE</option>
                                        <option>FORWARD_TRANSITIVE</option>
                                        <option>FULL_TRANSITIVE</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newSubjectFormControlSchema">Schema (optional)</label>
                                    <textarea className={`form-control ${this.state.isSchemaValid ? '' : 'is-invalid'}`} id="newSubjectFormControlSchema"
                                              ref={this.schemaInput} rows="3" onChange={this.validateSchema}>
                                    </textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    onClick={this.clearInputs}>Close
                            </button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.newSubject}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    createSubject(subjectName, compatibilityType, schema) {
        dispatch(createSubject(subjectName, compatibilityType, schema))
    }
});

const NewSubjectModalContainer = connect(null, mapDispatchToProps)(NewSubjectModal);

export default NewSubjectModalContainer;