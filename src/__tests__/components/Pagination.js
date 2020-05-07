import React from 'react';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {mount} from 'enzyme'
import * as types from '../../schema-registry/logic/actionTypes'
import PaginationContainer from "../../schema-registry/components/Pagination";


describe("Pagination component spec", () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    it('do not render pagination component due to maxPage == 1', () => {
        let store = mockStore({maxPage: 1, page: 1});
        let wrapper = mount(<Provider store={store}><PaginationContainer/></Provider>);
        expect(wrapper.find('nav').exists()).toEqual(false);
    });

    it('render pagination component with 4 (previous, 1, 2, next) page selectors', () => {
        let store = mockStore({maxPage: 2, page: 1});
        let wrapper = mount(<Provider store={store}><PaginationContainer/></Provider>);
        expect(wrapper.find('nav').exists()).toEqual(true);
        expect(wrapper.find('li').length).toEqual(4);
        expect(wrapper.find('li').at(0).hasClass('disabled')).toEqual(true);
        expect(wrapper.find('li').at(1).hasClass('disabled')).toEqual(true);
    });

    it('render pagination component with 6 (previous, 1, 2, 3, 4, next) page selectors', () => {
        let store = mockStore({maxPage: 4, page: 3});
        let wrapper = mount(<Provider store={store}><PaginationContainer/></Provider>);
        expect(wrapper.find('nav').exists()).toEqual(true);
        expect(wrapper.find('li').length).toEqual(6);
        expect(wrapper.find('li').at(3).hasClass('disabled')).toEqual(true);
    });

    it('render pagination component with 7 (previous, 1, ..., 3, 4, 5, next) page selectors', () => {
        let store = mockStore({maxPage: 5, page: 4});
        let wrapper = mount(<Provider store={store}><PaginationContainer/></Provider>);
        expect(wrapper.find('nav').exists()).toEqual(true);
        expect(wrapper.find('li').length).toEqual(7);
        expect(wrapper.find('li').at(2).hasClass('disabled')).toEqual(true);
        expect(wrapper.find('li').at(4).hasClass('disabled')).toEqual(true);
    });

    it('render pagination component with 8 (previous, 1, ..., 4, 5, 6, 7, next) page selectors', () => {
        let store = mockStore({maxPage: 7, page: 5});
        let wrapper = mount(<Provider store={store}><PaginationContainer/></Provider>);
        expect(wrapper.find('nav').exists()).toEqual(true);
        expect(wrapper.find('li').length).toEqual(8);
        expect(wrapper.find('li').at(2).hasClass('disabled')).toEqual(true);
        expect(wrapper.find('li').at(4).hasClass('disabled')).toEqual(true);
    });

    it('render pagination component with all page selectors', () => {
        let store = mockStore({maxPage: 10, page: 5});
        let wrapper = mount(<Provider store={store}><PaginationContainer/></Provider>);
        expect(wrapper.find('li').length).toEqual(9);
        expect(wrapper.find('li').at(2).hasClass('disabled')).toEqual(true);
        expect(wrapper.find('li').at(4).hasClass('disabled')).toEqual(true);
        expect(wrapper.find('li').at(6).hasClass('disabled')).toEqual(true);
    });

    it('Go to 3th page from 4th using button "3" (previous, 1, ..., 3, 4, 5, ..., 10, next)', () => {
        const expectedActions = [
            {type: types.CHANGE_PAGE, newPage: 3},
        ];
        let store = mockStore({maxPage: 10, page: 4});
        let wrapper = mount(<Provider store={store}><PaginationContainer/></Provider>);
        wrapper.find('li').at(3).find('button').simulate('click');
        // (previous, 1, 2, 3, 4, ..., 10, next)
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Go to 2th page from 4th using button "previous" (previous, 1, ..., 3, 4, 5, ..., 10, next)', () => {
        const expectedActions = [
            {type: types.CHANGE_PAGE, newPage: 3},
        ];
        let store = mockStore({maxPage: 10, page: 4});
        let wrapper = mount(<Provider store={store}><PaginationContainer/></Provider>);
        wrapper.find('li').at(0).find('button').simulate('click');
        // (previous, 1, 2, 3, 4, ..., 10, next)
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Go to 8th page from 7th using button "8" (previous, 1, ..., 6, 7, 8, ..., 10, next)', () => {
        const expectedActions = [
            {type: types.CHANGE_PAGE, newPage: 8},
        ];
        let store = mockStore({maxPage: 10, page: 7});
        let wrapper = mount(<Provider store={store}><PaginationContainer/></Provider>);
        wrapper.find('li').at(5).find('button').simulate('click');
        // (previous, 1, ..., 7, 8, 9, 10, next)
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Go to 8th page from 7th using button "next" (previous, 1, ..., 6, 7, 8, ..., 10, next)', () => {
        const expectedActions = [
            {type: types.CHANGE_PAGE, newPage: 8},
        ];
        let store = mockStore({maxPage: 10, page: 7});
        let wrapper = mount(<Provider store={store}><PaginationContainer/></Provider>);
        wrapper.find('li').at(8).find('button').simulate('click');
        // (previous, 1, ..., 7, 8, 9, 10, next)
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Go to first page from 5th using button "1" (previous, 1, ..., 4, 5, 6, ..., 10, next)', () => {
        const expectedActions = [
            {type: types.CHANGE_PAGE, newPage: 1},
        ];
        let store = mockStore({maxPage: 10, page: 5});
        let wrapper = mount(<Provider store={store}><PaginationContainer/></Provider>);
        wrapper.find('li').at(1).find('button').simulate('click');
        // (previous, 1, 2, ..., 10, next)
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Go to last page from 5th using button "10" (previous, 1, ..., 4, 5, 6, ..., 10, next)', () => {
        const expectedActions = [
            {type: types.CHANGE_PAGE, newPage: 10},
        ];
        let store = mockStore({maxPage: 10, page: 5});
        let wrapper = mount(<Provider store={store}><PaginationContainer/></Provider>);
        wrapper.find('li').at(7).find('button').simulate('click');
        // (previous, 1, ..., 9, 10, next)
        expect(store.getActions()).toEqual(expectedActions);
    });
});
