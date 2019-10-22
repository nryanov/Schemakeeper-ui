import * as types from './actionTypes'
import * as api from './api'

export const subjectList = () => (dispatch) => {
    dispatch({type: types.FETCH_SUBJECT_LIST});

    return api.subjects()
        .then(response => dispatch(updateSubjectList(response.data)))
        .catch(error => {
            dispatch(failedOperation(types.FETCH_SUBJECT_LIST, error));
            throw error;
        })
};

export const updateSubjectList = (subjects) => {
    return {
        type: types.UPDATE_SUBJECT_LIST,
        subjects
    }
};

export const failedOperation = (actionType, errorMsg) => {
    return {
        type: types.FAILED_OPERATION,
        actionType,
        errorMsg
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
            .then(() => dispatch(subjectList()))
            .catch(error => {
                dispatch(failedOperation(types.CREATE_SUBJECT, error));
                throw error;
            });
    } else {
        return api.registerSubject(subjectName, compatibilityType, false)
            .then(() => dispatch(subjectList()))
            .catch(error => {
                dispatch(failedOperation(types.CREATE_SUBJECT, error));
                throw error;
            });
    }
};

export function changePage(newPage) {
    return {
        type: types.CHANGE_PAGE,
        newPage
    }
}

export const updateSubjectMetaList = (subjectName, subjectMeta) => {
    return {
        type: types.UPDATE_SUBJECT_META_LIST,
        subjectName,
        subjectMeta
    }
};

export const fetchSubjectMeta = (subjectName) => (dispatch, getState) => {
    dispatch({type: types.FETCH_SUBJECT_META});
    return api.subjectMetadata(subjectName)
        .then(subjectInfo => {
            return api.subjectSchemasMetadata(subjectName).then(subjectSchemas => {
                let meta = {
                    info: subjectInfo.data,
                    schemas: subjectSchemas.data
                };
                dispatch(updateSubjectMetaList(subjectName, meta))
            })
        })
        .catch(error => {
            dispatch(failedOperation(types.FETCH_SUBJECT_META, error));
            throw error;
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