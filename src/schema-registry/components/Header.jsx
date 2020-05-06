import React, {forwardRef} from 'react'
import NewSubjectModal from "./NewSubjectModal";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import DialogContent from '@material-ui/core/DialogContent';


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

const Header = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => setOpen(false);

    const handleOpen = () => setOpen(true);

    const ModalComponent = forwardRef((props, ref) => {
        return <NewSubjectModal innerRef={ref} handleClose={handleClose}/>;
    });

    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <DialogContent>
                    <ModalComponent/>
                </DialogContent>
            </Modal>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Schemakeeper
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={handleOpen}>
                        New item
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    )
};

export default Header;