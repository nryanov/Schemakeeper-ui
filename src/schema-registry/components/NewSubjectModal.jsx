import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createSubject} from "../logic/actions";
import {isSchemaValid} from "../utils/AvroUtils";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@material-ui/core/Select';
import ButtonGroup from "@material-ui/core/ButtonGroup";


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const NewSubjectModal = (props) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const [subjectNameInput, setSubjectName] = useState("");
    const [schemaInput, setSchema] = useState("");
    const [compatibilityType, setCompatibilityType] = useState("NONE");

    const [isSubjectNameCorrect, validateSubjectName] = useState(true);
    const [isSchemaCorrect, validateSchema] = useState(true);

    const dispatch = useDispatch();

    const updateSubjectName = (event) => {
        setSubjectName(event.target.value);

        validateSubjectName(event.target.value.length !== 0);
    };

    const updateSchema = (event) => {
        setSchema(event.target.value);

        if (event.target.value.length !== 0 && !isSchemaValid(event.target.value)) {
            validateSchema(false);
        } else {
            validateSchema(true);
        }
    };

    const clearInputs = () => {
        setSubjectName("");
        setSchema("");
        setCompatibilityType("NONE");
    };

    const newSubject = () => {
        if (subjectNameInput.length > 0 && isSubjectNameCorrect) {
            if (schemaInput.length > 0) {
                if (isSchemaCorrect) {
                    const schema = JSON.stringify(schemaInput);
                    dispatch(createSubject(subjectNameInput, compatibilityType, schema));
                }
            } else {
                dispatch(createSubject(subjectNameInput, compatibilityType, null));
            }

            clearInputs();
            props.handleClose();
        }
    };

    return (
        <Card innerRef={props.innerRef} style={modalStyle} className={classes.paper}>
            <CardContent>
                <div>
                    <Typography variant="h6">
                        New subject
                    </Typography>
                </div>

                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField
                            error={!isSubjectNameCorrect}
                            id="subject-name-id"
                            label="Subject name"
                            helperText={isSubjectNameCorrect ? "" : "Incorrect subject name"}
                            onChange={updateSubjectName}
                            margin="normal"
                        />
                    </div>

                    <div>
                        <FormControl className={classes.formControl}>
                        <InputLabel id="compatibility-type-label">Compatibility type</InputLabel>
                        <Select
                            labelId="compatibility-type-label"
                            id="compatibility-type-id"
                            value={compatibilityType}
                            onChange={event => setCompatibilityType(event.target.value)}
                        >
                            <MenuItem value={"NONE"}>NONE</MenuItem>
                            <MenuItem value={"BACKWARD"}>BACKWARD</MenuItem>
                            <MenuItem value={"FORWARD"}>FORWARD</MenuItem>
                            <MenuItem value={"FULL"}>FULL</MenuItem>
                            <MenuItem value={"BACKWARD_TRANSITIVE"}>BACKWARD_TRANSITIVE</MenuItem>
                            <MenuItem value={"FORWARD_TRANSITIVE"}>FORWARD_TRANSITIVE</MenuItem>
                            <MenuItem value={"FULL_TRANSITIVE"}>FULL_TRANSITIVE</MenuItem>
                        </Select>
                    </FormControl>
                    </div>

                    <div>
                        <TextField
                            error={!isSchemaCorrect}
                            id="schema-id"
                            label="Schema (optional)"
                            multiline
                            rows={4}
                            helperText={isSchemaCorrect ? "" : "Incorrect avro schema"}
                            variant="outlined"
                            onChange={updateSchema}
                            margin="normal"
                        />
                    </div>
                </form>

                <ButtonGroup color="secondary" aria-label="outlined primary button group">
                    <Button variant="contained" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="contained" onClick={newSubject}>
                        Save changes
                    </Button>
                </ButtonGroup>

            </CardContent>
        </Card>
    )
};

export default NewSubjectModal;