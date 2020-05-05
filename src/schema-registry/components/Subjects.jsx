import React from 'react';
import {connect} from 'react-redux'
import {selectSubject} from '../logic/actions'

const Subjects = ({subjectsNameList, page, pageSize, onSelectSubject}) => (
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

const Wrapper = ({subjectsNameList, filteredSubjects, page, pageSize, onSelectSubject}) => {
    if (filteredSubjects) {
        return <Subjects subjectsNameList={filteredSubjects} page={page} pageSize={pageSize} onSelectSubject={onSelectSubject}/>
    } else {
        return <Subjects subjectsNameList={subjectsNameList} page={page} pageSize={pageSize} onSelectSubject={onSelectSubject}/>
    }
};

const mapStateToProps = state => ({
    subjectsNameList: state.subjects,
    filteredSubjects: state.filteredSubjects,
    page: state.page - 1,
    pageSize: state.pageSize
});

const mapDispatchToProps = dispatch => ({
    onSelectSubject(subjectName) {
        dispatch(selectSubject(subjectName))
    }
});

const SubjectsContainer = connect(mapStateToProps, mapDispatchToProps)(Wrapper);

export default SubjectsContainer;