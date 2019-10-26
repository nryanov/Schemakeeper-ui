import React from 'react'
import {connect} from 'react-redux'
import {changePage} from "../redux/actions";

const Pagination = ({page, maxPage, changePage}) => (
    <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}><button type="button" className="page-link" onClick={() => changePage(page - 1)}>Previous</button></li>
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}><button type="button" className="page-link" onClick={() => changePage(1)}>1</button></li>
            { page < 4 ? <></> : <li className="page-item"><button type="button" className="page-link">...</button></li>}
            { page < 3 ? <></> : <li className="page-item"><button type="button" className="page-link">{page - 1}</button></li>}
            { page === 1 || page === maxPage ? <></> : <li className="page-item disabled"><button type="button" className="page-link">{page}</button></li>}
            { maxPage - 1 > 0 && page >= maxPage - 1 ? <></> : <li className="page-item"><button type="button" className="page-link">{page + 1}</button></li>}
            { maxPage - 2 > 0 && page >= maxPage - 2 ? <></> : <li className="page-item"><button type="button" className="page-link">...</button></li>}
            <li className={`page-item ${page === maxPage ? 'disabled' : ''}`}><button type="button" className="page-link" onClick={() => changePage(maxPage)}>{maxPage}</button></li>
            <li className={`page-item ${page === maxPage ? 'disabled' : ''}`}><button type="button" className="page-link" onClick={() => changePage(page + 1)}>Next</button></li>
        </ul>
    </nav>
);

const mapStateToProps = (state) => ({
    page: state.page,
    maxPage: state.maxPage
});

const mapDispatchToProps = (dispatch) => ({
    changePage(page) {
        dispatch(changePage(page))
    }
});

const PaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default PaginationContainer;