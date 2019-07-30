import React from 'react';
import { shallow } from 'enzyme';

import VoteBar from './index';

describe('<VoteBar> component', () => {

    const props = {
        card: 'King',
        count: 4,
        totalVotes: 15,
        color: [125, 126, 127]
    };

    it('should render without error', () => {
        const wrapper = shallow(<VoteBar {...props} />);
        expect(wrapper).toHaveLength(1);
    });

    it('should display the bar and its data correctly', () => {
        const { card, count, totalVotes, color: [r, g, b] } = props;
        const wrapper = shallow(<VoteBar {...props} />);
        expect(wrapper.contains(card)).toEqual(true);
        const bar = wrapper.find('[data-test="bar"]');
        expect(bar).toHaveLength(1);
        const percent = count * 100 / totalVotes;
        expect(bar.prop('style').width).toEqual(`${percent}%`);
        expect(bar.prop('title')).toEqual(`${count} votes`);
        expect(wrapper.contains(`${count} (${percent.toFixed(1)}%)`)).toEqual(true);
        expect(bar.childAt(0).prop('style').backgroundColor).toEqual(`rgb(${r},${g},${b})`);
    });

});