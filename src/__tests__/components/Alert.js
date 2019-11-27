import React from 'react';
import {mount} from 'enzyme'
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import AlertContainer from "../../schema-registry/components/Alert";
import * as types from "../../schema-registry/logic/actionTypes";


describe("Alert component spec", () => {
    const mockStore = configureStore();

    it('Do not show alert when there is no exception', () => {
        let store = mockStore();
        let wrapper = mount(<Provider store={store}><AlertContainer/></Provider>);
        expect(wrapper.find('#lastExceptionAlert').exists()).toEqual(false);
    });

    it('Show alert with last exception', () => {
        let store = mockStore({lastException: 'msg'});
        let wrapper = mount(<Provider store={store}><AlertContainer/></Provider>);
        expect(wrapper.find('#lastExceptionAlert').exists()).toEqual(true);
    });

    it('Close alert and clear last exception', () => {
        const expectedActions = [
            {type: types.CLEAR_LAST_EXCEPTION},
        ];

        let store = mockStore({lastException: 'msg'});
        let wrapper = mount(<Provider store={store}><AlertContainer/></Provider>);
        wrapper.find('#lastExceptionAlertCloseBtn').simulate('click');
        wrapper.update();
        expect(store.getActions()).toEqual(expectedActions)
    });
});
