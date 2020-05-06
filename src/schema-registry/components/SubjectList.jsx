import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import {selectSubject} from '../logic/actions'
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";


const SubjectList = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const subjects = useSelector(state => state.subjects);
    const dispatch = useDispatch();

    const select = (event) => {
        dispatch(selectSubject(event.target.dataset.name));
    };

    const handleChangePage = (newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (newRowsPerPage) => setRowsPerPage(newRowsPerPage);

    return (
        <Paper>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell key="subject-name">
                                Subject
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody onClick={select}>
                        {subjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((subject) => {
                            return (
                                <TableRow key={subject}>
                                    <TableCell component="th" scope="row" data-name={subject}>
                                        {subject}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={subjects.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
};

export default SubjectList;