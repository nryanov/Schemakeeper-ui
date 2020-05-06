import React, {forwardRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {updateSubjectMeta} from "../logic/actions";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Modal from "@material-ui/core/Modal";

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

const SubjectInfoModal = (props) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const {subject, compatibilityType, isLocked} = useSelector(state => state.selectedSubject.info);

    const [isLockedInput, setLock] = useState(isLocked);
    const [compatibilityTypeInput, setCompatibilityType] = useState(compatibilityType.toUpperCase());

    const dispatch = useDispatch();

    const handleUpdateSubjectMeta = () => {
        dispatch(updateSubjectMeta(subject, compatibilityTypeInput, isLockedInput))
    };

    const clearInputs = () => {
        setLock(isLocked);
        setCompatibilityType(compatibilityType);
    };

    const handleClose = () => {
        clearInputs();
        props.handleClose();
    };

    return (
        <Card innerRef={props.innerRef} style={modalStyle} className={classes.paper}>
            <CardContent>
                <div>
                    <Typography variant="h6">
                        {subject}
                    </Typography>
                </div>

                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="compatibility-type-label">Compatibility type</InputLabel>
                            <Select
                                labelId="compatibility-type-label"
                                id="compatibility-type-id"
                                value={compatibilityTypeInput}
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

                        <FormControlLabel control={<Switch />} label={isLockedInput ? "Locked" : "Unlocked"} />
                    </div>
                </form>

                <ButtonGroup color="secondary" aria-label="outlined primary button group">
                    <Button variant="contained" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="contained" onClick={handleUpdateSubjectMeta}>
                        Save changes
                    </Button>
                </ButtonGroup>

            </CardContent>
        </Card>
    )
};

const SubjectInfo = ({id, value, index}) => {
    const {subject, compatibilityType, isLocked} = useSelector(state => state.selectedSubject.info);
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const handleOpen = () => setOpen(true);

    const ModalComponent = forwardRef((props, ref) => {
        return <SubjectInfoModal innerRef={ref} handleClose={handleClose}/>;
    });

    return (
        <Paper id={id} hidden={value !== index}>
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <DialogContent>
                    <ModalComponent/>
                </DialogContent>
            </Modal>
            <ul className="list-unstyled mt-4">
                <li><strong>Subject name:</strong> {subject}</li>
                <li><strong>Compatibility type: </strong> {compatibilityType}</li>
                <li><strong>Locked: </strong> {isLocked ? "true" : "false"}</li>
            </ul>

            <Button variant="contained" onClick={handleOpen}>
                Settings
            </Button>
        </Paper>
    );
};

export default SubjectInfo;