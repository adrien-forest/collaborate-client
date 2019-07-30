import React from 'react';
import { shallow, mount } from 'enzyme';

import SigninModal from './index';

describe('<SigninModal> component', () => {

    let props;

    beforeEach(() => {
        props = {
            signInAction: jest.fn(),
            onClose: jest.fn()
        };
    });

    it('should render without error', () => {
        const wrapper = shallow(<SigninModal {...props} />);
        expect(wrapper).toHaveLength(1);
    });

    it('should not call the signin action if no username/pwd entered', () => {
        const fields = {
            username: 'adrien',
            password: 'passwd'
        };
        const wrapper = mount(<SigninModal {...props} />);
        wrapper.find('#username').getDOMNode().value = fields.username;
        wrapper.find('form').simulate('submit');
        expect(props.signInAction).not.toHaveBeenCalled();
        wrapper.find('#username').getDOMNode().value = '';
        wrapper.find('#password').getDOMNode().value = fields.password;
        wrapper.find('form').simulate('submit');
        expect(props.signInAction).not.toHaveBeenCalled();
    });

    it('should call the signin action if username/pwd entered', () => {
        const fields = {
            username: 'adrien',
            password: 'passwd'
        };
        const wrapper = mount(<SigninModal {...props} />);
        wrapper.find('#username').getDOMNode().value = fields.username;
        wrapper.find('#password').getDOMNode().value = fields.password;
        wrapper.find('form').simulate('submit');
        expect(props.signInAction).toHaveBeenCalledWith(fields.username, fields.password);
    });

    it('should call the close func when a user prop is received', () => {
        const wrapper = mount(<SigninModal {...props} />);
        expect(props.onClose).not.toHaveBeenCalled();
        wrapper.setProps({ user: {} });
        expect(props.onClose).toHaveBeenCalled();
    });

});