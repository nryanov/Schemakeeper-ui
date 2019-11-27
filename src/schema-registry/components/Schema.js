import React from 'react'
import {connect} from 'react-redux'
import {isSchemaValid, schemaTextToJsonNotEscaped} from "../utils/AvroUtils";
import {addNewSchemaToSubject} from "../logic/actions";

class Schema extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.schemaInput = React.createRef();

        this.validateAndSetSchema = this.validateAndSetSchema.bind(this);
        this.addNewSchema = this.addNewSchema.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (!state || props.info !== state.info) {
            return  {
                ...props,
                lastSchema: props.schemas.length > 0 ? schemaTextToJsonNotEscaped(props.schemas[props.schemas.length - 1].schemaText) : '',
                isSchemaValid: true
            }
        } else {
            return {
                ...props,
                ...state
            }
        }
    }

    validateAndSetSchema() {
        this.setState({
            isSchemaValid: this.schemaInput.current.value.length === 0 || isSchemaValid(this.schemaInput.current.value),
            lastSchema: this.schemaInput.current.value
        })
    }

    addNewSchema() {
        this.state.addNewSchemaToSubject(this.state.info.subject, this.state.info.compatibilityType, JSON.stringify(this.state.lastSchema));
    }

    render() {
        return (
            <div className="tab-pane fade" id="schema" role="tabpanel" aria-labelledby="schema-tab">
                <div className="form-group mt-4">
                    <textarea className={`form-control ${this.state.isSchemaValid ? '' : 'is-invalid'}`} id="updateSchema"
                              ref={this.schemaInput} rows="3"
                              onChange={this.validateAndSetSchema}
                              value={this.state.lastSchema}>
                    </textarea>
                </div>
                <button type="button" className="btn btn-outline-success" onClick={this.addNewSchema} disabled={!this.state.lastSchema || !this.state.isSchemaValid}>
                    Save
                </button>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.selectedSubject
});

const mapDispatchToProps = dispatch => ({
    addNewSchemaToSubject(subjectName, compatibilityType, schema) {
        dispatch(addNewSchemaToSubject(subjectName, compatibilityType, schema))
    }
});

const SchemaContainer = connect(mapStateToProps, mapDispatchToProps)(Schema);

export default SchemaContainer;

