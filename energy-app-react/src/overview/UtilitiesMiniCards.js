import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'

import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import Utility from './Utility';

export default class Utilities extends Component {
    constructor(props) {
        super(props);
    }

    sendToParent = ( buttonIndex ) => {
            this.props.callback(buttonIndex);
    }

    render() {
        const themeStyles = GetStyle(CurrTheme);
        return(
        <View style={[themeStyles.singleView, themeStyles.shadowed]}>
             <View style={[themeStyles.flexboxRow, styles.shiftLeft]}>
               <Utility index={5}
                    icon={"fire"}
                    utilityType={"Gas"}
                    number={'151'}
                    unit={"thm"}
                    callback={this.sendToParent}
                    selected={this.props.selected}/>

               <Utility index={6}
                  icon={"lightbulb-o"}
                  utilityType={"Electric"}
                  number={'61,178'}
                  unit={"kWh"}
                  callback={this.sendToParent}
                  selected={this.props.selected}/>

            </View>

            <View style={[themeStyles.flexboxRow, styles.shiftLeft]}>
                <Utility index={7}
                   icon={"thermometer"}
                   utilityType={"Heat"}
                   number={'6,027,397'}
                   unit={"kBTU"}
                   callback={this.sendToParent}
                   selected={this.props.selected}/>

                <Utility index={8}
                   icon={"shower"}
                   utilityType={"Water"}
                   number={'676,684'}
                   unit={"gal"}
                   callback={this.sendToParent}
                   selected={this.props.selected}/>
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
    shiftLeft: {
        marginLeft: '6%',
    }
})