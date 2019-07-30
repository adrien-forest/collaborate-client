import React from 'react';
import { shallow } from 'enzyme';

import VotesBarChart from './index';

describe('<VotesBarChart> component', () => {

    let props;

    beforeEach(() => {
        props = {
            poll: {
                votes: [
                    { card: 'A', count: 9 },
                    { card: 'B', count: 4 },
                    { card: 'C', count: 2 },
                    { card: 'D', count: 1 }
                ],
                votesCount: 16
            }
        };
    });

    it('should render without error', () => {
        const wrapper = shallow(<VotesBarChart {...props} />);
        expect(wrapper).toHaveLength(1);
    });

    it('should display a message if no votes yet', () => {
        props.poll.votes = [];
        const wrapper = shallow(<VotesBarChart {...props} />);
        expect(wrapper.contains('No votes yet')).toEqual(true);
    });

    it('should render the chart data correctly', () => {
        const { poll: { votes, votesCount } } = props;
        const wrapper = shallow(<VotesBarChart {...props} />);
        const blocks = wrapper.find('[data-test="block"]');
        expect(blocks).toHaveLength(votes.length);
        blocks.map((node, idx) => {
            const { card, count } = votes[idx];
            const percent = count * 100 / votesCount;
            expect(node.parent().prop('style').width).toEqual(`${percent}%`);
            expect(node.prop('title'))
                .toEqual(`Card ‘${card}‘ - ${count} votes (${percent.toFixed(1)}%)`);
        });
    });

});