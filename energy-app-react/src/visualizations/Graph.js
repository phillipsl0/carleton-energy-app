/* Graph.js
 * Written by Liv Phillips for Energy App Comps, 2018
 * Wrapper for Victory Graphs, so that the same styling & structure can easily be used in multiple places,
 * without all of the code repetition.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Platform } from 'react-native'
import Svg from "react-native-svg";
import { VictoryPie, VictoryBar, VictoryChart, VictoryScatter,
         VictoryAxis, VictoryLegend, VictoryLabel } from "victory-native";
import { connect } from 'react-redux';

import { moderateScale, verticalScale} from './../helpers/General';
import { GetStyle } from './../styling/Themes'
import CurrTheme from './../styling/CurrentTheme'
import { default as CustomThemes } from './GraphThemes'
import Comparator from './../helpers/Comparators';

const theme = GetStyle(CurrTheme);

@connect(
    state => ({
        ui: state.ui
    }),
)
class Graph extends Component {
    // Scrapes legend information from the array of data
    getLegendData = (data) => {
        var result = new Array(data.length);

        for (var i = 0; i < data.length; i++) {
            var name = {};
            name["name"] = data[i]["x"];
            result[i] = name;
        }

        return result;
    }

    render() {
        const { ui } = this.props;
        const { width, height } = ui.layout;

        // Returns correct type of graph/chart depending on input
        switch (this.props.type) {
            case "pie":
                if (this.props.legend) {
                    var legendData = this.getLegendData(this.props.graphData);

                    // Legends need to know what colors to use -> colorScheme here is based on Carleton Theme
                    var colorScheme = ["#0B5091", "#447BB0", "#001324", "#98BDE1"];

                    // ColorScheme must be same length as data, so slice it to fit
                    colorScheme = colorScheme.slice(0, this.props.graphData.length);

                    var legendHeight = moderateScale(26 * this.props.graphData.length);
                    var legendFont = moderateScale(12);
                }

                return (
                    <View style={[theme.flexboxRow]}>

                    <VictoryPie
                        labels={() => null}
                        theme={this.props.theme}
                        height={moderateScale(this.props.height)}
                        innerRadius={moderateScale(this.props.innerRadius)}
                        width={moderateScale(this.props.width)}
                        padding={{ top: 0, bottom: 0, left: 10, right: 10 }}
                        data={this.props.graphData}/>

                    {this.props.legend && <VictoryLegend
                         colorScale={colorScheme}
                         height={legendHeight}
                         style={{labels: {fontSize: legendFont}}}
                         width={moderateScale(130)}
                         title=""
                         data={legendData}/>
                    }

                     </View>
                );

                break;

            case "bar":
                return (
                    <View style={{width: moderateScale(250), height: moderateScale(225) }}>
                    <VictoryChart
                        height={this.props.height}
                        width={this.props.width}
                        theme={this.props.theme}
                        padding={{ top: 20, bottom: 50, left: 60, right: 60}}
                        domainPadding={15}>

                        <VictoryBar
                            data={this.props.graphData}/>

                    </VictoryChart>
                    </View>
                );

                break;

            case "scatter":
                // Scatter plot needs axes in order to properly render units/time period
                var dx = 0;
                var dy = 0;


                if (Platform.OS == 'android') {
                    dx = verticalScale(30);
                    dy = verticalScale(-300);
                } else {
                    dx = verticalScale(15);
                    dy = verticalScale(-110);
                }

                if (height < 600) {
                    dy = verticalScale(dy-10);
                }



                return (
                    <View style={{width: moderateScale(this.props.width), height: moderateScale(this.props.height), alignItems: 'flex-end' }}>
                    <VictoryChart
                        height={moderateScale(this.props.height)}
                        width={moderateScale(this.props.width)}
                        theme={this.props.theme}
                        padding={{ top: moderateScale(30), bottom: moderateScale(50),
                                   left: moderateScale(40), right: moderateScale(10)}}
                        domainPadding={10}>

                        <VictoryScatter
                            size={5}
                            data={this.props.graphData}/>


                        <VictoryAxis crossAxis
                            label={this.props.xLabel}
                            fixLabelOverlap={true}/>

                        <VictoryAxis crossAxis dependentAxis
                            label={this.props.yLabel}
                            fixLabelOverlap={true}
                            axisLabelComponent={<VictoryLabel dx={dx} dy={dy}/>}/>

                    </VictoryChart>
                    </View>
                );

                break;
            default:
                // Return blank
                return (
                    <VictoryChart>
                    <VictoryBar/>
                    </VictoryChart>
                );
        }
    }
}

// Define default properties in case user does not pass them in
Graph.defaultProps = {
    type: 'pie',
    graphData: [{y:  8, x: "Electricity"},
                 {y: 7, x: "Water"},
                 {y: 16, x: "Heat/AC"}],
    theme: CustomThemes.grayscale,
    height: 100,
    width: 110,
    innerRadius: 20,
    legend: true,
}

// Define the types expected by each property
Graph.propTypes = {
    type: PropTypes.string,
    graphData: PropTypes.any,
    theme: PropTypes.object,
    height: PropTypes.number,
    width: PropTypes.number,
    innerRadius: PropTypes.number,
    legend: PropTypes.bool
}

export default Graph