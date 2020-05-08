import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isSchemaValid, schemaTextToJsonNotEscaped} from "../utils/AvroUtils";
import {addNewSchemaToSubject} from "../logic/actions";

function lastSchema(schemas) {
    return schemas.length > 0 ? schemaTextToJsonNotEscaped(schemas[schemas.length - 1].schemaText) : '';
}

const Schema = () => {
    const dispatch = useDispatch();
    const schemas = useSelector(state => state.selectedSubject ? state.selectedSubject.schemas : []);
    const {subject, compatibilityType} = useSelector(state => state.selectedSubject ? state.selectedSubject.info : {});
    const [isSchemaValidState, setSchemaValid] = useState(true);
    const [schemaInput, setSchema] = useState(lastSchema(schemas));

    const validateAndSetSchema = (event) => {
        const newSchema = event.target.value;
        setSchema(newSchema);
        setSchemaValid(newSchema.length === 0 || isSchemaValid(newSchema));
    };

    const addNewSchema = () => {
        dispatch(addNewSchemaToSubject(subject, compatibilityType, JSON.stringify(schemaInput)));
    };

    return (
        <div className="tab-pane fade" id="schema" role="tabpanel" aria-labelledby="schema-tab">
            <div className="form-group mt-4">
                    <textarea className={`form-control ${isSchemaValidState ? '' : 'is-invalid'}`} id="updateSchema"
                              rows="3"
                              onChange={validateAndSetSchema}
                              value={schemaInput}>
                    </textarea>
                <div className="invalid-feedback">
                    Invalid avro schema
                </div>
            </div>
            <button type="button" className="btn btn-outline-success" onClick={addNewSchema} disabled={!schemaInput || !isSchemaValidState}>
                Save
            </button>
        </div>
    )
};

export default Schema;

