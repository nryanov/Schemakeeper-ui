import React from 'react';
import {mount} from 'enzyme'
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import * as types from "../../schema-registry/logic/actionTypes";
import thunk from "redux-thunk";
import SchemaContainer from "../../schema-registry/components/Schema";


describe("SubjectInfo component spec", () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    it('render the connected(SchemaContainer) component', () => {
        let store = mockStore();
        let wrapper = mount(<Provider store={store}><SchemaContainer/></Provider>);
        expect(wrapper.find(SchemaContainer).length).toEqual(1);
    });
});