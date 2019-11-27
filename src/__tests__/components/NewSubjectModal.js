import React from 'react';
import {mount} from 'enzyme'
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import * as types from "../../schema-registry/logic/actionTypes";
import thunk from "redux-thunk";
import axios from 'axios';
import NewSubjectModalContainer from "../../schema-registry/components/NewSubjectModal";

jest.mock('axios');


describe("NewSubjectModalContainer component spec", () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    it('render the connected(NewSubjectModalContainer) component', () => {
        let store = mockStore();
        let wrapper = mount(<Provider store={store}><NewSubjectModalContainer/></Provider>);
        expect(wrapper.find(NewSubjectModalContainer).length).toEqual(1);
    });
});