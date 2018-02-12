import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions, Platform } from 'react-native'
import { VictoryPie, VictoryBar, VictoryChart, VictoryTheme,
         VictoryScatter, VictoryAxis, VictoryLegend, VictoryLabel, VictoryContainer } from "victory-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { scale, moderateScale, verticalScale} from './../helpers/Scaling';
import { GetStyle } from './../styling/Themes'
import CurrTheme from './../styling/CurrentTheme'
import { default as CustomThemes } from './GraphThemes'
import Comparator from './../helpers/Comparators';

class Graph extends Component {
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
        const themeStyles = GetStyle(CurrTheme);

        if (this.props.type=='pie') {
            var legendData = this.getLegendData(this.props.graphData);
            var colorScheme = ["#0B5091", "#447BB0", "#001324", "#98BDE1"];
            colorScheme = colorScheme.slice(0, this.props.graphData.length);
            var legendHeight = moderateScale(26 * this.props.graphData.length);
            var legendFont = moderateScale(12);

            return (
                <View style={[{width: moderateScale(200), height: verticalScale(120)},
                        themeStyles.flexboxRow]}>
                <VictoryPie
                    labels={() => null}
                    theme={this.props.theme}
                    height={moderateScale(this.props.height)}
                    innerRadius={moderateScale(this.props.innerRadius)}
                    width={moderateScale(this.props.width)}
                    padding={{ top: 0, bottom: 0, left: 10, right: 10 }}
                    data={this.props.graphData}/>
                {this.props.legend &&
                    <VictoryLegend
                     colorScale={colorScheme}
                     height={legendHeight}
                     style={{labels: {fontSize: legendFont}}}
                     width={moderateScale(130)}
                     title=""
                     data={legendData}/>
                 }
                 {!this.props.legend &&
                    <Comparator
                     width={moderateScale(150)}
                     height={moderateScale(30 * 3)}
                     data={this.props.graphData}
                     unit={'kWh'}/>
                 }
                 </View>
                 )
//

        } else if (this.props.type=='bar') {
            return (
                <VictoryChart
                    height={this.props.height}
                    width={this.props.width}
                    theme={this.props.theme}
                    padding={{ top: 20, bottom: 50, left: 60, right: 60}}
                    domainPadding={15}>
                    <VictoryBar
                        data={this.props.graphData}/>
                </VictoryChart>
            )
        } else if (this.props.type=='scatter'){
            return (
                <VictoryChart
                    height={this.props.height}
                    width={this.props.width}
                    theme={this.props.theme}
                    padding={{ top: 10, bottom: 40, left: 60, right: 40}}
                    domainPadding={10}>
                    <VictoryScatter
                        size={5}
                        data={this.props.graphData}/>
                        <VictoryAxis crossAxis
                            label={this.props.xLabel}
                            fixLabelOverlap={this.props.overlap}/>
                        <VictoryAxis crossAxis dependentAxis
                            label={""}
                            axisLabelComponent={<VictoryLabel angle={90}/>}/>
                </VictoryChart>
            )

        } else {
            return (
                <VictoryChart>
                <VictoryBar/>
                </VictoryChart>
            )
        }
    }
}

Graph.defaultProps = {
    type: 'pie',
    graphData: [{y:  8, x: "Electricity"},
                 {y: 7, x: "Water"},
                 {y: 16, x: "Heat/AC"}],
    theme: CustomThemes.grayscale,
    height: 100,
    width: 110,
    innerRadius: 20
}

Graph.propTypes = {
    type: PropTypes.string,
    graphData: PropTypes.any,
    theme: PropTypes.object,
    height: PropTypes.number,
    width: PropTypes.number,
    innerRadius: PropTypes.number
}

const styles = StyleSheet.create({
  container: {
      flex: 0.8,
      justifyContent: 'center',
      alignItems: 'center',
  },
})

export default Graph