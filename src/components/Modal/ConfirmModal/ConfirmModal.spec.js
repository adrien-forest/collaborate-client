import React from 'react';
import { shallow, mount } from 'enzyme';

import ConfirmModal from './index';

describe('<ConfirmModal> component', () => {

    let props;

    beforeEach(() => {
        props = {
            onConfirm: jest.fn(),
            onCancel: jest.fn(),
            onClose: jest.fn()
        };
    });

    it('should render without error', () => {
        const wrapper = shallow(<ConfirmModal {...props} />);
        expect(wrapper).toHaveLength(1);
    });

    it('should display the title and message if specified', () => {
        const extra = {
            title: 'Title',
            message: 'Message'
        };
        const wrapper = shallow(<ConfirmModal {...props} {...extra} />);
        expect(wrapper.contains(extra.title)).toBe(true);
        expect(wrapper.contains(extra.message)).toBe(true);
    });

    it('should call confirm and close funcs on form submit', () => {
        const wrapper = mount(<ConfirmModal {...props} />);
        wrapper.find('form').simulate('submit');
        expect(props.onConfirm).toHaveBeenCalled();
        expect(props.onClose).toHaveBeenCalled();
        expect(props.onCancel).not.toHaveBeenCalled();
    });

    it('should call close func on form reset', () => {
        const wrapper = shallow(<ConfirmModal {...props} />);
        wrapper.find('input[type="reset"]').simulate('click');
        expect(props.onCancel).toHaveBeenCalled();
        expect(props.onClose).toHaveBeenCalled();
        expect(props.onConfirm).not.toHaveBeenCalled();
    });

});