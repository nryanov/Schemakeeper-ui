import React from 'react'
import {useDispatch} from 'react-redux'
import {searchSubjectsByName} from "../logic/actions";

const Search = () => {
    const dispatch = useDispatch();

    const handleSearchSubjectsByName = (event) => {
        dispatch(searchSubjectsByName(event.target.value));
    };

    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Search</span>
            </div>
            <input onChange={handleSearchSubjectsByName} type="text" className="form-control" placeholder="Subject name" aria-label="subject"
                   aria-describedby="basic-addon1"/>
        </div>
    );
};

export default Search;