import React from 'react';
import { shallow } from 'enzyme';

import PollDetails from './index';
import { formatDate } from 'utils';
import { protections } from 'config.json';

describe('<PollDetails> component', () => {

    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            poll: {
                _id: 'pollID',
                title: 'poll title',
                description: 'poll description',
                createdAt: Date.now(),
                protection: 'AUTHENTICATED',
                votesCount: 10,
                owns: true
            },
            onDelete: jest.fn(),
            openSignin: jest.fn(),
            openSignup: jest.fn()
        };

        wrapper = shallow(<PollDetails {...props} />);
    });

    it('should render without error', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('should display the title correctly', () => {
        const { poll: { title, votesCount} } = props;
        expect(wrapper.find('[data-test="title"]').text())
            .toEqual(`${title} |${votesCount} votes`);
    });

    it('should display the date correctly', () => {
        expect(wrapper.find('[data-test="date"]').text())
            .toEqual(formatDate(props.poll.createdAt));
    });

    it('should display the description if any', () => {
        expect(wrapper.contains(props.poll.description)).toEqual(true);
    });

    it('should display the delete btn/call delete func if user owns the poll', () => {
        const btn = wrapper.find('[data-test="delete"]');
        expect(btn).toHaveLength(1);
        btn.simulate('click');
        expect(props.onDelete).toHaveBeenCalled();
        delete props.poll.owns;
        wrapper = shallow(<PollDetails {...props} />);
        expect(wrapper.find('[data-test="delete"]')).toHaveLength(0);
    });

    it('should display the signin/signup + do click calls for auth protected polls', () => {
        expect(wrapper.find('[data-test="need-signin"]')).toHaveLength(1);
        wrapper.find('[data-test="signin"]').simulate('click');
        expect(props.openSignin).toHaveBeenCalled();
        wrapper.find('[data-test="signup"]').simulate('click');
        expect(props.openSignup).toHaveBeenCalled();
        props.user = {};
        wrapper = shallow(<PollDetails {...props} />);
        expect(wrapper.find('[data-test="need-signin"]')).toHaveLength(0);
        delete props.user;
        props.poll.protection = 'NONE';
        wrapper = shallow(<PollDetails {...props} />);
        expect(wrapper.find('[data-test="need-signin"]')).toHaveLength(0);
    });

    it('should show the protection text for protected polls', () => {
        expect(wrapper.find('[data-test="protection"]').text())
            .toMatch(protections[props.poll.protection]);
        props.poll.protection = 'IP';
        wrapper = shallow(<PollDetails {...props} />);
        expect(wrapper.find('[data-test="protection"]').text())
            .toMatch(protections[props.poll.protection]);
        props.poll.protection = 'NONE';
        wrapper = shallow(<PollDetails {...props} />);
        expect(wrapper.find('[data-test="protection"]')).toHaveLength(0);
    });

});