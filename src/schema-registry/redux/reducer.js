import * as types from './actionTypes'

export default function updateState(state, action) {
    switch (action.type) {
        case types.SEARCH_SUBJECTS_BY_NAME:
            if (action.pattern === null || action.pattern.length === 0) {
                return {
                    ...state,
                    filteredSubjects: null,
                    page: 1,
                    maxPage: Math.ceil(state.subjects.length / 5)
                };
            } else {
                let filteredSubjects = [...state.subjects].filter(subject => subject.includes(action.pattern));
                return {
                    ...state,
                    filteredSubjects: filteredSubjects,
                    page: 1,
                    maxPage: Math.ceil(filteredSubjects.length / 5)
                };
            }
        case types.FAILED_OPERATION:
            return {
                ...state,
                lastException: `${action.errorMsg}: ${JSON.stringify(action.reason)}`
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
        case types.UPDATE_SUBJECT_META:
            let currentSubjectMeta = {...state.subjectsMeta[action.subject]};
            currentSubjectMeta.info.compatibilityType = action.compatibilityType;
            currentSubjectMeta.info.isLocked = action.isLocked;
            let subjectsMeta = {...state.subjectsMeta};
            subjectsMeta[action.subject] = currentSubjectMeta;

            return {
                ...state,
                selectedSubject: currentSubjectMeta,
                subjectsMeta: subjectsMeta
            };
        case types.UPDATE_SUBJECT_META_LIST:
            let subject = action.subject;
            let subjectMeta = action.subjectMeta;
            let newMetaCache = {...state.subjectsMeta};
            newMetaCache[subject] = subjectMeta;

            return {
                ...state,
                subjectsMeta: newMetaCache
            };
        case types.UPDATE_SUBJECT_LIST:
            return {
                ...state,
                subjects: action.subjects,
                maxPage: Math.ceil(action.subjects.length / 5)
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