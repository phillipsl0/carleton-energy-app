import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native'
import { VictoryPie, VictoryArea, VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
//import customTheme from './CustomTheme';
import { scale, moderateScale, verticalScale} from './../helpers/Scaling';


const Graph = ({type, graphData}) => {
//    setDimensions(event) {
//        this.setState({
//            width: event.nativeEvent.layout.width
//        });
//    }

    if (type=='pie') {
        return (
            <View style={styles.container}>
            <VictoryPie
                padding={{ top: 50, bottom: 50, left: 85, right: 75}}
                height={verticalScale(300)}
                width={moderateScale(300)}
                data={graphData}
            />
            </View>
        )
    } else if (type=='bar') {
//        const { width } = this.props;
        return (
        <View style={styles.container}>
            <VictoryChart
                height={verticalScale(300)}
                width={moderateScale(300)}
                padding={{ top: 20, bottom: 50, left: 50, right: 50}}
                domainPadding={15}>
                <VictoryBar
                    data={graphData}
                />
            </VictoryChart>
            </View>
        )
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