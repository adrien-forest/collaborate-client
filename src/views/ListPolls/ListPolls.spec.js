import React from 'react';
import { shallow, mount } from 'enzyme';

import ListPolls from './index';
import { api } from 'utils';

import {
    defaultSortingType,
    defaultSortingDir,
    sortingTypeOpts,
    sortingDirOpts
} from 'config.json';

jest.mock('hooks');
jest.mock('utils');

describe('<ListPolls> component', () => {

    let props;

    beforeEach(() => {
        props = {
            sortingDir: defaultSortingDir,
            sortingType: defaultSortingType,
            setSortingDir: jest.fn(),
            setSortingType: jest.fn()
        };
    });

    it('should render without error', () => {
        const wrapper = shallow(<ListPolls {...props} />);
        expect(wrapper).toHaveLength(1);
    });

    it('should call the getPolls api', () => {
        api.getPolls.mockImplementation(() => Promise.resolve());
        mount(<ListPolls {...props} />);
        expect(api.getPolls).toHaveBeenCalled();
    });

    it('should display the sorting type options correctly', () => {
        const wrapper = shallow(<ListPolls {...props} />);
        const options = wrapper.find('[data-test="sortType"] option');
        expect(options).toHaveLength(sortingTypeOpts.length);
        options.map((node, idx) => {
            const { id, text } = sortingTypeOpts[idx];
            expect(node.prop('value')).toEqual(id);
            expect(node.text()).toEqual(text);
        });
    });

    it('should call the handler on select type change', () => {
        const wrapper = mount(<ListPolls {...props} />);
        const select = wrapper.find('[data-test="sortType"]');
        select.simulate('change', { target: { value: 'dateOpt' } });
        expect(props.setSortingType).toHaveBeenCalledWith('dateOpt');
    });

    it('should display the sorting dir options correctly', () => {
        const wrapper = shallow(<ListPolls {...props} />);
        const options = wrapper.find('[data-test="sortDir"] option');
        expect(options).toHaveLength(sortingDirOpts.length);
        options.map((node, idx) => {
            const { id, text } = sortingDirOpts[idx];
            expect(node.prop('value')).toEqual(id);
            expect(node.text()).toEqual(text);
        });
    });

    it('should call the handler on select dir change', () => {
        const wrapper = mount(<ListPolls {...props} />);
        const select = wrapper.find('[data-test="sortDir"]');
        select.simulate('change', { target: { value: 'ascOpt' } });
        expect(props.setSortingDir).toHaveBeenCalledWith('ascOpt');
    });

});