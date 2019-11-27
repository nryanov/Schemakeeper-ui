import React from 'react';
import {mount} from 'enzyme'
import Header from "../../schema-registry/components/Header";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";


describe("Header component spec", () => {
    const mockStore = configureStore();

    it('render the connected(Header) component', () => {
        let store = mockStore();
        let wrapper = mount(<Provider store={store}><Header/></Provider>);
        expect(wrapper.find(Header).length).toEqual(1);
    });
});
