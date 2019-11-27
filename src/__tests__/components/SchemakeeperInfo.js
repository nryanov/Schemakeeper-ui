import React from 'react';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {mount} from 'enzyme'
import SchemakeeperInfo from "../../schema-registry/components/SchemakeeperInfo";


describe("SchemakeeperInfo component spec", () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    it('render the connected(SchemakeeperInfo) component when server is accessible', () => {
        let store = mockStore({isAccessible: true});
        let wrapper = mount(<Provider store={store}><SchemakeeperInfo/></Provider>);
        expect(wrapper.find('span').prop('style')).toHaveProperty('color', 'green');
    });

    it('render the connected(SchemakeeperInfo) component when server is not accessible', () => {
        let store = mockStore({isAccessible: false});
        let wrapper = mount(<Provider store={store}><SchemakeeperInfo/></Provider>);
        expect(wrapper.find('span').prop('style')).toHaveProperty('color', 'red');
    });
});