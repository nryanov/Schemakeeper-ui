import React from 'react';
import {mount} from 'enzyme'
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import * as types from "../../schema-registry/logic/actionTypes";
import thunk from "redux-thunk";
import SubjectInfoContainer from "../../schema-registry/components/SubjectInfo";


describe("SubjectInfo component spec", () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    it('render the connected(SubjectInfoContainer) component', () => {
        let store = mockStore();
        let wrapper = mount(<Provider store={store}><SubjectInfoContainer/></Provider>);
        expect(wrapper.find(SubjectInfoContainer).length).toEqual(1);
    });
});