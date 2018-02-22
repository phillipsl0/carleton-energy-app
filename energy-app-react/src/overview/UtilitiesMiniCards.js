import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux';

import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import Utility from './Utility';

const USAGE_CARD = 1;
@connect(
    state => ({
        currentData: state.data.currentData,
        loading: state.data.loading,
    }),
    dispatch => ({
        refresh: () => dispatch({type: 'GET_GRAPH_DATA'}),
    }),
)

export default class Utilities extends Component {
    constructor(props) {
        super(props);
    }

    sendToParent = ( buttonIndex ) => {
        this.props.callback(buttonIndex);
    }

    render() {
        const theme = GetStyle(CurrTheme);
        const { refresh, loading, currentData } = this.props;
        var cardType = this.props.cardType;

        if (cardType == USAGE_CARD) {
            return (
                <View style={[theme.flexboxRow, theme.translucent, theme.centered, styles.panel]}>
                   <Utility index={1}
                       icon={"leaf"}
                       utilityType={"Total"}
                       callback={this.sendToParent}
                       selected={this.props.selected}/>
                   <Utility index={2}
                      icon={"fire"}
                      utilityType={"Heat"}
                      callback={this.sendToParent}
                      selected={this.props.selected}/>

                   <Utility index={3}
                      icon={"lightbulb-o"}
                      utilityType={"Electric"}
                      callback={this.sendToParent}
                      selected={this.props.selected}/>

                    <Utility index={4}
                       icon={"shower"}
                       utilityType={"Water"}
                       callback={this.sendToParent}
                       selected={this.props.selected}/>
                </View>
            );
        } else {
            return (
                <View style={[theme.flexboxRow, theme.translucent, theme.centered, styles.panel]}>
                   <Utility index={1}
                    icon={"leaf"}
                    utilityType={"Total"}
                    callback={this.sendToParent}
                    selected={this.props.selected}/>

                   <Utility index={2}
                    icon={"leaf"}
                    utilityType={"Wind"}
                    callback={this.sendToParent}
                    selected={this.props.selected}/>

                   <Utility index={3}
                      icon={"sun-o"}
                      utilityType={"Solar"}
                      callback={this.sendToParent}
                      selected={this.props.selected}/>

                    <Utility index={4}
                       icon={"fire"}
                       utilityType={"Geo"}
                       callback={this.sendToParent}
                       selected={this.props.selected}/>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    panel : {
        paddingBottom: '3%',
        marginLeft: '2%',
        marginRight: '2%',
        borderRadius: 10
    }
})