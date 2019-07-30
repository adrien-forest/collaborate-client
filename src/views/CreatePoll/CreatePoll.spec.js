import React from 'react';
import { shallow, mount } from 'enzyme';

import CreatePoll from './index';
import { api } from 'utils';
import { decks, protections } from 'config.json';

jest.mock('utils');

describe('<CreatePoll> component', () => {

    let props;

    beforeEach(() => {
        props = {
            history: {
                replace: jest.fn()
            }
        };
    });

    it('should render without error', () => {
        const wrapper = shallow(<CreatePoll {...props} />);
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('#title').prop('autoFocus')).toEqual(true);
    });

    it('should display a message if no title set', () => {
        const wrapper = mount(<CreatePoll {...props} />);
        wrapper.find('form').simulate('submit');
        expect(wrapper.find('[data-test="error"]').text())
            .toEqual('Error: Please fill in all required fields');
    });

    it('should display the correct decks/protections options', () => {
        const wrapper = shallow(<CreatePoll {...props} />);
        const decksOpts = wrapper.find('[data-test="decks"] option');
        expect(decksOpts).toHaveLength(decks.length);
        decksOpts.map((node, idx) => {
            expect(node.text()).toEqual(decks[idx].join(', '));
        });
        const protectionsOpts = wrapper.find('[data-test="protections"] option');
        expect(protectionsOpts).toHaveLength(Object.keys(protections).length);
        protectionsOpts.map(node => {
            expect(node.text()).toEqual(protections[node.prop('value')]);
        });
    });

    it('should call the create poll api on submit and redirect', () => {
        const params = {
            title: 'poll title',
            description: 'poll description',
            pollId: 'pollID'
        };
        const wrapper = mount(<CreatePoll {...props} />);
        wrapper.find('#title').getDOMNode().value = params.title;
        wrapper.find('#description').getDOMNode().value = params.description;
        api.createPoll.mockImplementation(data => {
            expect(data).toEqual({
                title: params.title,
                description: params.description,
                deck: decks[0],
                protection: Object.keys(protections)[0]
            });
            return Promise.resolve({ _id: params.pollId });
        });
        props.history.replace.mockImplementation(path => {
            expect(path).toEqual(`/poll/${params.pollId}`);
        });
        wrapper.find('form').simulate('submit');
    });

});