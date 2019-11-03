import React from 'react'
import {connect} from 'react-redux'
import {changePage} from "../redux/actions";

const Pagination = ({page, maxPage, changePage}) => (
    <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}><button type="button" className="page-link" onClick={() => changePage(page - 1)}>Previous</button></li>
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}><button type="button" className="page-link" onClick={() => changePage(1)}>1</button></li>
            { page - 2 > 1 ? <li className="page-item"><button type="button" className="page-link">...</button></li> : <></> }
            { page - 1 > 1 ? <li className="page-item"><button type="button" className="page-link" onClick={() => changePage(page - 1)}>{page - 1}</button></li> :  <></>}
            { page === 1 ? <></> : <li className="page-item disabled"><button type="button" className="page-link">{page}</button></li>}
            { page + 1 < maxPage ? <li className="page-item"><button type="button" className="page-link" onClick={() => changePage(page + 1)}>{page + 1}</button></li> : <></>}
            { page + 2 < maxPage ? <li className="page-item"><button type="button" className="page-link">...</button></li> : <></>}
            {maxPage === 0 || maxPage === page ? <></> : <li className={`page-item ${page === maxPage ? 'disabled' : ''}`}><button type="button" className="page-link" onClick={() => changePage(maxPage)}>{maxPage}</button></li>}
            <li className={`page-item ${maxPage === 0 || page === maxPage ? 'disabled' : ''}`}><button type="button" className="page-link" onClick={() => changePage(page + 1)}>Next</button></li>
        </ul>
    </nav>
);

const Wrapper = ({page, maxPage, changePage}) => {
    if (maxPage > 1) {
        return <Pagination page={page} maxPage={maxPage} changePage={changePage}/>
    } else {
        return <></>
    }
};

const mapStateToProps = (state) => ({
    page: state.page,
    maxPage: state.maxPage
});

const mapDispatchToProps = (dispatch) => ({
    changePage(page) {
        dispatch(changePage(page))
    }
});

const PaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Wrapper);

export default PaginationContainer;