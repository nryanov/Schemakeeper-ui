import updateState from '../../schema-registry/logic/reducer'
import * as types from '../../schema-registry/logic/actionTypes'


describe("reducer specs", () => {
    it("return the same state", () => {
        let state = {};
        expect(updateState(state, {type: "unknown"})).toEqual(state);
    });

    it("NO_CONECTION", () => {
        let state = {isAccessible: true};
        expect(updateState(state, {type: types.NO_CONNECTION})).toEqual({isAccessible: false});
    });

    it("SUCCESSFUL_CONNECTION", () => {
        let state = {isAccessible: false};
        expect(updateState(state, {type: types.SUCCESSFUL_CONNECTION})).toEqual({isAccessible: true});
    });

    it("DELETE_SUBJECT", () => {
        let state = {
            subjects: ["subject"],
            subjectsMeta: {
                subject: {
                    info: "some info",
                    schemas: "schemas list"
                }
            },
            selectedSubject: {
                info: "some info",
                schemas: "schemas list"
            }
        };
        expect(updateState(state, {
            type: types.DELETE_SUBJECT,
            subject: "subject"
        })).toEqual({
            subjects: [],
            subjectsMeta: {},
            selectedSubject: null
        });
    });

    it("DELETE_SUBJECT_SCHEMA_VERSION", () => {
        let state = {
            subjects: ["subject"],
            subjectsMeta: {
                subject: {
                    info: "some info",
                    schemas: [{"version": 1}, {"version": 2}]
                }
            }
        };
        expect(updateState(state, {
            type: types.DELETE_SUBJECT_SCHEMA_VERSION,
            subject: "subject",
            version: 1
        })).toEqual({
            subjects: ["subject"],
            subjectsMeta: {
                subject: {
                    info: "some info",
                    schemas: [{"version": 2}]
                }
            }
        });
    });

    it("SEARCH_SUBJECTS_BY_NAME empty pattern", () => {
        let state = {
            subjects: ["s1"],
            filteredSubjects: {},
            page: 2,
            maxPage: 10
        };

        expect(updateState(state, {
            type: types.SEARCH_SUBJECTS_BY_NAME,
            pattern: null
        })).toEqual({
            subjects: ["s1"],
            filteredSubjects: null,
            page: 1,
            maxPage: 1
        });
    });

    it("SEARCH_SUBJECTS_BY_NAME not empty pattern", () => {
        let state = {
            subjects: ["s1", "s2", "s3"],
            filteredSubjects: null,
            page: 1,
            maxPage: 1
        };

        expect(updateState(state, {
            type: types.SEARCH_SUBJECTS_BY_NAME,
            pattern: "s1"
        })).toEqual({
            subjects: ["s1", "s2", "s3"],
            filteredSubjects: ["s1"],
            page: 1,
            maxPage: 1
        });
    });

    it("FAILED_OPERATION", () => {
        let state = {
            lastException: null
        };
        expect(updateState(state, {
            type: types.FAILED_OPERATION,
            errorMsg: "msg",
            reason: "reason"
        })).toEqual({
            lastException: `msg: ${JSON.stringify("reason")}`
        });
    });

    it("CHANGE_PAGE", () => {
        let state = {
            page: 1
        };
        expect(updateState(state, {
            type: types.CHANGE_PAGE,
            newPage: 2
        })).toEqual({
            page: 2
        });
    });

    it("CLEAR_LAST_EXCEPTION", () => {
        let state = {
            lastException: "some message"
        };
        expect(updateState(state, {
            type: types.CLEAR_LAST_EXCEPTION
        })).toEqual({
            lastException: null
        });
    });

    it("UPDATE_SUBJECT_META", () => {
        let state = {
            selectedSubject: {
                info: {
                    compatibilityType: "backward",
                    isLocked: false
                }
            },
            subjectsMeta: {
                s1: {
                    info: {
                        compatibilityType: "backward",
                        isLocked: false
                    }
                }
            }
        };
        expect(updateState(state, {
            type: types.UPDATE_SUBJECT_META,
            subject: "s1",
            compatibilityType: "full",
            isLocked: true
        })).toEqual({
            selectedSubject: {
                info: {
                    compatibilityType: "full",
                    isLocked: true
                }
            },
            subjectsMeta: {
                s1: {
                    info: {
                        compatibilityType: "full",
                        isLocked: true
                    }
                }
            }
        });
    });

    it("UPDATE_SUBJECT_META_LIST", () => {
        let state = {
            subjectsMeta: {}
        };
        expect(updateState(state, {
            type: types.UPDATE_SUBJECT_META_LIST,
            subject: "s1",
            subjectMeta: {
                info: {}
            }
        })).toEqual({
            subjectsMeta: {
                s1: {
                    info: {}
                }
            }
        });
    });

    it("UPDATE_SUBJECT_LIST", () => {
        let state = {
            subjects: []
        };
        expect(updateState(state, {
            type: types.UPDATE_SUBJECT_LIST,
            subjects: ["s1", "s2", "s3"]
        })).toEqual({
            subjects: ["s1", "s2", "s3"],
            maxPage: 1
        });
    });

    it("CREATE_SUBJECT", () => {
        let state = {
            subjects: ["s1"]
        };
        expect(updateState(state, {
            type: types.CREATE_SUBJECT,
            subjectName: "s2"
        })).toEqual({
            subjects: ["s1", "s2"]
        });
    });

    it("SELECT_SUBJECT", () => {
        let state = {
            selectedSubject: null
        };
        expect(updateState(state, {
            type: types.SELECT_SUBJECT,
            meta: {}
        })).toEqual({
            selectedSubject: {}
        });
    });
});