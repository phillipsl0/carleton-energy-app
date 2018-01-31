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

    render() {
        const themeStyles = GetStyle(CurrTheme);

        return(
            <View style={[themeStyles.singleView, themeStyles.shadowed, themeStyles.centered]}>
                <View style={[styles.graphContainer, themeStyles.centered,
                              themeStyles.translucent]}>


                 <Graph
                     theme={CustomThemes.carleton}
                     height={verticalScale(210)}
                     width={moderateScale(275)}
                     type={'scatter'}
                     graphData={this.props.data}/>
                <Text style={styles.subHead}>
                    (aggregate energy usage in thousands)
                </Text>
                </View>

                <View style={[themeStyles.flexboxRow, themeStyles.flexButtons, themeStyles.translucent]}>
                    <GraphButton title='D'
                        view='day'
                        comparator={7}
                        index={1}
                        callback={this.sendToParent}
                        selected={this.props.selected}/>

                    <GraphButton title='W'
                        view='week'
                        comparator={4}
                        index={2}
                        callback={this.sendToParent}
                        selected={this.props.selected}/>

                    <GraphButton title='M'
                        view='month'
                        comparator={12}
                        index={3}
                        callback={this.sendToParent}
                        selected={this.props.selected}/>

                    <GraphButton title='Y'
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
        marginTop: '3%',
        marginBottom: '3%',
        paddingTop: '5%',
        paddingLeft: '3%',
        paddingRight: '3%',
        paddingBottom: '2%',
        borderRadius: 10,
        width: moderateScale(300)
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