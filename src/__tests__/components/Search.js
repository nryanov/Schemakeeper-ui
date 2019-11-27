import React from 'react';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {mount} from 'enzyme'
import SearchContainer from '../../schema-registry/components/Search'
import * as types from '../../schema-registry/logic/actionTypes'


describe("Search component spec", () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    it('render the connected(SearchContainer) component', () => {
        let store = mockStore();
        let wrapper = mount(<Provider store={store}><SearchContainer/></Provider>);
        expect(wrapper.find(SearchContainer).length).toEqual(1);
    });

    //fixme: incorrect test
    it('emit SEARCH_SUBJECTS_BY_NAME event', () => {
        const expectedActions = [
            {type: types.SEARCH_SUBJECTS_BY_NAME, pattern: 'sample'},
        ];

        const store = mockStore();
        const wrapper = mount(<Provider store={store}><SearchContainer/></Provider>);
        wrapper.find('input').simulate('change', {target: {value: 'sample'}});
        expect(store.getActions()).toEqual(expectedActions)
    });
});
