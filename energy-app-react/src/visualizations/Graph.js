import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions } from 'react-native'
import { VictoryPie, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { scale, moderateScale, verticalScale} from './../helpers/Scaling';


class Graph extends Component {
    render() {
        if (this.props.type=='pie') {
            return (
                <View style={styles.container}>
                <VictoryPie
                    padding={{ top: 50, bottom: 50, left: 95, right: 85}}
                    height={300}
                    width={300}
                    data={this.props.graphData}/>
                </View>
            )
        } else if (this.props.type=='bar') {
            return (
            <View style={styles.container}>
                <VictoryChart
                    height={300}
                    width={300}
                    padding={{ top: 20, bottom: 50, left: 60, right: 60}}
                    domainPadding={15}>
                    <VictoryBar
                        data={this.props.graphData}/>
                </VictoryChart>
                </View>
            )
        } else {
            return (
            <View style={styles.container}>
                <VictoryChart>
                <VictoryBar/>
                </VictoryChart>
            </View>
            )
        }
    }
}

Graph.defaultProps = {
    type: 'pie',
    graphData: [{y:  8, x: "Electricity"},
                 {y: 7, x: "Water"},
                 {y: 16, x: "Heat/AC"}],
}

Graph.propTypes = {
    type: PropTypes.string,
    graphData: PropTypes.any,
}

const styles = StyleSheet.create({
  container: {
      flex: 0.8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
})

export default Graph