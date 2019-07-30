import React from 'react';
import { shallow } from 'enzyme';

import VotesPieChart from './index';

describe('<VotesPieChart> component', () => {

    let props;

    beforeEach(() => {
        props = {
            poll: {
                votesCount: 21,
                votes: [
                    { card: 'B', count: 9 },
                    { card: 'C', count: 7 },
                    { card: 'A', count: 4 },
                    { card: 'D', count: 1 }
                ]
            }
        };
    });

    it('should render without error', () => {
        const wrapper = shallow(<VotesPieChart {...props} />);
        expect(wrapper).toHaveLength(1);
    });

    it('should display a message if no votes', () => {
        props.poll.votesCount = 0;
        const wrapper = shallow(<VotesPieChart {...props} />);
        expect(wrapper.contains('No votes yet.')).toEqual(true);
    });

    it('should display the correct number of slices', () => {
        const wrapper = shallow(<VotesPieChart {...props} />);
        const slices = wrapper.find('[data-test="slice"]');
        expect(slices).toHaveLength(props.poll.votes.length);
        const { poll: { votes, votesCount } } = props;
        slices.map((node, idx) => {
            const { card, count } = votes[idx];
            const percent = count * 100 / votesCount;
            expect(node.find('title').text())
                .toEqual(`Card ‘${card}‘ - ${count} votes (${percent.toFixed(1)}%)`);
        });
    });

});