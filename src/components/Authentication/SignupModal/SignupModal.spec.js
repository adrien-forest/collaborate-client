import React from 'react';
import { shallow, mount } from 'enzyme';

import SignupModal from './index';

describe('<SignupModal> component', () => {

    let props;

    beforeEach(() => {
        props = {
            signUpAction: jest.fn(),
            onClose: jest.fn()
        };
    });

    it('should render without error', () => {
        const wrapper = shallow(<SignupModal {...props} />);
        expect(wrapper).toHaveLength(1);
    });

    it('should not call the signup action if no username/pwd/rep entered', () => {
        const fields = {
            username: 'adrien',
            password: 'passwd'
        };
        const wrapper = mount(<SignupModal {...props} />);
        wrapper.find('#username').getDOMNode().value = fields.username;
        wrapper.find('form').simulate('submit');
        expect(props.signUpAction).not.toHaveBeenCalled();
        wrapper.find('#username').getDOMNode().value = '';
        wrapper.find('#password').getDOMNode().value = fields.password;
        wrapper.find('form').simulate('submit');
        expect(props.signUpAction).not.toHaveBeenCalled();
        wrapper.find('#username').getDOMNode().value = fields.username;
        wrapper.find('#password').getDOMNode().value = fields.password;
        wrapper.find('#repPassword').getDOMNode().value = 'pwd';
        wrapper.find('form').simulate('submit');
        expect(props.signUpAction).not.toHaveBeenCalled();
    });

    it('should call the signup action if username/pwd entered', () => {
        const fields = {
            username: 'adrien',
            password: 'passwd'
        };
        const wrapper = mount(<SignupModal {...props} />);
        wrapper.find('#username').getDOMNode().value = fields.username;
        wrapper.find('#password').getDOMNode().value = fields.password;
        wrapper.find('#repPassword').getDOMNode().value = fields.password;
        wrapper.find('form').simulate('submit');
        expect(props.signUpAction).toHaveBeenCalledWith({
            username: fields.username,
            password: fields.password
        });
    });

    it('should call the close func when a user prop is received', () => {
        const wrapper = mount(<SignupModal {...props} />);
        expect(props.onClose).not.toHaveBeenCalled();
        wrapper.setProps({ user: {} });
        expect(props.onClose).toHaveBeenCalled();
    });

});