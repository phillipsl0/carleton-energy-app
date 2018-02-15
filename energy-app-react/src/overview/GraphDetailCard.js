import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import Graph from './../visualizations/Graph';
import { default as CustomThemes } from './../visualizations/GraphThemes';
import GraphButton from './GraphButton';
import { moderateScale, verticalScale } from './../helpers/General';

const theme = GetStyle(CurrTheme);

export default class GraphDetail extends Component {
    constructor(props) {
            super(props);
    }

    // Callback function to update parent header
    sendToParent = (buttonIndex) => {
        var views = ["day", "week", "month", "year"];
        var comparators = [7, 4, 12, 5];

        this.props.callback(views[buttonIndex-1], comparators[buttonIndex-1], buttonIndex);
    }

    getLabel = (label) => {
        // Labels for the scatter plot axes depend on the x axis
        if (label === "x") {
            switch (this.props.selected){
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
        var x = this.getLabel("x");
        var y = this.getLabel("y");


        return(
            <View style={[theme.centered]}>
                <View pointerEvents="none" style={[styles.graphContainer, theme.centered,
                    theme.translucent]}>

                 <Graph
                     theme={CustomThemes.carleton}
                     height={moderateScale(225)}
                     width={moderateScale(250)}
                     type={'scatter'}
                     xLabel={x}
                     yLabel={y}
                     graphData={this.props.data}/>

                </View>

                <View style={[theme.flexboxRow, theme.flexButtons, theme.translucent]}>
                    <GraphButton title='Day'
                        index={1}
                        callback={this.sendToParent}
                        selected={this.props.selected}/>

                    <GraphButton title='Week'
                        index={2}
                        callback={this.sendToParent}
                        selected={this.props.selected}/>

                    <GraphButton title='Month'
                        index={3}
                        callback={this.sendToParent}
                        selected={this.props.selected}/>

                    <GraphButton title='Year'
                        index={4}
                        callback={this.sendToParent}
                        selected={this.props.selected}/>

               </View>
            </View>);
    }
}

const styles = StyleSheet.create({
    graphContainer: {
        marginTop: '3%',
        marginBottom: '3%',
        paddingTop: '1%',
        paddingLeft: '3%',
        paddingRight: '5%',
//        paddingBottom: '2%',
        borderRadius: 10,
//        width: moderateScale(320)
    },

    narrow: {
        width: moderateScale(300)
    },

    subHead: {
        fontSize: 10,
        color: '#0B5091',
    },

    textContainer: {
       paddingTop: '50%',
    },
})