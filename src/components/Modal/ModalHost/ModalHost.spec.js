import React from 'react';
import { shallow } from 'enzyme';

import ModalHost from './index';

describe('<ModalHost> component', () => {

    it('should render without error', () => {
        const props = {
            modals: [],
            closeModalAction: jest.fn()
        };
        const wrapper = shallow(<ModalHost {...props} />);
        expect(wrapper).toHaveLength(0);
    });

    it('should call appropriated modal close function', () => {
        const modalCount = 3;
        const props = {
            modals: new Array(modalCount).fill(0).map((entry, idx) => {
                return {
                    id: 'modal' + idx,
                    component: <div id={`id${idx}`}></div>,
                    isInstanciated: true
                };
            }),
            closeModalAction: jest.fn()
        };
        const wrapper = shallow(<ModalHost {...props} />);
        expect(wrapper).toHaveLength(modalCount);
        for (let i=0; i<modalCount; i++) {
            wrapper.find(`#id${i}`).props().onClose();
            expect(props.closeModalAction).toHaveBeenCalledTimes(i+1);
            expect(props.closeModalAction).toHaveBeenLastCalledWith(`modal${i}`);
        }
    });

});