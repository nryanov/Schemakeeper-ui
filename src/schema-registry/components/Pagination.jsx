import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {changePage} from "../logic/actions";

const Pagination = () => {
    const dispatch = useDispatch();
    const {page, maxPage} = useSelector(state => state);

    const handleChangePage = (page) => {
        dispatch(changePage(page))
    };

    if (maxPage > 1) {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                        <button type="button" className="page-link" onClick={() => handleChangePage(page - 1)}>Previous
                        </button>
                    </li>
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                        <button type="button" className="page-link" onClick={() => handleChangePage(1)}>1</button>
                    </li>
                    {page - 2 > 1 ? <li className="page-item disabled">
                        <button type="button" className="page-link">...</button>
                    </li> : <></>}
                    {page - 1 > 1 ? <li className="page-item">
                        <button type="button" className="page-link"
                                onClick={() => handleChangePage(page - 1)}>{page - 1}</button>
                    </li> : <></>}
                    {page === 1 ? <></> : <li className="page-item disabled">
                        <button type="button" className="page-link">{page}</button>
                    </li>}
                    {page + 1 < maxPage ? <li className="page-item">
                        <button type="button" className="page-link"
                                onClick={() => handleChangePage(page + 1)}>{page + 1}</button>
                    </li> : <></>}
                    {page + 2 < maxPage ? <li className="page-item disabled">
                        <button type="button" className="page-link">...</button>
                    </li> : <></>}
                    {maxPage === page ? <></> : <li className={`page-item`}>
                        <button type="button" className="page-link"
                                onClick={() => handleChangePage(maxPage)}>{maxPage}</button>
                    </li>}
                    <li className={`page-item ${maxPage === 0 || page === maxPage ? 'disabled' : ''}`}>
                        <button type="button" className="page-link" onClick={() => handleChangePage(page + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
        );
    } else {
        return (<></>)
    }
};

export default Pagination;