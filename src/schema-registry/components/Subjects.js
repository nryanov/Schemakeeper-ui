import React from 'react';
import {connect} from 'react-redux'
import {selectSubject} from '../redux/actions'

    <table className="table table-hover">
        <thead>
        <tr>
            <th scope="col">Subject name</th>
        </tr>
        </thead>
        <tbody>
        {subjectsNameList.slice(page * pageSize, (page + 1) * pageSize).map((el, i) =>
            <tr key={i}>
                <td onClick={() => onSelectSubject(el)}>{el}</td>
            </tr>
        )}
        </tbody>
    </table>
);

const mapStateToProps = state => ({
    subjectsNameList: state.subjects,
    page: state.page - 1,
    pageSize: state.pageSize
});

const mapDispatchToProps = dispatch => ({
    onSelectSubject(subjectName) {
        dispatch(selectSubject(subjectName))
    }
});

const SubjectsContainer = connect(mapStateToProps, mapDispatchToProps)(Subjects);

export default SubjectsContainer;