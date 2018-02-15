import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { GetStyle } from './../styling/Themes';
import CurrTheme from './../styling/CurrentTheme';
import Graph from './../visualizations/Graph';
import { default as CustomThemes } from './../visualizations/GraphThemes';
import GraphButton from './GraphButton';
import { moderateScale, verticalScale } from './../helpers/Scaling';

export default class GraphDetail extends Component {
    constructor(props) {
            super(props);
    }

    sendToParent = (buttonView, buttonComparator, buttonIndex) => {
        this.props.callback(buttonView, buttonComparator, buttonIndex);
    }

    getLabel = (label) => {
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
            return "BTUs (aggregate " + verb + " in thousands)";
//            switch (this.props.selected){
//                case 1:
//                    return "Day of Week";
//                case 2:
//                    return "Week";
//                case 3:
//                    return "Month";
//                case 4:
//                    return "Year";
//                default:
//                    return "";
//            }
        }

    }

    render() {
        const themeStyles = GetStyle(CurrTheme);
        console.log(this.props.selected);
        var x = this.getLabel("x");
        var y = this.getLabel("y");


        return(
            <View style={[themeStyles.centered]}>
                <View pointerEvents="none" style={[styles.graphContainer, themeStyles.centered,
                    themeStyles.translucent]}>
                 <Graph
                     theme={CustomThemes.carleton}
                     height={verticalScale(250)}
                     width={moderateScale(300)}
                     type={'scatter'}
                     xLabel={x}
                     yLabel={y}
                     overlap={true}
                     graphData={this.props.data}/>
                </View>

                <View style={[themeStyles.flexboxRow, themeStyles.flexButtons, themeStyles.translucent]}>
                    <GraphButton title='Day'
                        view='day'
                        comparator={7}
                        index={1}
                        callback={this.sendToParent}
                        selected={this.props.selected}/>

                    <GraphButton title='Week'
                        view='week'
                        comparator={4}
                        index={2}
                        callback={this.sendToParent}
                        selected={this.props.selected}/>

                    <GraphButton title='Month'
                        view='month'
                        comparator={12}
                        index={3}
                        callback={this.sendToParent}
                        selected={this.props.selected}/>

                    <GraphButton title='Year'
                        view='year'
                        comparator={5}
                        index={4}
                        callback={this.sendToParent}
                        selected={this.props.selected}/>

               </View>
            </View>);
    }
}

const styles = StyleSheet.create({
    graphContainer: {
        marginTop: '5%',
        marginBottom: '5%',
        paddingTop: '5%',
        paddingLeft: '3%',
        paddingRight: '3%',
        paddingBottom: '2%',
        borderRadius: 10,
        width: moderateScale(325)
    },
    subHead: {
        fontSize: 10,
        color: '#0B5091',
    },
    verticalText: {
        transform: [{ rotate: '90deg'}],
    },
    textContainer: {
       paddingTop: '50%',
    },
    narrow: {
        width: moderateScale(300)
    }
})