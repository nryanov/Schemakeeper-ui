import * as types from './actionTypes'
import * as api from './api'


export const searchSubjectsByName = (pattern) => {
    return {
        type: types.SEARCH_SUBJECTS_BY_NAME,
        pattern
    }
};

export const addNewSchemaToSubject = (subject, compatibilityType, schemaText) => (dispatch) => {
    if (schemaText) {
        return api.registerSchemaAndSubject(subject, compatibilityType, schemaText)
            .then(() => dispatch(fetchSubjectMeta(subject)))
            .catch(error => {
                dispatch(failedOperation(types.ADD_NEW_SCHEMA_TO_SUBJECT, error));
                console.error(error);
            });
    } else {
        return dispatch(failedOperation(types.ADD_NEW_SCHEMA_TO_SUBJECT, "Schema text should not be empty"));
    }
};

export const subjectList = () => (dispatch) => {
    dispatch({type: types.FETCH_SUBJECT_LIST});

    return api.subjects()
        .then(response => {
            dispatch({type: types.SUCCESSFUL_CONNECTION});
            dispatch(updateSubjectList(response.data))
        })
        .catch(error => {
            dispatch({type: types.NO_CONNECTION});
            dispatch(failedOperation(types.FETCH_SUBJECT_LIST, error));
            console.error(error);
        })
};

export const updateSubjectList = (subjects) => {
    return {
        type: types.UPDATE_SUBJECT_LIST,
        subjects
    }
};

export const failedOperation = (actionType, errorMsg) => {
    let reason =  errorMsg.response ? errorMsg.response.data : "INTERNAL ERROR";

    return {
        type: types.FAILED_OPERATION,
        actionType,
        errorMsg,
        reason
    }
};

export const clearLastException = () => {
    return {
        type: types.CLEAR_LAST_EXCEPTION
    }
};

export const createSubject = (subjectName, compatibilityType, schema) => dispatch => {
    if (schema) {
        return api.registerSchemaAndSubject(subjectName, compatibilityType, schema)
            .then(() => dispatch({type: types.CREATE_SUBJECT, subjectName}))
            .catch(error => {
                dispatch(failedOperation(types.CREATE_SUBJECT, error));
                console.error(error);
            });
    } else {
        return api.registerSubject(subjectName, compatibilityType, false)
            .then(() => dispatch({type: types.CREATE_SUBJECT, subjectName}))
            .catch(error => {
                dispatch(failedOperation(types.CREATE_SUBJECT, error));
                console.error(error);
            });
    }
};

export function changePage(newPage) {
    return {
        type: types.CHANGE_PAGE,
        newPage
    }
}

export const updateSubjectMetaList = (subject, subjectMeta) => {
    return {
        type: types.UPDATE_SUBJECT_META_LIST,
        subject,
        subjectMeta
    }
};

export const deleteSubject = (subject) => (dispatch) => {
    return api.deleteSubject(subject)
        .then(_ => dispatch({type: types.DELETE_SUBJECT, subject}))
        .catch(error => {
            dispatch(failedOperation(types.DELETE_SUBJECT, error));
            console.error(error);
        })
};

export const deleteSubjectSchemaByVersion = (subject, version) => (dispatch) => {
    return api.deleteSubjectSchemaByVersion(subject, version)
        .then(() => dispatch({type: types.DELETE_SUBJECT_SCHEMA_VERSION, subject, version}))
        .catch(error => {
            dispatch(failedOperation(types.DELETE_SUBJECT_SCHEMA_VERSION, error));
            console.error(error);
        })
};

export const fetchSubjectMeta = (subjectName) => (dispatch) => {
    dispatch({type: types.FETCH_SUBJECT_META});
    return api.subjectMetadata(subjectName)
        .then(subjectInfo => {
            return api.subjectSchemasMetadata(subjectName).then(subjectSchemas => {
                let meta = {
                    info: subjectInfo.data,
                    schemas: subjectSchemas.data
                };
                return dispatch(updateSubjectMetaList(subjectName, meta))
            })
        })
        .catch(error => {
            dispatch(failedOperation(types.FETCH_SUBJECT_META, error));
            console.error(error);
        })
};

export const selectSubject = (subjectName) => (dispatch, getState) => {
    let meta = getState().subjectsMeta[subjectName];
    if (meta) {
        return dispatch({type: types.SELECT_SUBJECT, meta});
    } else {
        return dispatch(fetchSubjectMeta(subjectName)).then(() => {
            let meta = getState().subjectsMeta[subjectName];
            return dispatch({type: types.SELECT_SUBJECT, meta})
        });
    }
};

//todo: fix race condition
// A -> delay -> updateSubjectCompatibility-A -> updateLockStatus-A
//   B -> updateSubjectCompatibility-B -> delay -> updateLockStatus-B
// updateSubjectCompatibility-A updateLockStatus-B
export const updateSubjectMeta = (subject, compatibilityType, isLocked) => (dispatch, getState) => {
    api.updateSubjectCompatibility(subject, compatibilityType)
        .then(() => {
            if (isLocked) {
                return api.lockSubject(subject);
            } else {
                return api.unlockSubject(subject);
            }
        })
        .then(() => dispatch({type: types.UPDATE_SUBJECT_META, subject, compatibilityType, isLocked}))
        .catch(error => {
            dispatch(failedOperation(types.UPDATE_SUBJECT_META, error));
            console.error(error);
        })
};