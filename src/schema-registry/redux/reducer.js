import * as types from './actionTypes'

// https://habr.com/ru/post/269831/

export default function updateState(state, action) {
    switch (action.type) {
        case types.FAILED_OPERATION:
            return {
                ...state,
                lastException: `${action.actionType}: ${action.errorMsg}`
            };
        case types.CHANGE_PAGE:
            return {
                ...state,
                page: action.newPage
            };
        case types.CLEAR_LAST_EXCEPTION:
            return {
                ...state,
                lastException: null
            };
        case types.UPDATE_SUBJECT_META_LIST:
            let subjectName = action.subjectName;
            let subjectMeta = action.subjectMeta;
            let newMetaCache = {...state.subjectsMeta};
            newMetaCache[subjectName] = subjectMeta;

            return {
                ...state,
                subjectsMeta: newMetaCache
            };
        case types.UPDATE_SUBJECT_LIST:
            return {
                ...state,
                subjects: action.subjects
            };
        case types.CREATE_SUBJECT: {
            let subjects = {...state.subjects};
            subjects[action.subjectName] = {
                subjectName: action.subjectName,
                compatibilityType: action.compatibilityType,
                isLocked: action.isLocked
            };

            return {
                ...state,
                subjects: subjects
            };
        }
        case types.SELECT_SUBJECT: {
            return {
                ...state,
                selectedSubject: action.meta
            }
        }
        default:
            return state;
    }
}