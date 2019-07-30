import React from 'react';
import { shallow } from 'enzyme';

import Form from './index';

describe('<Form> component', () => {

    it('should render without error', () => {
        const Child = () => <div></div>;
        const wrapper = shallow(
            <Form>
                <Child />
            </Form>
        );
        expect(wrapper).toHaveLength(1);
        expect(wrapper.contains(<Child />)).toEqual(true);
    });

    it('should call the submit func on form submit', () => {
        const onSubmit = jest.fn();
        const wrapper = shallow(<Form onSubmit={onSubmit} />);
        wrapper.find('form').simulate('submit');
        expect(onSubmit).toHaveBeenCalled();
    });

});