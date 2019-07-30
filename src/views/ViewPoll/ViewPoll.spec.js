import React from 'react';
import { mount } from 'enzyme';

import ViewPoll from './index';
import { api, batchUpdates } from 'utils';

jest.mock('utils');
jest.mock('hooks');
jest.mock('components/VotesBarsChart', () => () => <div></div>)
jest.mock('components/VotesPieChart', () => () => <div></div>)
jest.mock('components/PollDetails', () => () => <div></div>)

describe('<ViewPoll> component', () => {

    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            match: { params: { id: 'pollID' } },
            openConfirm: jest.fn(),
            history: {
                replace: jest.fn(),
                goBack: jest.fn()
            },
            user: {}
        };

        api.getPoll.mockImplementation(id => Promise.resolve({ _id: id }));

        batchUpdates.mockImplementation(() => {});

        wrapper = mount(<ViewPoll {...props} />);
    });

    it('should render without error', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('should call the getPoll api', () => {
        expect(api.getPoll).toHaveBeenCalled();
        expect(api.getPoll).toHaveBeenLastCalledWith('pollID');
    });

    it('should go back on back button click', () => {
        wrapper.find('[data-test="back"]').simulate('click');
        expect(props.history.goBack).toHaveBeenCalled();
    });

});