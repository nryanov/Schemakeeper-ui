import React from 'react';
import {mount} from 'enzyme'
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import * as types from "../../schema-registry/logic/actionTypes";
import thunk from "redux-thunk";
import SubjectSchemaVersionsContainer from "../../schema-registry/components/SubjectSchemaVersions";


describe("SubjectInfo component spec", () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    it('render the connected(SubjectSchemaVersionsContainer) component', () => {
        let store = mockStore();
        let wrapper = mount(<Provider store={store}><SubjectSchemaVersionsContainer/></Provider>);
        expect(wrapper.find(SubjectSchemaVersionsContainer).length).toEqual(1);
    });
});