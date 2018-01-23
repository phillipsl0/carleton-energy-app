import React, { Component } from 'react';
import { Button } from 'react-native-elements';

export default class GraphButton extends Component {
    constructor(props) {
            super(props);
    }

    render() {
        return (
            <Button
                 fontSize={10}
                 title={this.props.title}
                 borderRadius={10}
                 color={this.props.selected == this.props.index ? 'white' : '#9E9E9E'}
                 backgroundColor={this.props.selected == this.props.index ? '#0B5091' : 'white'}
                 onPress={()=>
                    this.props.callback(this.props.view, this.props.comparator, this.props.index)}
            />
        );
    }
}