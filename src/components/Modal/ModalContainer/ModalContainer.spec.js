import React from 'react';
import { shallow } from 'enzyme';

import ModalContainer from './index';

describe('<ModalContainer> component', () => {

    const props = {
        onClose: jest.fn()
    };

    it('should render without error', () => {
        const Child = () => <div></div>;
        const wrapper = shallow(
            <ModalContainer {...props}>
                <Child />
            </ModalContainer>
        );
        expect(wrapper).toHaveLength(1);
        expect(wrapper.contains(<Child />)).toEqual(true);
    });

    it('should call the onClose func', () => {
        const wrapper = shallow(<ModalContainer {...props} />);
        wrapper.find('[data-test="close"]').simulate('click');
        expect(props.onClose).toHaveBeenCalled();
    });

});