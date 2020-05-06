import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import SubjectSchemaVersionsContainer from "./SubjectSchemaVersions";
import SubjectInfoContainer from "./SubjectInfo";
import SchemaContainer from "./Schema";
import {deleteSubject} from "../logic/actions";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function deleteSubjectButton(handleDeleteSubject) {
    if (process.env.REACT_APP_ALLOW_TO_DELETE_SUBJECTS === "true") {
        return (
            <Button variant="contained" color="secondary" onClick={handleDeleteSubject}>
                <DeleteIcon/>
            </Button>
        );
    } else {
        return (<></>)
    }
}

const SubjectCard = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();
    const selectedSubject = useSelector(state => state.selectedSubject);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDeleteSubject = () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Delete subject ${selectedSubject.subject}?`)) {
            dispatch(deleteSubject(selectedSubject.subject))
        }
    };

    if (selectedSubject) {
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="tabs">
                        <Tab label="Subject info" id="subject-info-tab" aria-controls="subject-info-panel" />
                        <Tab label="Versions" id="subject-schema-versions-tab" aria-controls="subject-schema-versions-panel" />
                        <Tab label="Schema" id="schema-tab" aria-controls="schema-panel" />
                    </Tabs>

                    {deleteSubjectButton(handleDeleteSubject)}
                </AppBar>
                <SubjectInfoContainer id={"subject-info-panel"} value={value} index={0}/>
                <SubjectSchemaVersionsContainer id={"subject-schema-versions-panel"} value={value} index={1}/>
                <SchemaContainer id={"schema-panel"} value={value} index={2}/>
            </div>
        );
    } else {
        return (<></>);
    }
};

export default SubjectCard;