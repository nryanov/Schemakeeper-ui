import React from 'react'
import {connect} from 'react-redux'
import {searchSubjectsByName} from "../logic/actions";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.subjectNameInput = React.createRef();
        this.searchSubjectsByName = this.searchSubjectsByName.bind(this);
    }

    searchSubjectsByName() {
        this.props.searchSubjectsByName(this.subjectNameInput.current.value);
    }

    render() {
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Search</span>
                </div>
                <input onChange={this.searchSubjectsByName} ref={this.subjectNameInput} type="text" className="form-control" placeholder="Subject name" aria-label="subject"
                       aria-describedby="basic-addon1"/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    searchSubjectsByName(pattern) {
        dispatch(searchSubjectsByName(pattern))
    }
});

const SearchContainer = connect(null, mapDispatchToProps)(Search);

export default SearchContainer;