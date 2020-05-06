import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isSchemaValid, schemaTextToJsonNotEscaped} from "../utils/AvroUtils";
import {addNewSchemaToSubject} from "../logic/actions";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function lastSchema(schemas) {
    return schemas.length > 0 ? schemaTextToJsonNotEscaped(schemas[schemas.length - 1].schemaText) : '';
}

const Schema = ({id, value, index}) => {
    const {info, schemas} = useSelector(state => state.selectedSubject);
    const dispatch = useDispatch();
    const [schemaInput, setSchema] = useState(lastSchema(schemas));
    const [isSchemaValidState, validateSchema] = useState(true);

    const handleAddNewSchemaToSubject = () => {
        dispatch(addNewSchemaToSubject(info.subject, info.compatibilityType, JSON.stringify(schemaInput)))
    };

    const validateAndSetSchema = (event, newValue) => {
        setSchema(newValue);
        validateSchema(isSchemaValid(newValue));
    };

    return (
        <Paper id={id} hidden={value !== index}>
            <div>
                <TextField
                    error={!isSchemaValidState}
                    id="schema-id"
                    label="Schema"
                    multiline
                    rows={4}
                    helperText={isSchemaValidState ? "" : "Incorrect avro schema"}
                    variant="outlined"
                    onChange={validateAndSetSchema}
                    margin="normal"
                    defaultValue={schemas}
                />
            </div>

            <Button variant="contained" onClick={handleAddNewSchemaToSubject} disabled={!schemaInput || !isSchemaValidState}>
                Save
            </Button>
        </Paper>
    );
};

export default Schema;

