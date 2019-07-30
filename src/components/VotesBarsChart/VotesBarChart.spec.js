import React from 'react';
import { shallow } from 'enzyme';

import VotesBarChart from './index';
import { api } from 'utils';

jest.mock('utils');

describe('<VotesBarChart> component', () => {

    let props;

    beforeEach(() => {
        props = {
            poll: {
                _id: 'pollID',
                votesCount: 19,
                votes: [
                    { card: 'B', count: 5 },
                    { card: 'A', count: 2 },
                    { card: 'King', count: 8 },
                    { card: 'C', count: 4 }
                ],
                protection: 'NONE'
            },
            order: ['King', 'B', 'C', 'A', 'D']
        };
    });

    it('should render without error', () => {
        const wrapper = shallow(<VotesBarChart {...props} />);
        expect(wrapper).toHaveLength(1);
    });

    it('should render the correct amount of bars', () => {
        const wrapper = shallow(<VotesBarChart {...props} />);
        const bars = wrapper.find('[data-test="bar"]');
        expect(bars).toHaveLength(props.order.length);
    });

    it('should allow for voting if possible', () => {
        const wrapper = shallow(<VotesBarChart {...props} />);
        const bars = wrapper.find('[data-test="vote"]');
        let idx = 0;
        api.votePoll.mockImplementation((pollId, card) => {
            expect(pollId).toEqual(props.poll._id);
            expect(card).toEqual(props.order[idx++]);
            return Promise.resolve();
        });
        bars.map(node => node.props().onClick());
    });

    it('should not allow for vote on same value', () => {
        props.poll.voted = 'King';
        const wrapper = shallow(<VotesBarChart {...props} />);
        const bars = wrapper.find('[data-test="vote"]');
        expect(bars).toHaveLength(props.order.length - 1);
    });

    it('should not allow for vote if authenticated poll and no user', () => {
        props.poll.protection = 'AUTHENTICATED';
        let wrapper = shallow(<VotesBarChart {...props} />);
        expect(wrapper.find('[data-test="vote"]')).toHaveLength(0);
        props.user = {};
        wrapper = shallow(<VotesBarChart {...props} />);
        expect(wrapper.find('[data-test="vote"]')).toHaveLength(props.order.length);
    });

});