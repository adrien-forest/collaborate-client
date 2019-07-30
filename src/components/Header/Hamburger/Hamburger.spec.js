import React from 'react';
import { shallow, mount } from 'enzyme';

import Hamburger from './index';

import styles from './Hamburger.module.css';

describe('<Hamburger> component', () => {

    let props;

    beforeEach(() => {
        props = {
            onChange: jest.fn(),
            show: false
        };
    });

    it('should render without error', () => {
        const wrapper = shallow(<Hamburger />);
        expect(wrapper).toHaveLength(1);
    });

    it('should have the correct state after clicking the hamburger menu - show false', () => {
        const wrapper = mount(<Hamburger {...props} show={false} />);
        let btn = wrapper.find(`[data-test="hamburger"]`);
        btn.simulate('click');
        expect(props.onChange).toHaveBeenCalledWith(true);
        btn = wrapper.find('[data-test="hamburger"]');
        expect(btn.hasClass('enabled')).toBe(true);
        btn.simulate('click');
        expect(props.onChange).toHaveBeenCalledTimes(2);
        btn = wrapper.find('[data-test="hamburger"]');
        expect(btn.hasClass('enabled')).toBe(false);
    });

    it('should have the correct state after clicking the hamburger menu - show true', () => {
        const wrapper = mount(<Hamburger {...props} show={true} />);
        let btn = wrapper.find('[data-test="hamburger"]');
        expect(btn.hasClass('enabled')).toBe(true);
        btn.simulate('click');
        expect(props.onChange).toHaveBeenCalledWith(false);
        btn = wrapper.find('[data-test="hamburger"]');
        expect(btn.hasClass('enabled')).toBe(false);
        btn.simulate('click');
        expect(props.onChange).toHaveBeenCalledTimes(2);
        btn = wrapper.find('[data-test="hamburger"]');
        expect(btn.hasClass('enabled')).toBe(true);
    });

});