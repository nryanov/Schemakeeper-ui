import React from 'react';
import {connect} from 'react-redux'
import {selectSubject} from '../redux/actions'

const Subjects = ({subjectsNameList, onSelectSubject}) => (
    <table className="table table-hover">
        <thead>
        <tr>
            <th scope="col">Subject name</th>
        </tr>
        </thead>
        <tbody>
        {subjectsNameList.map((el, i) =>
            <tr key={i}>
                <td onClick={() => onSelectSubject(el)}>{el}</td>
            </tr>
        )}
        </tbody>
    </table>
);

const mapStateToProps = state => ({
    subjectsNameList: [...state.subjects]
});

const mapDispatchToProps = dispatch => ({
    onSelectSubject(subjectName) {
        dispatch(selectSubject(subjectName))
    }
});

const SubjectsContainer = connect(mapStateToProps, mapDispatchToProps)(Subjects);

export default SubjectsContainer;