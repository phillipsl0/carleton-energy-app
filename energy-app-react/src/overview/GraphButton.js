/* GraphButton.js
 * Written by Liv Phillips for Energy App Comps, 2018
 * Returns a button for Graph card.
 */

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import CurrFont from './../styling/CurrentFont';

const defaultFont = CurrFont+'-regular';
const defaultFontBold = CurrFont+'-bold';

export default class GraphButton extends Component {
    constructor(props) {
            super(props);
    }

    render() {
        return (
            <Button
                 fontSize={10}
                 fontFamily={defaultFont}
                 title={this.props.title}
                 borderRadius={10}
                 color={this.props.selected == this.props.index ? 'white' : '#9E9E9E'}
                 backgroundColor={this.props.selected == this.props.index ? '#0B5091' : 'white'}
                 onPress={()=>
                    this.props.callback(this.props.index)}
            />
        );
    }
}