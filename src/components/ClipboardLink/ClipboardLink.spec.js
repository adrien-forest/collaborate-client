import React from 'react';
import { shallow, mount } from 'enzyme';

import ClipboardLink from './index';

describe('<ClipboardLink> component', () => {

    const props = {
        link: 'link',
        label: 'label'
    };

    it('should render without error', () => {
        const wrapper = shallow(<ClipboardLink {...props} />);
        expect(wrapper).toHaveLength(1);
        expect(wrapper.contains(props.label)).toBe(true);
        expect(wrapper.find('.hidden').props().defaultValue).toEqual(props.link);
    });

    it('should call the copy api on link click', () => {
        document.execCommand = jest.fn();
        const wrapper = mount(<ClipboardLink {...props} />);
        wrapper.find('input[type="checkbox"]').simulate('click');
        expect(document.execCommand).toHaveBeenCalledWith('copy');
    });

});