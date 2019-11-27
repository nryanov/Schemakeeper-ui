import React from 'react';
import {mount} from 'enzyme'
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import * as types from "../../schema-registry/logic/actionTypes";
import thunk from "redux-thunk";
import SubjectCardContainer from "../../schema-registry/components/SubjectCard";


describe("SubjectCard component spec", () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    beforeAll(() => {
        process.env = Object.assign(process.env, { REACT_APP_ALLOW_TO_DELETE_SUBJECTS: 'true' });
    });

    it('render the connected(SubjectCardContainer) component', () => {
        let store = mockStore();
        let wrapper = mount(<Provider store={store}><SubjectCardContainer/></Provider>);
        expect(wrapper.find(SubjectCardContainer).length).toEqual(1);
    });
});