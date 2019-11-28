import React from 'react';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme'
import SchemaContainer from '../../schema-registry/components/Schema';


describe('SubjectInfo component spec', () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    it('render the connected(SchemaContainer) component', () => {
        let store = mockStore();
        let wrapper = mount(<Provider store={store}><SchemaContainer/></Provider>);
        expect(wrapper.find(SchemaContainer).length).toEqual(1);
    });

    it('invalid avro schema should disable save button', () => {
        let store = mockStore();
        let wrapper = mount(<Provider store={store}><SchemaContainer/></Provider>);
        let textArea = wrapper.find('textarea');
        textArea.getDOMNode().value = 'invalid schema';
        textArea.simulate('change');
        expect(wrapper.find('button').props().disabled).toEqual(true);
    });

    it('valid avro schema should enable save button', () => {
        let store = mockStore();
        let wrapper = mount(<Provider store={store}><SchemaContainer/></Provider>);
        let textArea = wrapper.find('textarea');
        textArea.getDOMNode().value = 'int';
        textArea.simulate('change');
        expect(wrapper.find('button').props().disabled).toEqual(false);
    });
});