import React from 'react';
import { shallow } from 'enzyme';

import Header from './index';

describe('<Header> component', () => {

    let props;

    beforeEach(() => {
        props = {
            openSigninModal: jest.fn(),
            openSignupModal: jest.fn(),
            signoutAction: jest.fn()
        };
    });

    it('renders without error', () => {
        const wrapper = shallow(<Header {...props} />);
        expect(wrapper).toHaveLength(1);
    });

    it('render the correct options when no user', () => {
        const wrapper = shallow(<Header {...props} />);
        expect(wrapper.find('[data-test="sign-in"]')).toHaveLength(1);
        expect(wrapper.find('[data-test="sign-up"]')).toHaveLength(1);
        expect(wrapper.find('[data-test="sign-out"]')).toHaveLength(0);
    });

    it('render the correct options when given a user', () => {
        const user = { username: 'adrien' };
        const wrapper = shallow(<Header {...props} user={user} />);
        expect(wrapper.find('[data-test="sign-in"]')).toHaveLength(0);
        expect(wrapper.find('[data-test="sign-up"]')).toHaveLength(0);
        expect(wrapper.find('[data-test="sign-out"]')).toHaveLength(1);
        expect(wrapper.find('[data-test="greetings"]').text())
            .toEqual(`Hi, ${user.username}!`);
    });

    it('calls the proper functions when trying to sign-in/sign-up', () => {
        const wrapper = shallow(<Header {...props} />);
        wrapper.find('[data-test="sign-in"]').simulate('click');
        expect(props.openSigninModal).toHaveBeenCalled();
        wrapper.find('[data-test="sign-up"]').simulate('click');
        expect(props.openSignupModal).toHaveBeenCalled();
    });

    it('calls the sign out prop function when clicking sign out', () => {
        const user = { username: 'adrien' };
        const wrapper = shallow(<Header {...props} user={user} />);
        wrapper.find('[data-test="sign-out"]').simulate('click');
        expect(props.signoutAction).toHaveBeenCalled();
    });

});