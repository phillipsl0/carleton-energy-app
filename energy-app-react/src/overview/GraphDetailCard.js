import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';

import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import Graph from './../visualizations/Graph';
import { default as CustomThemes } from './../visualizations/GraphThemes';
import GraphButton from './GraphButton';
import Utilities from './UtilitiesMiniCards';
import { moderateScale, verticalScale } from './../helpers/General';

const theme = GetStyle(CurrTheme);

@connect(
    state => ({
        ui: state.ui
    }),
)
export default class GraphDetail extends Component {
    constructor(props) {
            super(props);
    }

    // Callback function to update parent header
    sendToParent = (buttonIndex) => {
        var views = ["day", "week", "month", "year"];
        var comparators = [7, 4, 12, 5];

        this.props.graphCallback(views[buttonIndex-1], comparators[buttonIndex-1], buttonIndex);
    }

    scopeCallbackUtilities = (buttonIndex) => {
        this.props.utilityCallback(buttonIndex)
    }

    getLabel = (label) => {
        // Labels for the scatter plot axes depend on the x axis
        if (label === "x") {
            switch (this.props.timeSelected){
                case 1:
                    return "Day of Week";
                case 2:
                    return "Week";
                case 3:
                    return "Month";
                case 4:
                    return "Year";
                default:
                    return "";
            }
        } else {
            var verb = this.props.type == 1 ? "usage" : "generation";
            return "MWh";
        }

    }

    render() {
        const { ui } = this.props;
        const { width, height } = ui.layout;
        var utilities = ["Gas", "Electric", "Heat", "Water"];
        var generators = ["Wind", "Solar", "Geothermal"]
        var graphWidth = 250;
        var graphHeight = 225;
        var marginBottom = '3%';
        var marginTop = '4%';

        var x = this.getLabel("x");
        var y = this.getLabel("y");

        if (height < 600) {
            graphWidth = 250;
            graphHeight = 200;
            marginBottom = '5%';
            marginTop = '5%';
        }

        return(
            <View style={[theme.centered, {flex:1}]}>
                <View pointerEvents="none" style={[styles.graphContainer, theme.centered,
                    theme.translucent, { marginBottom: marginBottom, marginTop: marginTop }]}>

                 <Graph
                     theme={CustomThemes.carleton}
                     height={moderateScale(graphHeight)}
                     width={moderateScale(graphWidth)}
                     type={'scatter'}
                     xLabel={x}
                     yLabel={y}
                     graphData={this.props.data}/>

                </View>

                <View style={[theme.flexboxRow, theme.flexButtons, theme.translucent, {marginBottom: '3%'} ]}>
                    <GraphButton title='Day'
                        index={1}
                        callback={this.sendToParent}
                        selected={this.props.timeSelected}/>

                    <GraphButton title='Week'
                        index={2}
                        callback={this.sendToParent}
                        selected={this.props.timeSelected}/>

                    <GraphButton title='Month'
                        index={3}
                        callback={this.sendToParent}
                        selected={this.props.timeSelected}/>

                    <GraphButton title='Year'
                        index={4}
                        callback={this.sendToParent}
                        selected={this.props.timeSelected}/>

               </View>
               <Utilities callback={this.scopeCallbackUtilities}
                  cards={this.props.cardType == 1 ? utilities : generators}
                  cardType={this.props.type}
                  selected={this.props.utilitySelected}/>
            </View>);
    }
}

const styles = StyleSheet.create({
    graphContainer: {
        marginTop: '5%',
        paddingTop: '1%',
        paddingLeft: '3%',
        paddingRight: '5%',
        borderRadius: 10,
        ...Platform.select({
            android: {
                marginTop: '2%',
                marginBottom: '3%',
            }
        })
    },

    subHead: {
        fontSize: 10,
        color: '#0B5091',
    },

    textContainer: {
       paddingTop: '50%',
    },
})