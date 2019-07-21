import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import GuestBook from '../Components/GuestBook';
import Guest from '../Components/Guest';
import Header from '../Components/Header';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '../store/reducer';

const store = createStore(reducer);

Enzyme.configure({adapter: new Adapter()});

describe('<App />', () => {
    it('renders One <Header /> component', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find(Header)).to.have.lengthOf(1);
    });

});

describe('<GuestBook />', () => {
    it('renders an Guest', () => {
        const wrapper = shallow(<Provider store={store}><GuestBook/></Provider>);
        expect(wrapper.find(Guest)).to.have.lengthOf(0);
    });
});


