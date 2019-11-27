import React from 'react';
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {mount} from 'enzyme'
import SubjectsContainer from '../../schema-registry/components/Subjects'


describe("SubjectsContainer", () => {
    const initialState = {
        page: 1,
        subjects: [],
        filteredSubjects: null,
        pageSize: 5,
    };
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><SubjectsContainer/></Provider>);
    });

    afterEach(() => {
       wrapper.unmount();
    });

    it('render the connected(SubjectsContainer) component', () => {
        expect(wrapper.find(SubjectsContainer).length).toEqual(1);
    });
});